<script lang="ts">
	import {
		Accordion,
		AccordionItem,
		Table,
		tableMapperValues,
		type TableSource
	} from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';

	export let data: PageData;

	const tableSimple: TableSource = {
		// A list of heading labels.
		head: ['Name', 'Last name', 'Email', 'Action'],
		// The data visibly shown in your table body UI.
		body: tableMapperValues(data.users.items, ['name', 'last_name', 'email', 'test'])
		// Optional: The data returned when interactive is enabled and a row is clicked.
		// meta: tableMapperValues(data.users.items, ['user_id', 'name', 'last_name', 'email'])
		// Optional: A list of footer labels.
		// foot: ['Total', '', '<code class="code">5</code>']
	};

	const tableSimple2: TableSource = {
		// A list of heading labels.
		head: ['Name', 'Last name', 'Email'],
		// The data visibly shown in your table body UI.
		body: tableMapperValues(data.accptedUsers.items, ['name', 'last_name', 'email'])
		// Optional: The data returned when interactive is enabled and a row is clicked.
		// meta: tableMapperValues(data.accptedUsers.items, ['user_id', 'name', 'last_name', 'email'])
		// Optional: A list of footer labels.
		// foot: ['Total', '', '<code class="code">5</code>']
	};
</script>

<Accordion autocollapse>
	<AccordionItem open={data.accptedUsers.count > 0}>
		<svelte:fragment slot="lead">Restaurant owners</svelte:fragment>
		<svelte:fragment slot="summary">{data.accptedUsers.count}</svelte:fragment>
		<svelte:fragment slot="content">
			{#if data.accptedUsers.count}
				<Table
					source={tableSimple2}
					interactive={false}
					on:selected={(value) => console.log(value)}
				/>
			{/if}
		</svelte:fragment>
	</AccordionItem>
	<AccordionItem open={data.accptedUsers.count <= 0 && data.users.count > 0}>
		<svelte:fragment slot="lead">Requests</svelte:fragment>
		<svelte:fragment slot="summary">{data.users.count}</svelte:fragment>
		<svelte:fragment slot="content">
			{#if data.users.count}
				<Table
					source={tableSimple}
					interactive={false}
					on:selected={(value) => console.log(value)}
				/>
			{/if}
		</svelte:fragment>
	</AccordionItem>
</Accordion>
