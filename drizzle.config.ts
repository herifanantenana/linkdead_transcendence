import dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";

const envFile = `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ""}`;

dotenv.config({ path: envFile });

const connectionString = `postgresql://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`;

export default defineConfig({
	dialect: "postgresql",
	schema: ["./src/common/database/schemas/**/*.schema.ts", "./src/common/database/schemas/**/relationSchemas.ts"],
	out: "./src/common/database/migrations",
	dbCredentials: {
		url: connectionString,
	},
	verbose: true,
});
