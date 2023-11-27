import { fail, redirect } from "@sveltejs/kit";
import type { Action, Actions, PageServerLoad } from "./$types";
import { db } from "$lib/db/index.server";
import { eq } from "drizzle-orm";
import { users } from "$lib/db/schema";
import bcrypt from "bcrypt";

export const load: PageServerLoad = async ({ locals }) => {
	// redirect user if logged in
	if (locals.user) {
		throw redirect(302, "/");
	}
};

const login: Action = async ({ request, cookies }) => {
	const data = await request.formData();
	const username = data.get("username");
	const password = data.get("password");

	if (typeof username !== "string" || typeof password !== "string" || !username || !password) {
		return fail(400, { invalid: true });
	}

	const user = await db.query.users.findFirst({
		where: eq(users.username, username),
	});

	if (!user) {
		return fail(404, { credentials: true });
	}

	const userPassword = await bcrypt.compare(password, user?.passwordHash);

	if (!userPassword) {
		return fail(400, { credentials: true });
	}

	// Update the auth token

	const authUser = await db
		.update(users)
		.set({
			userAuthToken: crypto.randomUUID(),
		})
		.where(eq(users.username, username))
		.returning({
			userAuthToken: users.userAuthToken,
		});

	if (authUser[0].userAuthToken)
		cookies.set("session", authUser[0].userAuthToken, {
			path: "/",
			httpOnly: true,
			sameSite: "strict",
			secure: process.env.NODE_ENV === "PRODUCTION",
			maxAge: 60 * 60 * 24 * 30,
		});

	throw redirect(302, "/");
};

export const actions: Actions = {
	login,
};
