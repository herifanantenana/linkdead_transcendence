import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { baseTimestamps, withTimestamps } from "../shared/withTimestamps";

export const skills = pgTable("skills", {
	id: uuid("id").primaryKey().defaultRandom(),
	name: varchar("name", { length: 50 }).notNull(),
	slug: varchar("slug", { length: 100 }).notNull().unique(),
	...withTimestamps(baseTimestamps),
});
