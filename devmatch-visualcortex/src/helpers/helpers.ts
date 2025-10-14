export const formatDate = (dateString: string | Date) => {
  if (!dateString) return "N/A";

  return new Date(dateString).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // Set to false for 24-hour format
  });
};
