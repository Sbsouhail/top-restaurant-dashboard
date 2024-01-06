<script lang="ts">
	import { goto } from '$app/navigation';
	import { StatusEnum } from '../../../types/auth-user.interface';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<!-- Responsive Container (recommended) -->
<div
	class="table-container p-10 h-screen flex flex-col
items-center gap-5"
>
	{#if data.restaurants.count}
		<!-- Native Table Element -->
		<table class="table table-hover">
			<thead>
				<tr>
					<th>Id</th>
					<th>Name</th>
					<th>Location</th>
					<th>User email</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each data.restaurants.items as row, i}
					<tr
						on:click={() => {
							goto(`/restaurants/${row.restaurant_id}`);
						}}
					>
						<td>{row.restaurant_id}</td>
						<td>{row.name}</td>
						<td>{row.location}</td>
						<td>{row.user_email}</td>
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
