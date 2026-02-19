import { defineRelations } from "drizzle-orm";
import { actors } from "../auth/actors.schema";
import { users } from "../auth/user.schema";
import { organizations } from "./organizations.schema";

export const organizationsRelations = defineRelations({ organizations, actors, users }, (r) => ({
	organizations: {
		actor: r.one.actors({
			from: r.organizations.id,
			to: r.actors.organizationId,
			where: {
				type: "organization",
			},
		}),
	},
}));
