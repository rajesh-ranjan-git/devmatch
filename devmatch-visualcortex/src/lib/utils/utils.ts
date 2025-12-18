import { UserType } from "@/types/types";

export const getRandomItem = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

export const toSentenceCase = (text?: string) => {
  if (!text) {
    return "";
  }

  let temp = text.toLowerCase().split("_").join(" ").split("-").join(" ");

  return temp.charAt(0).toUpperCase() + temp.slice(1) + ".";
};

export const toTitleCase = (text?: string) => {
  if (!text) {
    return "";
  }

  return text
    .toLowerCase()
    .split("_")
    .join(" ")
    .split("-")
    .join(" ")
    .split(" ")
    .map((word) => {
      if (word.length === 0) {
        return "";
      }

      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
};

export const getUrlString = (text?: string) => {
  if (!text) {
    return "";
  }

  return `/${text.toLowerCase().split(" ").join("-").split("_").join("-")}`;
};

export const formatDate = (dateString?: string | Date) => {
  if (!dateString) return "N/A";

  return new Date(dateString).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export const getFullName = (user?: UserType) => {
  return user?.firstName && user?.middleName && user?.lastName
    ? `${user?.firstName} ${user?.middleName} ${user?.lastName}`
    : user?.firstName && user?.lastName
    ? `${user?.firstName} ${user?.lastName}`
    : user?.firstName
    ? `${user?.firstName}`
    : "";
};
