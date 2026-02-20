import { config as loadEnv } from "dotenv";
import { existsSync } from "fs";

const mode =
  process.env.NODE_ENV === "production" ? "production" : "development";

const envFilePath = `./env/.env-${mode}`;

if (existsSync(envFilePath)) {
  loadEnv({ path: envFilePath });
  console.info(`📢 INFO :: 🔵 Loaded env file: ${envFilePath}`);
} else {
  console.warn(`🚨 WARNING :: 🔴 Env file not found: ${envFilePath}`);
}

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "scontent.fdel27-3.fna.fbcdn.net",
        port: "",
        pathname: "/**",
      },
    ],
  },

  // Optional: Expose NEXT_PUBLIC_* values to the client
  env: {
    // All NEXT_PUBLIC_ vars will automatically pass through
  },
};

export default nextConfig;
