<script lang="ts">
	import type { PageData } from './$types';

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
		<table class="table table-hover">
			<thead>
				<tr>
					<th>Id</th>
					<th>Name</th>
					<th>Location</th>
				</tr>
			</thead>
			<tbody>
				{#each data.restaurants.items as row, i}
					<tr>
						<td>{row.restaurant_id}</td>
						<td>{row.name}</td>
						<td>{row.location}</td>
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
