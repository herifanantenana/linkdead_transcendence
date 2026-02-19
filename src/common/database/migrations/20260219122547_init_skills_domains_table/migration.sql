CREATE TABLE "domains_to_skills" (
	"domain_id" uuid,
	"skill_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "domains_to_skills_pkey" PRIMARY KEY("domain_id","skill_id")
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
ALTER TABLE "domains_to_skills" ADD CONSTRAINT "domains_to_skills_domain_id_fk" FOREIGN KEY ("domain_id") REFERENCES "domains"("id");--> statement-breakpoint
ALTER TABLE "domains_to_skills" ADD CONSTRAINT "domains_to_skills_skill_id_fk" FOREIGN KEY ("skill_id") REFERENCES "skills"("id");