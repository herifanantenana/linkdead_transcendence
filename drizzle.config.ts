import dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";

const envFile = `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ""}`;

dotenv.config({ path: envFile });

export default defineConfig({
	dialect: "postgresql",
	schema: "./src/common/database/schemas/schema.ts",
	out: "./drizzle",
	dbCredentials: {
		host: process.env.DATABASE_HOST ?? "localhost",
		port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT) : 5432,
		user: process.env.DATABASE_USER,
		password: process.env.DATABASE_PASSWORD,
		database: process.env.DATABASE_NAME ?? "",
	},
	verbose: true,
});
