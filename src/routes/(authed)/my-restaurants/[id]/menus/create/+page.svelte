<script lang="ts">
	import { page } from '$app/stores';
</script>

<div>
	<a href={`/my-restaurants/${$page.params.id}`} class="absolute mt-3 ml-3"
		><button type="button" class="btn btn-md variant-filled-primary block">{'<'}</button></a
	>
	<form
		method="POST"
		class="h-screen flex flex-col
items-center justify-center gap-5"
		autocomplete="off"
		enctype="multipart/form-data"
	>
		<label class="label">
			<input
				class="hidden"
				type="text"
				name="id"
				value={$page.params.id}
				required
				placeholder="name"
			/>
		</label>
		<label class="label">
			<input class="input" type="text" name="name" required placeholder="name" />
		</label>
		<label class="label">
			<textarea class="textarea" rows="4" name="description" required placeholder="description" />
		</label>

		<button type="submit" class="btn variant-ghost-primary">Create</button>
	</form>
</div>
