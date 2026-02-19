import { defineRelationsPart } from "drizzle-orm";
import { organizations } from "../organization/organizations.schema";
import { actors } from "./actors.schema";
import { sessions } from "./sessions.schema";
import { users } from "./users.schema";

export const usersRelations = defineRelationsPart({ users, organizations, actors, sessions }, (r) => ({
	users: {
		organization: r.one.organizations({
			from: r.users.id,
			to: r.organizations.userId,
		}),

		actor: r.one.actors({
			from: r.users.id,
			to: r.actors.userId,
			where: {
				type: "user",
			},
		}),

		sessions: r.many.sessions({
			from: r.users.id,
			to: r.sessions.userId,
		}),
	},
}));

export const actorsRelations = defineRelationsPart({ actors, users, organizations, sessions }, (r) => ({
	actors: {
		user: r.one.users({
			from: r.actors.userId,
			to: r.users.id,
			optional: true,
		}),
		organization: r.one.organizations({
			from: r.actors.organizationId,
			to: r.organizations.id,
			optional: true,
		}),
		sessions: r.many.sessions({
			from: r.actors.id,
			to: r.sessions.actorId,
		}),
	},
}));

export const sessionsRelations = defineRelationsPart({ sessions, users, actors }, (r) => ({
	sessions: {
		user: r.one.users({
			from: r.sessions.userId,
			to: r.users.id,
		}),
		actor: r.one.actors({
			from: r.sessions.actorId,
			to: r.actors.id,
		}),
	},
}));
