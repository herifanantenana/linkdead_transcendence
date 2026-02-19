import { pgTable, varchar } from "drizzle-orm/pg-core";
import { _id } from "../shared/id";
import { baseTimestamps, withTimestamps } from "../shared/withTimestamps";

export const skills = pgTable("skills", {
	id: _id,
	name: varchar("name", { length: 50 }).notNull(),
	slug: varchar("slug", { length: 100 }).notNull().unique(),
	...withTimestamps(baseTimestamps),
});
