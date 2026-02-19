import { foreignKey, pgEnum, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { _id } from "../shared/id";
import { baseTimestamps, expirationTimestamps, withTimestamps } from "../shared/withTimestamps";
import { actors } from "./actors.schema";
import { users } from "./user.schema";

export const sessionStatus = pgEnum("session_status", ["active", "expired", "revoked"]);

export const sessions = pgTable(
	"sessions",
	{
		id: _id,
		userId: uuid("user_id").notNull(),
		actorId: uuid("actor_id").notNull(),
		user_agent: text("user_agent"),
		device_id: varchar("device_id", { length: 255 }),
		device_ip: varchar("device_ip", { length: 45 }),
		status: sessionStatus("status").default("active"),
		...withTimestamps(baseTimestamps, expirationTimestamps),
	},
	(t) => [
		foreignKey({
			name: "sessions_user_id_fk",
			columns: [t.userId],
			foreignColumns: [users.id],
		}),
		foreignKey({
			name: "sessions_actor_id_fk",
			columns: [t.actorId],
			foreignColumns: [actors.id],
		}),
	],
);
