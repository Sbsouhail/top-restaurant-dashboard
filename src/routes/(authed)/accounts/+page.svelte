<script lang="ts">
	import { Paginator, type PaginationSettings } from '@skeletonlabs/skeleton';
	import { StatusEnum } from '../../../types/auth-user.interface';
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	export let data: PageData;

	let query = new URLSearchParams($page.url.searchParams.toString());

	let paginationSettings = {
		page: Number(query.get('page')) || 1,
		limit: Number(query.get('page_size')) || 10,
		size: data.users.count,
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

<!-- Responsive Container (recommended) -->
<div class="table-container p-10">
	<!-- Native Table Element -->
	{#if data.users.count}
		<table class="table table-hover mb-3">
			<thead>
				<tr>
					<th>Id</th>
					<th>Name</th>
					<th>Last Name</th>
					<th>Email</th>
					<th>Status</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody>
				{#each data.users.items as row, i}
					<tr>
						<td>{row.user_id}</td>
						<td>{row.name}</td>
						<td>{row.last_name}</td>
						<td>{row.email}</td>
						<td>{row.status}</td>
						<td>
							{#if row.status == StatusEnum.Accepted}
								<form method="POST" action="?/block">
									<input type="hidden" name="user_id" value={row.user_id} />
									<button type="submit" class="btn btn-sm variant-ghost-warning">Block</button>
								</form>
							{:else if row.status == StatusEnum.Blocked}
								<form method="POST" action="?/accept">
									<input type="hidden" name="user_id" value={row.user_id} />
									<button type="submit" class="btn btn-sm variant-ghost-secondary">Unblock</button>
								</form>
							{:else}
								<form method="POST" action="?/accept">
									<input type="hidden" name="user_id" value={row.user_id} />
									<button type="submit" class="btn btn-sm variant-ghost-primary">Accept</button>
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
		<Paginator
			bind:settings={paginationSettings}
			showFirstLastButtons={false}
			showPreviousNextButtons={true}
			on:page={onPageChange}
			on:amount={onAmountChange}
		/>
	{/if}
</div>
