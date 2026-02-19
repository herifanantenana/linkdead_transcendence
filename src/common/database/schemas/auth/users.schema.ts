import { jsonb, pgEnum, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { _id } from "../shared/id";
import { baseTimestamps, softDeleteTimestamps, withTimestamps } from "../shared/timestamps";

export const authProviders = pgEnum("auth_providers", ["local", "google", "github"]);

export const accountStatus = pgEnum("account_status", ["active", "suspended", "deactivated"]);

export const users = pgTable("users", {
	id: _id,
	username: varchar("username", { length: 25 }).notNull().unique(),
	fullName: varchar("full_name", { length: 50 }).notNull(),
	provider: authProviders("provider").notNull(),
	providerOAuthId: varchar("provider_oauth_id", { length: 255 }),
	passwordHash: varchar("password_hash", { length: 255 }),
	bio: text("bio"),
	avatarUrl: varchar("avatar_url", { length: 255 }),
	websiteUrl: varchar("website_url", { length: 255 }),
	location: varchar("location", { length: 100 }),
	status: accountStatus("status").notNull().default("active"),
	preferences: jsonb("preferences").default({} as Record<string, unknown>),
	metadata: jsonb("metadata").default({} as Record<string, unknown>),
	...withTimestamps(baseTimestamps, softDeleteTimestamps),
});
