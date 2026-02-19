import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { baseTimestamps, withTimestamps } from "../shared/withTimestamps";

export const domains = pgTable("domains", {
	id: uuid("id").primaryKey().defaultRandom(),
	name: varchar("name", { length: 50 }).notNull(),
	slug: varchar("slug", { length: 100 }).notNull().unique(),
	...withTimestamps(baseTimestamps),
});
