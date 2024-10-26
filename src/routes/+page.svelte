<script lang="ts">
	import { CLSEnum, type DepartureBoard, type DepartureEntry } from '../domain/api.types';
	import type { DepartureEntryListItem } from '../domain/internal.types';
	import relativeTime from 'dayjs/plugin/relativeTime';
	import dayjs from 'dayjs';
	dayjs.extend(relativeTime);

	let loading = $state(true);
	let departures: DepartureEntryListItem[] = $state([]);
	$effect(() => {
		loading = true;

		fetch(getURL())
			.then((response) => response.json())
			.then((departuresResponse: DepartureBoard) => {
				console.log(departuresResponse);
				loading = false;
				departures = departuresResponse.Departure.map((departure) => {
					const departureTime = dayjs(departure.date + 'T' + departure.time);
					const relativeDepartureTime = departureTime.fromNow();
					// const relativeDepartureTime = dayjs().toNow(departureTime);
					return {
						...departure,
						relativeTime: relativeDepartureTime,
						icon: getIcon(departure)
					};
				});
			});
	});
	function getURL(): string {
		const isTesting = true;
		if (isTesting) {
			return `/response-example.json`;
		}
		const spangaId = '740000764';
		const resRobotKey = import.meta.env.VITE_RESROBOT_KEY;
		return `https://api.resrobot.se/v2.1/departureBoard?id=${spangaId}&lang=en&format=json&accessId=${resRobotKey}`;
	}
	function getIcon(departure: DepartureEntry): string {
		const product = departure.Product.at(0);
		if (!product) {
			return '❔';
		}
		switch (product.cls) {
			case CLSEnum.Airplanes:
				return '🛫';
			case CLSEnum.HighSpeedTrain:
				return '🚆 ❗';
			case CLSEnum.RegionalTrain:
				return '🚆 🐌';
			case CLSEnum.SpecialBus:
				return '🚌❗';
			case CLSEnum.LocalTrain:
				return '🚆';
			case CLSEnum.Metro:
				return '🚇';
			case CLSEnum.Tram:
				return '🚊';
			case CLSEnum.LocalBus:
				return '🚌';
			case CLSEnum.Ferry:
				return '⛴️';
			case CLSEnum.Taxi:
				return '🚕';
			default:
				return '❓';
		}
	}
</script>

<header>
	<h1>SL Viewer - Spånga Station departures</h1>
</header>
<section>
	{#if loading}
		<div class="loader">🚆 🫶 🚌</div>
	{/if}
	<ul>
		{#each departures as departure}
			<li>
				<div class="title">
					<span>{departure.icon}</span>
					<strong>{departure.name}</strong>
					<span> {departure.relativeTime} </span>
				</div>
				<div class="direction">
					<span>Towards: {departure.direction}</span>
				</div>
				<div class="time">
					<span> {departure.time} </span>
				</div>
				<div class="date">
					<span> {departure.date} </span>
				</div>
			</li>
		{/each}
	</ul>
</section>

<style lang="scss">
	:global(body) {
		background-color: #444;
		color: white;
	}
	header {
		width: 100%;
		display: flex;
		border-bottom: 2px solid #999;
		justify-content: center;
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
	}
	@keyframes loader-anim {
		from {
			transform: scale(0.25);
		}
		to {
			transform: scale(3);
		}
	}
	ul {
		padding-right: 0;
		list-style: none;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		flex-grow: 1;
		gap: 2em;

		li {
			width: 400px;
			padding: 1em;
			border-radius: 8px;
			background-color: #0f3539;
			// display: flex;
			// flex-direction: column;
			display: grid;
			grid-template-columns: 300px 100px;
			grid-template-rows: 30px 30px;
			.direction {
				grid-row: 2;
			}
		}
	}
</style>
