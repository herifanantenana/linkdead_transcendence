CREATE TYPE "actor_types" AS ENUM('user', 'organization');--> statement-breakpoint
CREATE TYPE "session_status" AS ENUM('active', 'expired', 'revoked');--> statement-breakpoint
CREATE TYPE "account_status" AS ENUM('active', 'suspended', 'deactivated');--> statement-breakpoint
CREATE TYPE "auth_providers" AS ENUM('local', 'google', 'github');--> statement-breakpoint
CREATE TYPE "organization_status" AS ENUM('active', 'suspended', 'deactivated', 'banned');--> statement-breakpoint
CREATE TYPE "organization_types" AS ENUM('company', 'startup', 'association', 'community', 'freelance', 'school', 'other');--> statement-breakpoint
CREATE TABLE "actors" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"type" "actor_types" NOT NULL,
	"user_id" uuid,
	"organization_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "only_one_id" CHECK (((user_id IS NOT NULL AND organization_id IS NULL) OR (user_id IS NULL AND organization_id IS NOT NULL)))
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"user_id" uuid NOT NULL,
	"actor_id" uuid NOT NULL,
	"user_agent" text,
	"device_id" varchar(255),
	"device_ip" varchar(45),
	"status" "session_status" DEFAULT 'active'::"session_status",
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"expires_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"username" varchar(25) NOT NULL UNIQUE,
	"full_name" varchar(50) NOT NULL,
	"provider" "auth_providers" NOT NULL,
	"provider_oauth_id" varchar(255),
	"password_hash" varchar(255),
	"bio" text,
	"avatar_url" varchar(255),
	"website_url" varchar(255),
	"location" varchar(100),
	"status" "account_status" DEFAULT 'active'::"account_status" NOT NULL,
	"preferences" jsonb DEFAULT '{}',
	"metadata" jsonb DEFAULT '{}',
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "organizations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"user_id" uuid NOT NULL UNIQUE,
	"name" varchar(50) NOT NULL,
	"slug" varchar(100) NOT NULL UNIQUE,
	"description" text,
	"type" "organization_types" DEFAULT 'company'::"organization_types" NOT NULL,
	"status" "organization_status" DEFAULT 'active'::"organization_status" NOT NULL,
	"logo_url" varchar(255),
	"website_url" varchar(255),
	"location" varchar(100),
	"preferences" jsonb DEFAULT '{}',
	"metadata" jsonb DEFAULT '{}',
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" varchar(50) NOT NULL,
	"slug" varchar(100) NOT NULL UNIQUE,
	"domain_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "unique_domain_slug" UNIQUE("domain_id","slug")
);
--> statement-breakpoint
CREATE TABLE "domains_to_skills" (
	"domain_id" uuid,
	"skill_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "domains_to_skills_pkey" PRIMARY KEY("domain_id","skill_id")
);
--> statement-breakpoint
CREATE TABLE "domains" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" varchar(50) NOT NULL,
	"slug" varchar(100) NOT NULL UNIQUE,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "skills" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" varchar(50) NOT NULL,
	"slug" varchar(100) NOT NULL UNIQUE,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "sessions_user_id_idx" ON "sessions" ("user_id");--> statement-breakpoint
CREATE INDEX "sessions_actor_id_idx" ON "sessions" ("actor_id");--> statement-breakpoint
CREATE INDEX "categories_domain_id_idx" ON "categories" ("domain_id");--> statement-breakpoint
CREATE INDEX "domains_to_skills_skill_id_idx" ON "domains_to_skills" ("skill_id");--> statement-breakpoint
CREATE INDEX "domains_to_skills_domain_id_idx" ON "domains_to_skills" ("domain_id");--> statement-breakpoint
ALTER TABLE "actors" ADD CONSTRAINT "actors_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "actors" ADD CONSTRAINT "actors_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id");--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_actor_id_fk" FOREIGN KEY ("actor_id") REFERENCES "actors"("id");--> statement-breakpoint
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "categories_domain_id_fk" FOREIGN KEY ("domain_id") REFERENCES "domains"("id");--> statement-breakpoint
ALTER TABLE "domains_to_skills" ADD CONSTRAINT "domains_to_skills_domain_id_fk" FOREIGN KEY ("domain_id") REFERENCES "domains"("id");--> statement-breakpoint
ALTER TABLE "domains_to_skills" ADD CONSTRAINT "domains_to_skills_skill_id_fk" FOREIGN KEY ("skill_id") REFERENCES "skills"("id");