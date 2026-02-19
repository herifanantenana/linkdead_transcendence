import { pgEnum, pgTable, uuid } from "drizzle-orm/pg-core";
import { _id } from "../shared/id";
import { baseTimestamps, withTimestamps } from "../shared/withTimestamps";

export const actorTypes = pgEnum("actor_types", ["user", "organization"]);

export const actors = pgTable("actors", {
	id: _id,
	type: actorTypes("type").notNull(),
	userId: uuid("user_id"),
	organizationId: uuid("organization_id"),
	...withTimestamps(baseTimestamps),
});
