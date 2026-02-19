import { defineRelations } from "drizzle-orm";
import { categories } from "./categories.schema";
import { domains } from "./domains.schema";

export const domainsRelations = defineRelations({ domains, categories }, (r) => ({
	domains: {
		categories: r.many.categories({
			from: r.domains.id,
			to: r.categories.domain_id,
		}),
	},
}));

export const categoriesRelations = defineRelations({ categories, domains }, (r) => ({
	categories: {
		domain: r.one.domains({
			from: r.categories.domain_id,
			to: r.domains.id,
		}),
	},
}));
