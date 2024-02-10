<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	export let data: PageData;
</script>

<div class="flex items-center mt-3 gap-5 ml-10">
	<a href="/my-restaurants"
		><button type="button" class="btn btn-md variant-filled-primary block">{'<'}</button></a
	>
	<h2 class="h2">Menus</h2>
</div>

<div class="card m-10 p-5 rounded-2xl flex gap-5 items-center">
	<Avatar
		src="http://localhost:3000/{data.restaurant?.cover_image_uri}"
		alt="cover"
		width="w-32"
		rounded="rounded-2xl"
	/>
	<div class="flex-col">
		<p>ID: {data.restaurant.restaurant_id}</p>
		<p>Name: {data.restaurant.name}</p>
		<p>Location: {data.restaurant.location}</p>
	</div>
</div>

<!-- Responsive Container (recommended) -->
<div class="table-container p-10">
	<a href={`/my-restaurants/${$page.params.id}/menus/create`}
		><button type="button" class="btn btn-md variant-filled-primary mr-0 ml-auto block mb-3"
			>+</button
		></a
	>
	{#if data.menus.count}
		<!-- Native Table Element -->
		<table class="table table-interactive">
			<thead>
				<tr>
					<th>Id</th>
					<th>Name</th>
					<th>Active</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each data.menus.items as row, i}
					<tr
						on:click={(event) => {
							goto(`/my-restaurants/${row.restaurant_id}/menus/${row.restaurant_menu_id}`);
						}}
					>
						<td>{row.restaurant_menu_id}</td>
						<td>{row.name}</td>
						<td>{row.is_active}</td>
						<td class="flex gap-3">
							<form method="POST" action="?/delete">
								<input type="hidden" name="menu_id" value={row.restaurant_menu_id} />
								<button
									type="submit"
									class="btn btn-sm variant-ghost-warning"
									on:click={(event) => event.stopPropagation()}>Delete</button
								>
							</form>
							{#if !row.is_active}
								<form method="POST" action="?/activate">
									<input type="hidden" name="menu_id" value={row.restaurant_menu_id} />
									<button
										type="submit"
										class="btn btn-sm variant-ghost-primary"
										on:click={(event) => event.stopPropagation()}>Activate</button
									>
								</form>
							{:else}
								<form method="POST" action="?/disactivate">
									<input type="hidden" name="menu_id" value={row.restaurant_menu_id} />
									<button
										type="submit"
										class="btn btn-sm variant-ghost-secondary"
										on:click={(event) => event.stopPropagation()}>Disactivate</button
									>
								</form>
							{/if}
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
