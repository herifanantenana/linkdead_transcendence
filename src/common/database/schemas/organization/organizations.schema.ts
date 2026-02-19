import { foreignKey, jsonb, pgEnum, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "../auth/users.schema";
import { _id } from "../shared/id";
import { baseTimestamps, softDeleteTimestamps, withTimestamps } from "../shared/timestamps";

export const organizationTypes = pgEnum("organization_types", [
	"company",
	"startup",
	"association",
	"community",
	"freelance",
	"school",
	"other",
]);

export const organizationStatus = pgEnum("organization_status", ["active", "suspended", "deactivated", "banned"]);

export const organizations = pgTable(
	"organizations",
	{
		id: _id,
		userId: uuid("user_id").notNull().unique(),
		name: varchar("name", { length: 50 }).notNull(),
		slug: varchar("slug", { length: 100 }).notNull().unique(),
		description: text("description"),
		type: organizationTypes("type").notNull().default("company"),
		status: organizationStatus("status").notNull().default("active"),
		logoUrl: varchar("logo_url", { length: 255 }),
		websiteUrl: varchar("website_url", { length: 255 }),
		location: varchar("location", { length: 100 }),
		preferences: jsonb("preferences").default({} as Record<string, unknown>),
		metadata: jsonb("metadata").default({} as Record<string, unknown>),
		...withTimestamps(baseTimestamps, softDeleteTimestamps),
	},
	(t) => [
		foreignKey({
			name: "organizations_user_id_fk",
			columns: [t.userId],
			foreignColumns: [users.id],
		}),
	],
);
