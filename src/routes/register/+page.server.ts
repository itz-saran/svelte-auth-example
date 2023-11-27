import { db } from "$lib/db/index.server";
import { users } from "$lib/db/schema";
import { eq } from "drizzle-orm";
import type { Action, Actions, PageServerLoad } from "./$types";
import { redirect, fail } from "@sveltejs/kit";
import bcrypt from "bcrypt";

export const load: PageServerLoad = async ({ locals }) => {
	// redirect user if logged in
	if (locals.user) {
		throw redirect(302, "/");
	}
};

const register: Action = async ({ request }) => {
	const data = await request.formData();
	const username = data.get("username");
	const password = data.get("password");

	if (!username || !password || typeof username !== "string" || typeof password !== "string") {
		return fail(400, { invalid: true });
	}

	const user = await db.query.users.findFirst({
		where: eq(users.username, username),
	});

	if (user) {
		return fail(400, { user: true });
	}

	await db.insert(users).values({
		username,
		passwordHash: await bcrypt.hash(password, 10),
		userAuthToken: crypto.randomUUID(),
		role: "USER",
	});

	throw redirect(303, "/login");
};

export const actions: Actions = {
	register,
};
