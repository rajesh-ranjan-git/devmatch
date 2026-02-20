import { UserType } from "@/types/types";

export const typedKeys = <T extends object>(obj: T): (keyof T)[] => {
  return Object.keys(obj) as (keyof T)[];
};

export const getRandomItem = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

export const numRange = (start: number, stop: number, step = 1) =>
  Array.from(
    { length: (stop - start) / step + 1 },
    (_, index) => start + index * step,
  );

export const isPlainObject = (
  data: unknown,
): data is Record<string, unknown> => {
  return typeof data === "object" && data !== null && !Array.isArray(data);
};

export const omitObjectProperties = <
  T extends Record<string, any>,
  K extends readonly (keyof T)[],
>(
  obj: T,
  keysToOmit: K,
): Omit<T, K[number]> => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keysToOmit.includes(key as keyof T)),
  ) as Omit<T, K[number]>;
};

export const selectObjectProperties = <
  T extends Record<string, any>,
  K extends readonly (keyof T)[],
>(
  obj: T,
  keysToSelect: K,
): Pick<T, K[number]> => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) =>
      keysToSelect.includes(key as keyof T),
    ),
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

  return new Date(dateString)
    .toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .replace(/\b(am|pm)\b/gi, (m) => m.toUpperCase());
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

export const sanitizeList = (arr: string[]) =>
  arr.map((v) => v.trim()).filter((v) => v.length > 0);

export const deepEquals = (a: unknown, b: unknown) => {
  if (Object.is(a, b)) return true;

  if (a == null || b == null) return a === b;

  if (typeof a !== typeof b) return false;

  if (typeof a !== "object") return a === b;

  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }

  if (a instanceof RegExp && b instanceof RegExp) {
    return a.toString() === b.toString();
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!deepEquals(a[i], b[i])) return false;
    }
    return true;
  }

  if (Array.isArray(a) !== Array.isArray(b)) return false;

  const objA = a as Record<string, unknown>;
  const objB = b as Record<string, unknown>;

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!keysB.includes(key)) return false;
    if (!deepEquals(objA[key], objB[key])) return false;
  }

  return true;
};

export const formatChatMessageTime = (time: Date | string | number): string => {
  const messageDate =
    typeof time === "string" || typeof time === "number"
      ? new Date(time)
      : time;

  const now = new Date();
  const diffMs = now.getTime() - messageDate.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  if (diffMins < 1) {
    return "now";
  }

  if (diffMins < 60) {
    return diffMins === 1 ? "1 min ago" : `${diffMins} mins ago`;
  }

  if (diffHours < 24) {
    return diffHours === 1 ? "1 hour ago" : `${diffHours} hours ago`;
  }

  const day = messageDate.getDate();
  const month = messageDate.getMonth() + 1;
  const year = messageDate.getFullYear();

  return `${day}/${month}/${year}`;
};

export const formatChatSeparatorTime = (
  time: Date | string | number,
): string => {
  const messageDate =
    typeof time === "string" || typeof time === "number"
      ? new Date(time)
      : time;

  const now = new Date();
  const diffMs = now.getTime() - messageDate.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  if (diffMins < 1) {
    return "now";
  }

  if (diffMins < 60) {
    return diffMins === 1 ? "1 min ago" : `${diffMins} mins ago`;
  }

  if (diffHours < 24) {
    return diffHours === 1 ? "1 hour ago" : `${diffHours} hours ago`;
  }

  const day = messageDate.getDate();
  const month = messageDate.getMonth() + 1;
  const year = messageDate.getFullYear();

  return `${day}/${month}/${year}`;
};

export const formatDaySeparator = (date: Date | string | number): string => {
  const messageDate = new Date(date);
  const now = new Date();

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const msgDay = new Date(
    messageDate.getFullYear(),
    messageDate.getMonth(),
    messageDate.getDate(),
  );

  const diffTime = today.getTime() - msgDay.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return "Today";
  }

  if (diffDays === 1) {
    return "Yesterday";
  }

  if (diffDays >= 2 && diffDays <= 6) {
    return `${diffDays} days ago`;
  }

  if (diffDays === 7) {
    return "1 week ago";
  }

  if (diffDays >= 8 && diffDays <= 27) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} weeks ago`;
  }

  const yearsDiff = now.getFullYear() - messageDate.getFullYear();
  const monthsDiff = now.getMonth() - messageDate.getMonth();
  const totalMonths = yearsDiff * 12 + monthsDiff;

  if ((diffDays >= 28 && diffDays < 60) || totalMonths === 1) {
    return "1 month ago";
  }

  if (totalMonths >= 2 && totalMonths < 12) {
    return `${totalMonths} months ago`;
  }

  if (totalMonths >= 12 && totalMonths < 24) {
    return "1 year ago";
  }

  if (totalMonths >= 24) {
    const years = Math.floor(totalMonths / 12);
    return `${years} years ago`;
  }

  return `${diffDays} days ago`;
};

export const shouldShowChatSeparator = (
  currentMessageDate: Date | string | number,
  previousMessageDate?: Date | string | number | null,
): boolean => {
  if (!previousMessageDate) {
    return true;
  }

  const current = new Date(currentMessageDate);
  const previous = new Date(previousMessageDate);

  const currentDay = new Date(
    current.getFullYear(),
    current.getMonth(),
    current.getDate(),
  );
  const previousDay = new Date(
    previous.getFullYear(),
    previous.getMonth(),
    previous.getDate(),
  );

  return currentDay.getTime() !== previousDay.getTime();
};
