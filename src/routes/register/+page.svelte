<script lang="ts">
	import type { ActionData } from "./$types";
	import { enhance } from "$app/forms";
	export let form: ActionData;
</script>

<h1>Register</h1>
<form action="?/register" method="post" use:enhance>
	<div>
		<label for="username">User name</label>
		<input type="text" id="username" name="username" required />
		<label for="password">password</label>
		<input type="password" id="password" name="password" required />
	</div>

	{#if form?.user}
		<p class="error">User name is taken</p>
	{/if}

	<button type="submit">register</button>
</form>
