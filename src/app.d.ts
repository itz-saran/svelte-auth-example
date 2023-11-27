// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import { ROLE } from "$lib/db/schema";
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: {
				name: string;
				role: ROLE;
			};
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
