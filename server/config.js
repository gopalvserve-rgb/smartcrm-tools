import dotenv from "dotenv";
dotenv.config();

// Railway provides MONGO_URL when a MongoDB plugin is attached; fall back to local.
export const MONGO_URL =
  process.env.MONGO_URL ||
  process.env.DATABASE_URL ||
  process.env.MONGODB_URI ||
  "mongodb://127.0.0.1:27017/smartcrm_tools";

export const JWT_SECRET = process.env.JWT_SECRET || "dev-insecure-change-me";
export const PORT = process.env.PORT || 3000;
export const NODE_ENV = process.env.NODE_ENV || "development";

// Seed super-admin (change via env in production)
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "gopalvserve@gmail.com";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Admin@12345";

// Optional: push captured leads into SmartCRM
export const SMARTCRM_API_URL = process.env.SMARTCRM_API_URL || "";
export const SMARTCRM_API_KEY = process.env.SMARTCRM_API_KEY || "";
