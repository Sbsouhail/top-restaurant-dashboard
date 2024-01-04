<script lang="ts">
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
					<th>Name</th>
				</tr>
			</thead>
			<tbody>
				{#each data.restaurants.items as row, i}
					<tr>
						<td>{row.name}</td>
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
