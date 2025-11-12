export const toTitleCase = (text: string) => {
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

export const getUrlString = (text: string) => {
  if (!text) {
    return "";
  }

  return `/${text.toLowerCase().split(" ").join("-").split("_").join("-")}`;
};

export const formatDate = (dateString: string | Date) => {
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
