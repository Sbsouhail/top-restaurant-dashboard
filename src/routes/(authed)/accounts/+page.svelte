<script lang="ts">
	import { StatusEnum } from '../../../types/auth-user.interface';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<!-- Responsive Container (recommended) -->
<div class="table-container p-10">
	<!-- Native Table Element -->
	<table class="table table-hover">
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
</div>
