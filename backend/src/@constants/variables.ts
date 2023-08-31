import { config } from "dotenv";
config({ path: "src/config/config.env" });

export const PORT = process.env["PORT"] ?? 4000;
