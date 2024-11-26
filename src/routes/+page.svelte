<script lang="ts">
	import { swipe, type SwipeCustomEvent } from 'svelte-gestures';
	import type { DepartureEntryListItem } from '../domain/internal.types';
	import { getTabComponents, loadDepartures, isNightTime, updateDepartureTimes } from '../utils';
	import Tabs from './Tabs.svelte';
	import Weather from './Weather.svelte';

	let loading = $state(true);
	let departures: DepartureEntryListItem[] = $state([]);

	let time = $state(new Date());

	let items = $derived.by(() => getTabComponents(departures));

	let activeTabItem = $state(0);

	let fullscreenActive = $state(false);
	let fullscreenEnabled = $state(false);

	$effect(() => {
		fullscreenEnabled = window.document.fullscreenEnabled;
		setTimeout(() => {
			fullscreen();
		});
	});

	$effect(() => {
		const interval = setInterval(() => {
			time = new Date();
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});

	$effect(() => {
		syncSLData();
		const interval = setInterval(
			() => {
				if (!isNightTime()) {
					syncSLData();
				}
			},
			1000 * 60 * 20 // 20 mins
		);

		return () => {
			clearInterval(interval);
		};
	});

	$effect(() => {
		const interval = setInterval(() => {
			departures = updateDepartureTimes(departures);
		}, 10000);

		return () => {
			clearInterval(interval);
		};
	});

	async function syncSLData(): Promise<void> {
		loading = true;

		departures = await loadDepartures();

		loading = false;
	}

	async function fullscreen(): Promise<void> {
		if (!fullscreenEnabled) {
			return;
		}
		if (!fullscreenActive) {
			try {
				await window.document.body.requestFullscreen();
			} catch {
				/* empty */
			}
		} else {
			await window.document.exitFullscreen();
		}
		fullscreenActive = !!window.document.fullscreenElement;
	}

	function swipeHandler(event: Event): void {
		if (event.type !== 'swipe') {
			return;
		}

		const detail = (event as SwipeCustomEvent).detail;

		if (detail.direction === 'right') {
			activeTabItem = Math.max(0, activeTabItem - 1);
		} else if (detail.direction === 'left') {
			activeTabItem = Math.min(items.length - 1, activeTabItem + 1);
		}
	}
</script>

<header>
	<div class="left">
		<Weather />
	</div>
	<div class="center">
		<h1>Spånga Station departures</h1>
	</div>
	<div class="right">
		<div class="time">
			{time.toLocaleTimeString('sv')}
		</div>
		<button onclick={syncSLData} class={loading ? 'loading' : ''}>
			<span class="material-symbols-outlined">sync</span>
		</button>
		{#if fullscreenEnabled}
			<button onclick={fullscreen}>
				<span class="material-symbols-outlined"
					>{fullscreenActive ? 'fullscreen_exit' : 'fullscreen'}</span
				>
			</button>
		{/if}
	</div>
</header>

<section class="main" use:swipe={{ timeframe: 300, minSwipeDistance: 100 }} onswipe={swipeHandler}>
	<Tabs {items} activeTabValue={activeTabItem} />
	{#if loading}
		<div class="loader">🚆 🫶 🚌</div>
	{/if}
</section>

<style lang="scss">
	:global(body) {
		background-color: #444;
		color: white;
		user-select: none; /* Standard syntax */
		cursor: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjbQg61aAAAADUlEQVQYV2P4//8/IwAI/QL/+TZZdwAAAABJRU5ErkJggg=='),
			none;
		font-family: 'Roboto';
	}
	:global(button) {
		background: transparent;
		border: none;
		outline: none;
	}

	@font-face {
		font-family: 'NotoSansEmoji';
		src: url('/fonts/NotoColorEmoji-Regular.ttf');
	}

	header {
		position: sticky;
		top: 0;
		background-color: #444;
		z-index: 2;
		width: 100%;
		display: grid;
		border-bottom: 2px solid #999;
		justify-content: center;
		grid-template-columns: 30% 1fr 30%;

		.left {
			display: flex;
			justify-content: flex-start;
			align-items: center;
		}
		.center {
			display: flex;
			justify-content: center;
		}
		.right {
			display: flex;
			justify-content: flex-end;
			align-items: center;

			.time {
				font-size: 32px;
				margin-right: 24px;
			}

			button {
				margin: auto 4px;
				background: transparent;
				border: none;
				outline: none;
				color: white;
				border: 1px solid #fff;
				border-radius: 50%;
				height: 3em;
				cursor: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjbQg61aAAAADUlEQVQYV2P4//8/IwAI/QL/+TZZdwAAAABJRU5ErkJggg=='),
					none;
				&.loading {
					animation: sync-anim 1s ease-out infinite;
				}
				span {
					font-size: 25px;
				}
				&:hover {
					border: 1px solid #ccc;
				}
			}
		}
	}
	section.main {
		height: calc(100vh - 98px);
	}

	.loader {
		display: block;
		position: absolute;
		animation: loader-anim 2s linear infinite;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		background-color: rgba(150, 0, 200);
		padding: 10px;
		border-radius: 8px;
		font-size: 12px;
		font-family: 'NotoSansEmoji';
		z-index: 2;
	}

	@keyframes sync-anim {
		from {
			-webkit-transform: rotate(0deg);
		}
		to {
			-webkit-transform: rotate(360deg);
		}
	}

	@keyframes loader-anim {
		from {
			transform: scale(0.25);
		}
		to {
			transform: scale(3);
		}
	}
</style>
