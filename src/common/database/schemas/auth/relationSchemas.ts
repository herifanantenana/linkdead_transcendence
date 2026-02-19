import { defineRelations } from "drizzle-orm";
import { organizations } from "../organization/organization.schema";
import { users } from "./user.schema";

export const usersRelations = defineRelations({ users, organizations }, (r) => ({
	users: {
		organization: r.one.organizations({
			from: r.users.id,
			to: r.organizations.userId,
		}),
	},
}));
