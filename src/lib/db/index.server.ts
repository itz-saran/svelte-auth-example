import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import * as schema from "./schema";

export let db: ReturnType<typeof drizzle<typeof schema>>;

type Options = {
	connectionUrl: string;
};

export const initDB = async (opts: Options) => {
	try {
		const client = postgres(opts.connectionUrl, { max: 1 });
		db = drizzle(client, { schema });
		await migrate(db, {
			migrationsFolder: "drizzle",
		}).then(() => {
			console.log("DB_MIGRATED");
		});
	} catch (error) {
		console.log("DB_ERROR", error);
	}
};
