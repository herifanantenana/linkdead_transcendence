import { foreignKey, index, pgEnum, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { _id } from "../shared/id";
import { baseTimestamps, expirationTimestamps, withTimestamps } from "../shared/timestamps";
import { actors } from "./actors.schema";
import { users } from "./users.schema";

export const sessionStatus = pgEnum("session_status", ["active", "expired", "revoked"]);

export const sessions = pgTable(
	"sessions",
	{
		id: _id,
		userId: uuid("user_id").notNull(),
		actorId: uuid("actor_id").notNull(),
		userAgent: text("user_agent"),
		deviceId: varchar("device_id", { length: 255 }),
		deviceIp: varchar("device_ip", { length: 45 }),
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
		index("sessions_user_id_idx").on(t.userId),
		index("sessions_actor_id_idx").on(t.actorId),
	],
);
