import { foreignKey, pgTable, unique, uuid, varchar } from "drizzle-orm/pg-core";
import { baseTimestamps, withTimestamps } from "../shared/withTimestamps";
import { domains } from "./domains.schema";

export const categories = pgTable(
	"categories",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		name: varchar("name", { length: 50 }).notNull(),
		slug: varchar("slug", { length: 100 }).notNull().unique(),
		domain_id: uuid("domain_id").notNull(),
		...withTimestamps(baseTimestamps),
	},
	(t) => [
		unique("unique_domain_slug").on(t.domain_id, t.slug),
		foreignKey({
			name: "categories_domain_id_fk",
			columns: [t.domain_id],
			foreignColumns: [domains.id],
		}),
	],
);
