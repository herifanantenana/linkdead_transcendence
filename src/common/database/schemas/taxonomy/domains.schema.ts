import { defineRelations } from "drizzle-orm";
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { baseTimestamps, withTimestamps } from "../shared/timestamps";
import { categories } from "./categories.schema";

export const domains = pgTable("domains", {
	id: uuid("id").primaryKey().defaultRandom(),
	name: varchar("name", { length: 50 }).notNull(),
	slug: varchar("slug", { length: 100 }).notNull().unique(),
	...withTimestamps(baseTimestamps),
});

export const domainsRelations = defineRelations({ domains, categories }, (r) => ({
	domains: {
		categories: r.many.categories({
			from: r.domains.id,
			to: r.categories.domain_id,
			alias: "categories",
		}),
	},
}));
