<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="flex items-center mt-3 gap-5 ml-10">
	<a href={`/my-restaurants/${$page.params.id}/menus/${$page.params.menu_id}`}
		><button type="button" class="btn btn-md variant-filled-primary block">{'<'}</button></a
	>
	<h2 class="h2">Create Meal</h2>
</div>

<div>
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
				value={$page.params.menu_id}
				required
				placeholder="name"
			/>
		</label>
		<label class="label">
			<input class="input" type="text" name="name" required placeholder="name" />
		</label>
		<label class="label">
			<input
				class="input"
				type="number"
				required
				name="price"
				min="0"
				value="0"
				step="any"
				placeholder="price"
			/>
		</label>
		<label class="label">
			<textarea class="textarea" rows="4" name="description" required placeholder="description" />
		</label>

		<label class="label">
			<input
				class="input"
				type="file"
				name="image"
				required
				placeholder="image"
				accept="image/jpg,image/jpeg"
			/>
		</label>

		<button type="submit" class="btn variant-ghost-primary">Create</button>
	</form>
</div>
