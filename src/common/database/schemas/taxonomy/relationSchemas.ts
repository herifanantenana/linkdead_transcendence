import { defineRelations } from "drizzle-orm";
import { categories } from "./categories.schema";
import { domains } from "./domains.schema";
import { domainsToSkills } from "./domainsToSkills.schema";
import { skills } from "./skills.schema";

export const domainsRelations = defineRelations({ domains, categories, domainsToSkills, skills }, (r) => ({
	domains: {
		categories: r.many.categories({
			from: r.domains.id,
			to: r.categories.domainId,
		}),

		skills: r.many.skills({
			from: r.domains.id.through(r.domainsToSkills.domainId),
			to: r.skills.id.through(r.domainsToSkills.skillId),
		}),
	},
}));

export const categoriesRelations = defineRelations({ categories, domains }, (r) => ({
	categories: {
		domain: r.one.domains({
			from: r.categories.domainId,
			to: r.domains.id,
		}),
	},
}));

export const skillsRelations = defineRelations({ skills, domains, domainsToSkills }, (r) => ({
	skills: {
		domains: r.many.domains({
			from: r.skills.id.through(r.domainsToSkills.skillId),
			to: r.domains.id.through(r.domainsToSkills.domainId),
		}),
	},
}));
