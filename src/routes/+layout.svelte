<script lang="ts">
	import "../app.css";
	import { enhance } from "$app/forms";
	import { page } from "$app/stores";
</script>

<svelte:head>
	<title>SvelteKit Auth</title>
</svelte:head>

<nav>
	{#if !$page.data.user}
		<a href="/login">Login</a>
		<a href="/register">Register</a>
	{/if}

	{#if $page.data.user}
		<a href="/admin">Admin</a>

		<form action="/logout" method="POST" use:enhance>
			<button type="submit">Log out</button>
		</form>
	{/if}
</nav>

<main>
	<slot />
</main>
