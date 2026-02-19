CREATE TYPE "actor_types" AS ENUM('user', 'organization');--> statement-breakpoint
CREATE TYPE "session_status" AS ENUM('active', 'expired', 'revoked');--> statement-breakpoint
CREATE TABLE "actors" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"type" "actor_types" NOT NULL,
	"user_id" uuid,
	"organization_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
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
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_actor_id_fk" FOREIGN KEY ("actor_id") REFERENCES "actors"("id");