import { foreignKey, pgEnum, pgTable, uuid } from "drizzle-orm/pg-core";
import { organizations } from "../organization/organizations.schema";
import { _id } from "../shared/id";
import { baseTimestamps, withTimestamps } from "../shared/timestamps";
import { users } from "./users.schema";

export const actorTypes = pgEnum("actor_types", ["user", "organization"]);

export const actors = pgTable(
	"actors",
	{
		id: _id,
		type: actorTypes("type").notNull(),
		userId: uuid("user_id").unique(),
		organizationId: uuid("organization_id").unique(),
		...withTimestamps(baseTimestamps),
	},
	(t) => [
		foreignKey({
			name: "actors_user_id_fk",
			columns: [t.userId],
			foreignColumns: [users.id],
		}),
		foreignKey({
			name: "actors_organization_id_fk",
			columns: [t.organizationId],
			foreignColumns: [organizations.id],
		}),
	],
);
