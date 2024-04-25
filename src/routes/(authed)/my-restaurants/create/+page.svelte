<script lang="ts">
</script>

<div class="flex items-center mt-3 gap-5 ml-10">
	<a href="/my-restaurants"
		><button type="button" class="btn btn-md variant-filled-primary block">{'<'}</button></a
	>
	<h2 class="h2">Create Restaurant</h2>
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
			<input class="input" type="text" name="name" required placeholder="name" />
		</label>
		<label class="label">
			<input class="input" type="tel" name="phone" required placeholder="phone" />
		</label>
		<label class="label">
			<input class="input" type="text" name="email" required placeholder="email" />
		</label>
		<label class="label">
			<textarea class="textarea" rows="4" name="location" required placeholder="location" />
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
