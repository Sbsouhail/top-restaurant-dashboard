<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	export let data: PageData;
</script>

<div class="flex items-center mt-3 gap-5 ml-10">
	<a href={`/my-restaurants/${$page.params.id}`}
		><button type="button" class="btn btn-md variant-filled-primary block">{'<'}</button></a
	>
	<h2 class="h2">Meals</h2>
</div>

<!-- Responsive Container (recommended) -->
<div class="table-container p-10">
	<a href={`/my-restaurants/${$page.params.id}/menus/${$page.params.menu_id}/create`}
		><button type="button" class="btn btn-md variant-filled-primary mr-0 ml-auto block mb-3"
			>+</button
		></a
	>
	{#if data.items.count}
		<!-- Native Table Element -->
		<table class="table table-interactive">
			<thead>
				<tr>
					<th>Id</th>
					<th>Name</th>
					<th>Price</th>
					<th>Description</th>
					<th>Image</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each data.items.items as row, i}
					<tr>
						<td>{row.restaurant_menu_id}</td>
						<td>{row.name}</td>
						<td>{row.price} TND</td>
						<td>{row.description}</td>
						<td>
							<Avatar
								src="http://localhost:3000/{row.cover_image_uri}"
								alt="cover"
								width="w-9"
								rounded="rounded-2xl"
							/>
						</td>
						<td>
							<form method="POST" action="?/delete">
								<input type="hidden" name="menu_item_id" value={row.restaurant_menu_item_id} />
								<button type="submit" class="btn btn-sm variant-ghost-warning">Delete</button>
							</form>
						</td>
					</tr>
				{/each}
			</tbody>
			<!-- <tfoot>
							<tr>
								<th colspan="3">Calculated Total Weight</th>
								<td>{totalWeight}</td>
							</tr>
						</tfoot> -->
		</table>
	{/if}
</div>
