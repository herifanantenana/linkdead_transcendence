import { defineRelations } from "drizzle-orm";
import { pgTable, unique, uuid, varchar } from "drizzle-orm/pg-core";
import { baseTimestamps, withTimestamps } from "../shared/timestamps";
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
	(t) => [unique("unique_domain_slug").on(t.domain_id, t.slug)],
);

export const categoriesRelations = defineRelations({ categories, domains }, (r) => ({
	categories: {
		domain: r.one.domains({
			from: r.categories.domain_id,
			to: r.domains.id,
		}),
	},
}));
