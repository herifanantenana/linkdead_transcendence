import { Inject, Injectable, Logger, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { type ConfigType } from "@nestjs/config";
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import databaseConfig from "./env/database.env";
import * as schemas from "./schemas";

@Injectable()
export class DrizzleService implements OnModuleInit, OnModuleDestroy {
	private readonly logger = new Logger(DrizzleService.name);
	private database: NodePgDatabase<typeof schemas>;
	private pool: Pool;

	constructor(@Inject(databaseConfig.KEY) private readonly config: ConfigType<typeof databaseConfig>) {}

	async onModuleInit() {
		this.logger.log("Initializing Drizzle ORM and PostgreSQL connection...");

		if (!this.config.host || !this.config.port || !this.config.user || !this.config.password || !this.config.name) {
			this.logger.error("Database configuration is incomplete. Please check your environment variables.");
			throw new Error("Database configuration is incomplete.");
		}
		const connectionString = `postgresql://${this.config.user}:${this.config.password}@${this.config.host}:${this.config.port}/${this.config.name}`;

		this.pool = new Pool({ connectionString });
		this.database = drizzle({ client: this.pool, schema: schemas });
		try {
			await this.database.execute("SELECT 1");
			this.logger.log("Drizzle ORM and PostgreSQL connection initialized successfully.");
		} catch (error) {
			this.logger.error("Failed to connect to database: " + (error as Error).message);
			await this.pool.end();
			throw error;
		}
	}

	async onModuleDestroy() {
		this.logger.log("Closing Drizzle ORM connection...");
		await this.pool.end();
	}

	get db(): NodePgDatabase<typeof schemas> {
		return this.database;
	}
}
