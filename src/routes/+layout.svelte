<script lang="ts">
	import '../app.postcss';
	import '@fortawesome/fontawesome-free/css/all.min.css';
</script>

<slot />

<style global>
	:global(html),
	:global(body) {
		margin: 0;
		padding: 0;

		min-width: 100%;
		width: 100%;
		max-width: 100%;

		min-height: 100%;
		height: 100%;
		max-height: 100%;
	}
</style>
