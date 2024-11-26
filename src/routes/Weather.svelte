<script lang="ts">
	import type { WeatherDto } from '../domain';
	import { getIconUrl, loadWeather, isNightTime } from '../utils';

	let loading = $state(true);
	let weatherData = $state<WeatherDto | undefined>(undefined);
	let weatherIcon = $state('');
	let feelsLike = $state('');
	let temp = $state('');
	let minTemp = $state('');
	let maxTemp = $state('');
	let precipitation = $state('');
	let precipitationType = $state<'snow' | 'rain' | 'none'>('none');
	let windSpeed = $state('');
	let windOrientation = $state('');

	$effect(() => {
		syncWeatherData();
		const interval = setInterval(
			() => {
				if (!isNightTime()) {
					syncWeatherData();
				}
			},
			1000 * 60 * 30 // 30 mins
		);

		return () => {
			clearInterval(interval);
		};
	});

	async function syncWeatherData(): Promise<void> {
		loading = true;

		const response = await loadWeather();
		weatherData = response;

		weatherIcon = getIconUrl(response);

		if (weatherData) {
			const roundedFeelsLike = Math.round(weatherData.main.feels_like * 10) / 10;
			feelsLike = `${roundedFeelsLike}°C`;
			const roundedTemp = Math.round(weatherData.main.temp * 10) / 10;
			temp = `${roundedTemp}°C`;

			const roundedMinTemp = Math.round(weatherData.main.temp_min * 10) / 10;
			minTemp = `${roundedMinTemp}°C`;
			const roundedMaxTemp = Math.round(weatherData.main.temp_max * 10) / 10;
			maxTemp = `${roundedMaxTemp}°C`;

			if (weatherData.rain) {
				const precipitationAmount = weatherData.rain['1h'];
				precipitation = `${precipitationAmount} mm/h`;
				precipitationType = 'rain';
			} else if (weatherData.snow) {
				const precipitationAmount = weatherData.rain['1h'];
				precipitation = `${precipitationAmount} mm/h`;
				precipitationType = 'snow';
			} else {
				precipitation = ``;
				precipitationType = 'none';
			}

			const roundedWindSpeed = Math.round(weatherData.wind.speed);
			windSpeed = `${roundedWindSpeed} m/s`;

			const roundedWindDeg = Math.round(weatherData.wind.deg);
			windOrientation = `${roundedWindDeg}deg`;
		} else {
			feelsLike = '';
			temp = ``;
			minTemp = '';
			maxTemp = '';
			precipitation = '';
			precipitationType = 'none';
			windSpeed = '';
			windOrientation = '';
		}

		loading = false;
	}
</script>

{#if loading}
	<div class="loader">☁️ 🌞 🌨️</div>
{/if}
{#if weatherData}
	<div class="wrapper">
		<div class="icon-wrapper">
			{#if weatherIcon}
				<img src={weatherIcon} alt="Weather icon" />
			{:else}
				<span> 🤷 </span>
			{/if}
		</div>
		<div class="temp-wrapper">
			<strong>
				{feelsLike}
			</strong>
			<small>
				({temp})
			</small>
		</div>
		<div class="minmax-wrapper">
			<div class="max-temp">
				<small class="icon material-symbols-outlined"> thermostat_arrow_up </small>
				<small>
					{maxTemp}
				</small>
			</div>
			<div class="max-temp">
				<small class="icon material-symbols-outlined"> thermostat_arrow_down </small>
				<small>
					{minTemp}
				</small>
			</div>
		</div>
		<div class="extra">
			<div class="rain-chance-wrapper">
				{#if precipitationType === 'rain'}
					<span class="icon"> 💧 </span>
					<span>
						{precipitation}
					</span>
				{:else if precipitationType === 'snow'}
					<span class="icon"> ❄️ </span>
					<span>
						{precipitation}
					</span>
				{:else}
					<span> No rain/snow</span>
				{/if}
			</div>
			<div class="wind-wrapper">
				<span class="icon"> 🌬️: </span>
				<span class="icon wind-orientation" style="transform: rotate({windOrientation});"> ☝️</span>
				<span class="wind-speed">{windSpeed}</span>
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	@keyframes loader-anim {
		from {
			transform: scale(0.85);
		}
		to {
			transform: scale(1.2);
		}
	}

	.loader {
		animation: loader-anim 2s linear infinite;
		font-size: 12px;
		font-family: 'NotoSansEmoji';
		z-index: 2;
		margin-left: 16px;
	}

	.wrapper {
		display: flex;
		align-items: center;
		background: rgba(200, 200, 200, 0.4);
		padding: 4px 8px;
		border-radius: 8px;
		font-size: 20px;

		.icon-wrapper {
			img {
				height: 48px;
			}
			span {
				font-family: 'NotoSansEmoji';
			}
		}

		.temp-wrapper {
			display: flex;
			align-items: center;
			flex-direction: column;
		}

		.minmax-wrapper {
			margin-left: 8px;
			font-size: 20px;
			& > div {
				display: flex;
				align-items: center;
				margin: 2px;
			}
			.icon {
				margin-right: 4px;
			}
		}

		.extra {
			margin-left: 8px;
		}
		.rain-chance-wrapper {
			color: white;
			.icon {
				font-family: 'NotoSansEmoji';
			}
		}
		.wind-wrapper {
			.icon {
				font-family: 'NotoSansEmoji';
			}
			.wind-orientation {
				display: inline-block;
			}
		}
	}
</style>
