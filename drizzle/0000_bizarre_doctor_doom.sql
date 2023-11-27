DO $$ BEGIN
 CREATE TYPE "role" AS ENUM('ADMIN', 'USER');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" text NOT NULL,
	"passwordHash" text NOT NULL,
	"userAuthToken" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"role" "role",
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_userAuthToken_unique" UNIQUE("userAuthToken")
);
