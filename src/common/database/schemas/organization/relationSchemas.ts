import { defineRelations } from "drizzle-orm";
import { actors } from "../auth/actors.schema";
import { organizations } from "./organization.schema";

export const organizationsRelations = defineRelations({ organizations, actors }, (r) => ({
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
