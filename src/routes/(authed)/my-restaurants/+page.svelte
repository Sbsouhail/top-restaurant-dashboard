<script lang="ts">
	import { redirect } from '@sveltejs/kit';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';

	export let data: PageData;
</script>

<!-- Responsive Container (recommended) -->
<div class="table-container p-10">
	<a href="/my-restaurants/create"
		><button type="button" class="btn btn-md variant-filled-primary mr-0 ml-auto block mb-3"
			>+</button
		></a
	>
	{#if data.restaurants.count}
		<!-- Native Table Element -->
		<table class="table table-interactive">
			<thead>
				<tr>
					<th>Id</th>
					<th>Name</th>
					<th>Location</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each data.restaurants.items as row, i}
					<tr
						on:click={() => {
							goto(`/my-restaurants/${row.restaurant_id}`);
						}}
					>
						<td>{row.restaurant_id}</td>
						<td>{row.name}</td>
						<td>{row.location}</td>
						<td>
							<form method="POST" action="?/delete">
								<input type="hidden" name="restaurant_id" value={row.restaurant_id} />
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
