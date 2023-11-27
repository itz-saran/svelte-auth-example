import { SECRET_DB_CONNECTION_STRING } from "$env/static/private";
import { db, initDB } from "$lib/db/index.server";
import { users } from "$lib/db/schema";
import type { Handle } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

initDB({ connectionUrl: SECRET_DB_CONNECTION_STRING }).then(() => {
	console.log("DB_CONNECTED");
});

export const handle: Handle = async ({ event, resolve }) => {
	const session = event.cookies.get("session");
	if (!session) {
		return await resolve(event);
	}
	const user = await db.query.users.findFirst({
		where: eq(users.userAuthToken, session),
	});

	if (user) {
		event.locals.user = {
			name: user.username,
			role: user.role,
		};
	}

	return await resolve(event);
};
