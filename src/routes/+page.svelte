<script lang="ts">
	import { type DepartureBoard } from '../domain/api.types';
	import type { DepartureEntryListItem } from '../domain/internal.types';
	import { mapDeparturesToListItems, updateDepartureTimes } from '../utils';

	let loading = $state(true);
	let departures: DepartureEntryListItem[] = $state([]);

	let time = $state(new Date());

	$effect(() => {
		const interval = setInterval(() => {
			time = new Date();
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});

	$effect(() => {
		syncData();
		const interval = setInterval(
			() => {
				syncData();
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

	function syncData(): void {
		loading = true;

		fetch(getURL())
			.then((response) => response.json())
			.then((departuresResponse: DepartureBoard) => {
				setTimeout(() => {
					departures = mapDeparturesToListItems(departuresResponse.Departure);
					loading = false;
				}, 2000);
			});
	}

	function getURL(): string {
		const isTesting = import.meta.env.VITE_TESTDATA;

		if (isTesting) {
			return `/response-example.json`;
		}
		const spangaId = '740000764';
		const resRobotKey = import.meta.env.VITE_RESROBOT_KEY;
		return `https://api.resrobot.se/v2.1/departureBoard?id=${spangaId}&lang=en&format=json&accessId=${resRobotKey}`;
	}
</script>

<header>
	<div class="left"></div>
	<div class="center">
		<h1>Spånga Station departures</h1>
	</div>
	<div class="right">
		<div class="time">
			{time.toLocaleTimeString('sv')}
		</div>
		<button onclick={syncData} class={loading ? 'loading' : ''}>
			<span class="material-symbols-outlined">sync</span>
		</button>
	</div>
</header>
<section>
	{#if loading}
		<div class="loader">🚆 🫶 🚌</div>
	{/if}
	<ul>
		{#each departures as departure}
			<li class={departure.gone ? 'gone' : 'arriving'}>
				<div class="departure-type">
					<span class="icon material-symbols-outlined">{departure.materialIcon}</span>
					<span class="type">{departure.transportType}</span>
				</div>
				<div class="title">
					<strong>{departure.line}</strong>
					<span> {departure.relativeTime} </span>
				</div>
				<div class="direction">
					<span> ➡️ {departure.direction}</span>
				</div>
				<div class="date">
					<span> {departure.time} </span>
					<br />
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
		user-select: none; /* Standard syntax */
		cursor: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjbQg61aAAAADUlEQVQYV2P4//8/IwAI/QL/+TZZdwAAAABJRU5ErkJggg=='),
			none;
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
		grid-template-columns: 30% auto 30%;

		.right {
			display: flex;
			justify-content: flex-end;
			align-items: center;

			.time {
				font-size: 32px;
				margin-right: 24px;
			}

			button {
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
	ul {
		padding: 10px;
		list-style: none;
		justify-content: center;
		align-items: center;
		display: grid;
		grid-template-columns: 50% 50%;
		column-gap: 15px;

		li {
			margin-bottom: 10px;
			width: auto;
			padding: 1.5em;
			border-radius: 8px;
			background-color: #0f3539;

			display: grid;
			grid-template-columns: 50px auto 100px;
			grid-template-rows: 100px 40px;
			column-gap: 15px;

			&.gone {
				opacity: 0.4;
			}

			.direction {
				grid-row: 2;
				font-size: 20px;
			}

			.departure-type {
				grid-row: 1/-1;
				grid-column: 1;
				place-self: center;
				color: white;
				text-align: center;

				.type {
					display: block;
					margin-top: 12px;
					font-size: 30px;
				}
				.icon {
					height: 40px;
					font-size: 60px;
				}
			}
			.title {
				grid-row: 1;
				font-size: 32px;
				align-self: center;
			}
			.date {
				grid-row: -2;
				grid-column: 3;
			}
		}
	}
</style>
