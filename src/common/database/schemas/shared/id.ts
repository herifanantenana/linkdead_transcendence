import { uuid } from "drizzle-orm/pg-core";

export const _id = uuid("id").primaryKey().defaultRandom();
