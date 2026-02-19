import { foreignKey, pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { baseTimestamps, withTimestamps } from "../shared/withTimestamps";
import { domains } from "./domains.schema";
import { skills } from "./skills.schema";

export const domainsToSkills = pgTable(
	"domains_to_skills",
	{
		domainId: uuid("domain_id").notNull(),
		skillId: uuid("skill_id").notNull(),
		...withTimestamps(baseTimestamps),
	},
	(t) => [
		primaryKey({ columns: [t.domainId, t.skillId] }),
		foreignKey({
			name: "domains_to_skills_domain_id_fk",
			columns: [t.domainId],
			foreignColumns: [domains.id],
		}),
		foreignKey({
			name: "domains_to_skills_skill_id_fk",
			columns: [t.skillId],
			foreignColumns: [skills.id],
		}),
	],
);
