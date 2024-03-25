CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"username" varchar(256),
	"password" varchar(256),
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
