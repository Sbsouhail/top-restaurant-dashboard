<script lang="ts">
	import { AppRail, AppRailAnchor, AppShell } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import { RoleEnum } from '../../types/auth-user.interface';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<AppShell>
	<!-- (header) -->
	<svelte:fragment slot="sidebarLeft">
		<AppRail>
			<svelte:fragment slot="lead">
				<AppRailAnchor href="/" selected={$page.url.pathname === '/'}>
					<svelte:fragment slot="lead"><i class="fa-solid fa-house text-2xl" /></svelte:fragment>
					<span>Home</span>
				</AppRailAnchor>
				{#if data.authUser.role == RoleEnum.Admin}
					<AppRailAnchor href="/accounts" selected={$page.url.pathname === '/accounts'}>
						<svelte:fragment slot="lead"><i class="fa-solid fa-list text-2xl" /></svelte:fragment>
						<span>Accounts</span>
					</AppRailAnchor>
					<AppRailAnchor href="/restaurants" selected={$page.url.pathname === '/restaurants'}>
						<svelte:fragment slot="lead"
							><i class="fa-solid fa-list-check text-2xl" /></svelte:fragment
						>
						<span>Restaurants</span>
					</AppRailAnchor>
				{/if}
				{#if data.authUser.role == RoleEnum.Admin || data.authUser.role == RoleEnum.RestaurantOwner}
					<AppRailAnchor href="my-restaurants" selected={$page.url.pathname === '/my-restaurants'}>
						<svelte:fragment slot="lead"><i class="fa-solid fa-list text-2xl" /></svelte:fragment>
						<span>My Restaurants</span>
					</AppRailAnchor>
				{/if}
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<AppRailAnchor href="/settings" selected={$page.url.pathname === '/settings'}>
					<svelte:fragment slot="lead"><i class="fa-solid fa-gear text-2xl" /></svelte:fragment>
					<span>Settings</span>
				</AppRailAnchor>
			</svelte:fragment>
		</AppRail>
	</svelte:fragment>
	<!-- (sidebarRight) -->
	<!-- (pageHeader) -->
	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
	<!-- (pageFooter) -->
	<!-- (footer) -->
</AppShell>
