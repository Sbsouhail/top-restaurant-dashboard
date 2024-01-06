<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Avatar
	src="http://localhost:3000/{data.restaurant?.cover_image_uri}"
	alt="cover"
	width="w-32"
	rounded="rounded-2xl"
/>
