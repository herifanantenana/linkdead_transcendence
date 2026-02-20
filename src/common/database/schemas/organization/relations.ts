import { defineRelationsPart } from "drizzle-orm";
import { actors } from "../auth/actors.schema";
import { users } from "../auth/users.schema";
import { organizations } from "./organizations.schema";

export const organizationsRelations = defineRelationsPart({ organizations, actors, users }, (r) => ({
	organizations: {
		user: r.one.users({
			from: r.organizations.userId,
			to: r.users.id,
		}),

		actor: r.one.actors({
			from: r.organizations.id,
			to: r.actors.organizationId,
			where: {
				type: "organization",
			},
		}),
	},
}));
