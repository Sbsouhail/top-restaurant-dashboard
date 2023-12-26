<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>Hello {data.authUser.name}</h1>

<form method="POST">
	<button type="submit">logout</button>
</form>
