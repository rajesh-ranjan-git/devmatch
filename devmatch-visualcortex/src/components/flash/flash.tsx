"use client";

import { useEffect } from "react";

interface FlashMessage {
  type: "success" | "error" | "info";
  message: string;
  authenticated: boolean;
}

export default function Flash() {
  useEffect(() => {
    const getCookie = (name: string): string | null => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        return parts.pop()?.split(";").shift() || null;
      }
      return null;
    };

    const deleteCookie = (name: string): void => {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    };

    const flashCookie = getCookie("flash");

    if (flashCookie) {
      try {
        const flashData: FlashMessage = JSON.parse(
          decodeURIComponent(flashCookie)
        );

        if (flashData.authenticated) {
          console.log("✅ Authentication successful:", flashData.message);
        } else {
          console.log("❌ Authentication failed:", flashData.message);
        }

        console.log("Flash data:", flashData);

        deleteCookie("flash");
      } catch (error) {
        console.error("Error parsing flash cookie:", error);
        deleteCookie("flash");
      }
    }
  }, []);

  return null;
}
