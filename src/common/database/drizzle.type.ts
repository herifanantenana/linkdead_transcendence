export enum AuthProvidersEnum {
	local = "local",
	google = "google",
	github = "github",
}
export const authProviders = Object.values(AuthProvidersEnum) as [string, ...string[]];

export enum AccountStatusEnum {
	active = "active",
	suspended = "suspended",
	deactivated = "deactivated",
}
export const accountStatus = Object.values(AccountStatusEnum) as [string, ...string[]];

export enum OrganizationTypesEnum {
	company = "company",
	startup = "startup",
	association = "association",
	community = "community",
	freelance = "freelance",
	school = "school",
	other = "other",
}
export const organizationTypes = Object.values(OrganizationTypesEnum) as [string, ...string[]];

export enum OrganizationStatusEnum {
	active = "active",
	suspended = "suspended",
	deactivated = "deactivated",
	banned = "banned",
}
export const organizationStatus = Object.values(OrganizationStatusEnum) as [string, ...string[]];

export enum ActorTypesEnum {
	user = "user",
	organization = "organization",
}
export const actorTypes = Object.values(ActorTypesEnum) as [string, ...string[]];

export enum SessionStatusEnum {
	active = "active",
	expired = "expired",
	revoked = "revoked",
}
export const sessionsStatus = Object.values(SessionStatusEnum) as [string, ...string[]];
