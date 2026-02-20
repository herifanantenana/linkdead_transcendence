import { timestamp } from "drizzle-orm/pg-core";

export const baseTimestamps = {
	createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
	updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
};

export const softDeleteTimestamps = {
	deletedAt: timestamp("deleted_at", { withTimezone: true }),
};

export const expirationTimestamps = {
	expiresAt: timestamp("expires_at", { withTimezone: true }),
};

export function withTimestamps(...features: object[]): Record<string, ReturnType<typeof timestamp>> {
	return Object.assign({}, ...features) as Record<string, ReturnType<typeof timestamp>>;
}
