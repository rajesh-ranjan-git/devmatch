import { useState, useEffect } from "react";
import { StoredData, UseWebStorageProps } from "@/types/propTypes";

export const useWebStorage = <T,>({
  key,
  value,
  type = "local",
  expiresIn,
}: UseWebStorageProps<T>) => {
  const storage =
    typeof window !== "undefined"
      ? type === "local"
        ? localStorage
        : sessionStorage
      : null;

  const [storedValue, setStoredValue] = useState<T>(() => {
    if (!storage) return value;
    try {
      const item = storage.getItem(key);
      if (!item) return value;

      const parsed: StoredData<T> = JSON.parse(item);
      if (parsed.expiresAt && Date.now() > parsed.expiresAt) {
        storage.removeItem(key);
        return value;
      }

      return parsed.data;
    } catch {
      return value;
    }
  });

  useEffect(() => {
    if (!storage) return;
    try {
      const payload: StoredData<T> = {
        data: storedValue,
        expiresAt: expiresIn ? Date.now() + expiresIn : undefined,
      };
      storage.setItem(key, JSON.stringify(payload));
    } catch (err) {
      console.error("Error setting storage:", err);
    }
  }, [key, storedValue, expiresIn, storage]);

  useEffect(() => {
    if (type !== "local") return;

    const handleStorage = (event: StorageEvent) => {
      if (event.key === key && event.newValue) {
        try {
          const parsed: StoredData<T> = JSON.parse(event.newValue);
          if (parsed.expiresAt && Date.now() > parsed.expiresAt) {
            storage?.removeItem(key);
            setStoredValue(value);
          } else {
            setStoredValue(parsed.data);
          }
        } catch (err) {
          console.error("Error syncing storage:", err);
        }
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [key, type, value, storage]);

  // ✅ Setter
  const setValue = (newValue: T | ((prev: T) => T)) => {
    try {
      setStoredValue((prev) =>
        newValue instanceof Function ? newValue(prev) : newValue
      );
    } catch (err) {
      console.error("Error setting storage:", err);
    }
  };

  return [storedValue, setValue] as const;
};
