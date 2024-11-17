DROP TABLE "authenticator" CASCADE;--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "name";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "image";