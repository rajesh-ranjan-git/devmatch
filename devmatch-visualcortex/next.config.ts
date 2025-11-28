import { config as loadEnv } from "dotenv";
import { existsSync } from "fs";

const mode =
  process.env.NODE_ENV === "production" ? "production" : "development";

const envFilePath = `./env/.env-${mode}`;

if (existsSync(envFilePath)) {
  loadEnv({ path: envFilePath });
  console.log(`🔵 Loaded env file: ${envFilePath}`);
} else {
  console.warn(`⚠️ Env file not found: ${envFilePath}`);
}

const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
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
