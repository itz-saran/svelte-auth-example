import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const ROLE = pgEnum("role", ["ADMIN", "USER"]);

export const users = pgTable("users", {
	id: uuid("id").defaultRandom().primaryKey(),
	username: text("username").unique().notNull(),
	passwordHash: text("passwordHash").notNull(),
	userAuthToken: text("userAuthToken").unique(),
	createdAt: timestamp("createdAt").defaultNow().notNull(),
	updatedAt: timestamp("updatedAt").defaultNow().notNull(),
	role: ROLE("role").notNull(),
});
