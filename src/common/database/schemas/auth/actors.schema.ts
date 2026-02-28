import { check, foreignKey, pgEnum, pgTable, uuid } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm/sql/sql";
import { actorTypes } from "../../drizzle.type";
import { id } from "../_shared/id";
import { createdAt } from "../_shared/timestamps";
import { organizationsTable } from "../organization/organizations.schema";
import { usersTable } from "./users.schema";

export const actorsTypesEnum = pgEnum("actors_types", actorTypes);

export const actorsTable = pgTable(
	"actors",
	{
		id,
		type: actorsTypesEnum("type").notNull(),
		userId: uuid("user_id"),
		organizationID: uuid("organization_id"),
		createdAt,
	},
	(t) => [
		foreignKey({
			name: "actors_user_id_fk",
			columns: [t.userId],
			foreignColumns: [usersTable.id],
		}),
		foreignKey({
			name: "actors_organization_id_fk",
			columns: [t.organizationID],
			foreignColumns: [organizationsTable.id],
		}),
		check(
			"only_one_id",
			sql`((user_id IS NOT NULL AND organization_id IS NULL AND type = 'user') OR (user_id IS NULL AND organization_id IS NOT NULL AND type = 'organization'))`,
		),
	],
);
