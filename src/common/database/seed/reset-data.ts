import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import { sql } from "drizzle-orm/sql/sql";

const envFile = `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ""}`;
dotenv.config({ path: envFile });
const connString = `postgresql://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`;
const db = drizzle(connString);

const tablesName = ["users", "accounts", "actors", "sessions", "organizations"];

async function resetDatabase() {
	console.log("<-- Resetting the database");
	try {
		await db.execute(sql`SET session_replication_role = 'replica';`);

		for (const table of tablesName) {
			console.log(`Truncating table: ${table}`);
			await db.execute(sql.raw(`TRUNCATE TABLE "${table}" RESTART IDENTITY CASCADE;`));
		}

		await db.execute(sql`SET session_replication_role = 'origin';`);
		console.log("--> Database reset successfully.");
	} catch (error) {
		console.error("--> Error resetting the database:", error);
	}
}

async function main() {
	await resetDatabase();
	process.exit(0);
}

void main();
