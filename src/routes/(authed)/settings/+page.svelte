<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="flex items-center mt-3 gap-5 ml-10">
	<h2 class="h2">Profile</h2>
</div>

<div class="card m-10 p-5 rounded-2xl flex gap-5 items-center">
	<div class="flex-col">
		<p>ID: {data.authUser.user_id}</p>
		<p>Name: {data.authUser.name}</p>
		<p>Last Name: {data.authUser.last_name}</p>
		<p>Email: {data.authUser.email}</p>
	</div>
</div>
<form method="POST">
	<button class="btn btn-sm variant-ghost-warning ml-10" type="submit">logout</button>
</form>
