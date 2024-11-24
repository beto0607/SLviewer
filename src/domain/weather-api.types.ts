type WeatherCoordinates = {
    lon: number, lat: number
}

type WeatherItem = {
    id: number,
    main: string,
    description: string,
    icon: string
}

type WeatherMain = {
    temp: number,
    feels_like: number
    temp_min: number,
    temp_max: number
    pressure: number
    humidity: number
    sea_level: number,
    grnd_level: number
}

type WeatherWind = {
    speed: number
    deg: number
}

type WeatherPrecipitation = {
    "1h": number
}

type WeatherClouds = {
    all: number
}

type WeatherSys = {
    type: number
    id: number
    country: string
    sunrise: number
    sunset: number
}

export type WeatherDto = {
    coord: WeatherCoordinates
    weather: WeatherItem[]
    base: string
    main: WeatherMain
    visibility: number
    wind: WeatherWind
    rain?: WeatherPrecipitation
    snow?: WeatherPrecipitation
    clouds: WeatherClouds
    dt: number
    sys: WeatherSys
    timezone: number
    id: number
    name: string
    cod: number
}
