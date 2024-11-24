<script lang="ts">
	import type { DepartureEntryListItem } from '../domain/internal.types';

	export let departures: DepartureEntryListItem[] = [];
</script>

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
				<span>
					{departure.time} <br />
					{departure.date}
				</span>
			</div>
		</li>
	{/each}
</ul>

<style lang="scss">
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
			grid-template-columns: 70px auto 100px;
			grid-template-rows: 100px 40px;
			column-gap: 24px;

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
