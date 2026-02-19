CREATE TYPE "account_status" AS ENUM('active', 'suspended', 'deactivated');--> statement-breakpoint
CREATE TYPE "auth_providers" AS ENUM('local', 'google', 'github');--> statement-breakpoint
CREATE TYPE "organization_status" AS ENUM('active', 'suspended', 'deactivated', 'banned');--> statement-breakpoint
CREATE TYPE "organization_types" AS ENUM('company', 'startup', 'association', 'community', 'freelance', 'school', 'other');--> statement-breakpoint
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
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id");