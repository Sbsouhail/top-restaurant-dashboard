<script lang="ts">
	import { Avatar, Paginator, type PaginationSettings } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	export let data: PageData;

	let query = new URLSearchParams($page.url.searchParams.toString());

	let paginationSettings = {
		page: Number(query.get('page')) || 1,
		limit: Number(query.get('page_size')) || 10,
		size: data.items.count,
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
	<a href={`/restaurants/${$page.params.id}`}
		><button type="button" class="btn btn-md variant-filled-primary block">{'<'}</button></a
	>
	<h2 class="h2">Meals</h2>
</div>

<!-- Responsive Container (recommended) -->
<div class="table-container p-10">
	{#if data.items.count}
		<!-- Native Table Element -->
		<table class="table table-interactive mb-3">
			<thead>
				<tr>
					<th>Id</th>
					<th>Name</th>
					<th>Price</th>
					<th>Description</th>
					<th>Image</th>
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
