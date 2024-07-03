<script lang="ts">
	import type { PageData, ActionData } from './$types';

	export let form: ActionData;
</script>

<form
	method="POST"
	class="h-screen flex flex-col
items-center justify-center gap-5"
	autocomplete="off"
>
	{#if form?.missing}<p class="error">The email field is required</p>{/if}
	{#if form?.unauthorized}<p class="error">Wrong creds!</p>{/if}

	<label class="label">
		<input class="input" type="text" name="name" required placeholder="name" />
	</label>
	<label class="label">
		<input class="input" type="text" name="last_name" required placeholder="last name" />
	</label>
	<label class="label">
		<input class="input" type="email" name="email" required placeholder="email" />
	</label>
	<label class="label">
		<input class="input" type="password" name="password" required placeholder="password" />
	</label>
	<button type="submit" class="btn variant-ghost-primary">Register</button>
	<p class="text-sm">
		You already have an account ? <a class="underline" href="/auth">login</a>
	</p>
</form>
