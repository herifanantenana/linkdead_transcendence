import { boolean, foreignKey, pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { accountStatus, AccountStatusEnum, authProviders } from "../../drizzle.type";
import { id } from "../_shared/id";
import { createdAt, updatedAt } from "../_shared/timestamps";
import { usersTable } from "./users.schema";

export const authProvidersEnum = pgEnum("auth_providers", authProviders);
export const accountStatusEnum = pgEnum("account_status", accountStatus);

export const accountsTable = pgTable(
	"accounts",
	{
		id,
		userId: uuid("user_id").notNull(),
		provider: authProvidersEnum("provider").notNull(),
		providerOAuthId: varchar("provider_account_id", { length: 255 }),
		hashedPassword: varchar("hashed_password", { length: 255 }),
		twoFAEnabled: boolean("two_fa_enabled").notNull().default(false),
		twoFASecret: varchar("two_fa_secret", { length: 255 }),
		twoFAConfirmedAt: timestamp("two_fa_confirmed_at", { withTimezone: true }),
		status: accountStatusEnum("account_status").notNull().default(AccountStatusEnum.active),
		createdAt,
		updatedAt,
	},
	(t) => [
		foreignKey({
			name: "accounts_user_id_fk",
			columns: [t.userId],
			foreignColumns: [usersTable.id],
		}),
	],
);
