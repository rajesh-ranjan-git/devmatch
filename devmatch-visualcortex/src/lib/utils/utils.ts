import { UserType } from "@/types/types";

export const getRandomItem = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

export const isPlainObject = (
  data: unknown
): data is Record<string, unknown> => {
  return typeof data === "object" && data !== null && !Array.isArray(data);
};

export const omitObjectProperties = <
  T extends Record<string, any>,
  K extends readonly (keyof T)[]
>(
  obj: T,
  keysToOmit: K
): Omit<T, K[number]> => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keysToOmit.includes(key as keyof T))
  ) as Omit<T, K[number]>;
};

export const selectObjectProperties = <
  T extends Record<string, any>,
  K extends readonly (keyof T)[]
>(
  obj: T,
  keysToSelect: K
): Pick<T, K[number]> => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => keysToSelect.includes(key as keyof T))
  ) as Pick<T, K[number]>;
};

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

  return new Date(dateString).toLocaleDateString("en-IN", {
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
