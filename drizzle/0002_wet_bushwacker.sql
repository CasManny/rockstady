CREATE TABLE IF NOT EXISTS "feedbacks" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"new_feature" text,
	"change" text,
	"need" text,
	"feel" text,
	"confused" text,
	"easy" text,
	"enjoy" text
);
--> statement-breakpoint
ALTER TABLE "challenges" ALTER COLUMN "type" SET DATA TYPE text;