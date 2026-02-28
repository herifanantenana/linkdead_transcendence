import DatabaseConfig from "@apk_common/config/database.config";
import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { type ConfigType } from "@nestjs/config";
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { enums, relations, schemas } from "./schemas";
const allSchemas = { ...schemas, ...enums };

const allRelations = relations.reduce((acc, relation) => {
	return { ...acc, ...relation };
}, {});

export type DbTx = NodePgDatabase<typeof allSchemas, typeof allRelations>;

@Injectable()
export class DrizzleService implements OnModuleInit, OnModuleDestroy {
	private readonly db: DbTx;
	private readonly pool: Pool;

	constructor(@Inject(DatabaseConfig.KEY) readonly databaseConfig: ConfigType<typeof DatabaseConfig>) {
		const { user, password, host, port, name } = databaseConfig;
		if (!user || !password || !host || !port || !name) {
			throw new Error("Database configuration is missing required fields");
		}

		this.pool = new Pool({ connectionString: `postgresql://${user}:${password}@${host}:${port}/${name}` });
		this.db = drizzle({ client: this.pool, schema: allSchemas, relations: allRelations });
	}

	async onModuleInit() {
		try {
			await this.db.execute("SELECT 1");
			console.log("Database connection established successfully");
		} catch (error) {
			console.error("Failed to connect to the database:", error);
			throw error;
		}
	}

	async onModuleDestroy() {
		await this.pool.end();
	}

	public getDb(tx?: unknown): DbTx {
		return (tx || this.db) as DbTx;
	}
}
