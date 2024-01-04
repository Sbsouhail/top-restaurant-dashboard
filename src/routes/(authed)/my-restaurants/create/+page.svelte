<script lang="ts">
</script>

<form
	method="POST"
	class="h-screen flex flex-col
items-center justify-center gap-5"
	autocomplete="off"
>
	<label class="label">
		<input class="input" type="text" name="name" required placeholder="name" />
	</label>
	<button type="submit" class="btn variant-ghost-primary">Create</button>
	<p class="text-sm">
		<a class="underline" href="/my-restaurants">Cancel</a>
	</p>
</form>
