import dotenv from "dotenv";
import { Client } from "pg";

function getClient() {
	const envFile = `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ""}`;
	dotenv.config({ path: envFile });

	const connectionString = `postgresql://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`;
	const client = new Client({ connectionString });
	return client;
}

async function dropAllTables(client: Client) {
	await client.query(`
		DO $$ DECLARE
			r RECORD;
		BEGIN
			FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = current_schema()) LOOP
				EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE';
			END LOOP;
		END $$;
	`);
	console.log("All tables dropped.");
}

async function dropAllEnums(client: Client) {
	await client.query(`
		DO $$ DECLARE
			r RECORD;
		BEGIN
			FOR r IN (SELECT t.typname FROM pg_type t WHERE t.typtype = 'e') LOOP
				EXECUTE 'DROP TYPE IF EXISTS ' || quote_ident(r.typname) || ' CASCADE';
			END LOOP;
		END $$;
	`);
	console.log("All enums dropped.");
}

async function cleanUp() {
	const client = getClient();
	try {
		await client.connect();
		await dropAllTables(client);
		await dropAllEnums(client);
		console.log("Database cleaned.");
	} catch (err) {
		console.error("Error during cleanup:", err);
	} finally {
		await client.end();
	}
}

void cleanUp();
