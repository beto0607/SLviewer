import type { WeatherDTO } from "../domain";
import { isTesting } from "./api.utils";

export async function loadWeather(): Promise<WeatherDTO> {
    const url = getURL()

    const response = await fetch(url)
        .then((response) => response.json())
    return response
}

function getURL(): string {
    if (isTesting) {
        return `/weather-response.json`;
    }
    const apiKey = import.meta.env.VITE_OPENWEATHER_KEY;
    const lat = 59.380490624937295;
    const lon = 17.906850231350553
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang-en`;
    return url
}

export function getIconUrl(weatherData: WeatherDTO): string {
    const icon = weatherData.weather.at(0)?.icon
    if (!icon) {
        return ''
    }
    return `https://openweathermap.org/img/wn/${icon}@2x.png`
}
