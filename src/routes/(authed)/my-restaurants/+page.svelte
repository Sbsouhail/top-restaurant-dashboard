<script lang="ts">
	import { redirect } from '@sveltejs/kit';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { Paginator, type PaginationSettings } from '@skeletonlabs/skeleton';

	import { page } from '$app/stores';

	export let data: PageData;

	let query = new URLSearchParams($page.url.searchParams.toString());

	let paginationSettings = {
		page: Number(query.get('page')) || 1,
		limit: Number(query.get('page_size')) || 10,
		size: data.restaurants.count,
		amounts: [2, 5, 10, 15]
	} satisfies PaginationSettings;

	export function onPageChange(e: CustomEvent): void {
		query.set('page', e.detail + 1);
		goto(`?${query.toString()}`);
	}

	export function onAmountChange(e: CustomEvent): void {
		query.set('page_size', e.detail);
		goto(`?${query.toString()}`);
	}
</script>

<div class="flex items-center mt-3 gap-5 ml-10">
	<h2 class="h2">My restaurants</h2>
</div>

<!-- Responsive Container (recommended) -->
<div class="table-container p-10">
	<a href="/my-restaurants/create"
		><button type="button" class="btn btn-md variant-filled-primary mr-0 ml-auto block mb-3"
			>+</button
		></a
	>
	{#if data.restaurants.count}
		<!-- Native Table Element -->
		<table class="table table-interactive mb-3">
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
		<Paginator
			bind:settings={paginationSettings}
			showFirstLastButtons={false}
			showPreviousNextButtons={true}
			on:page={onPageChange}
			on:amount={onAmountChange}
		/>
	{/if}
</div>
