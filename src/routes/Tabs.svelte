<script lang="ts">
	import type { TabItem } from '../domain/internal.types';

	export let items: TabItem[] = [];
	export let activeTabValue = 0;

	const handleClick = (tabValue: number) => () => (activeTabValue = tabValue);
</script>

<ul class="tabs">
	{#each items as item}
		<li class={activeTabValue === item.value ? 'active' : ''}>
			<button onclick={handleClick(item.value)}>
				<span>{item.label}</span>
				{item.departures.length}
				{activeTabValue}
				{item.value}
			</button>
		</li>
	{/each}
</ul>
<section>
	{#each items as item}
		{#if activeTabValue == item.value}
			{@const SvelteComponent = item.component}
			<SvelteComponent departures={item.departures} />
		{/if}
	{/each}
</section>

<style lang="scss">
	ul.tabs {
		margin-top: 0;
		display: flex;
		flex-wrap: wrap;
		padding-left: 0;
		margin-bottom: 0;
		list-style: none;
		border-bottom: 1px solid #dee2e6;

		li {
			margin-bottom: -1px;
		}

		button {
			color: white;
			border: 1px solid transparent;
			border-top-left-radius: 0.25rem;
			border-top-right-radius: 0.25rem;
			display: block;
			padding: 0.5rem 1rem;
			cursor: pointer;
		}

		button:hover {
			border-color: #e9ecef #e9ecef #dee2e6;
		}

		li.active > button {
			// color: #495057;
			// background-color: #fff;
			font-weight: 700;
			border-color: #dee2e6 #dee2e6 #fff;
		}
	}
</style>
