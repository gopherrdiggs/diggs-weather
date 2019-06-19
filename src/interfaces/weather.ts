interface WeatherCoords {
  lat: number;
  lon: number;
}

interface WeatherMain {
  humidity: number;
  pressure: number;
  temp: number;
  temp_max: number;
  temp_min: number;
}

interface WeatherDescription {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface WeatherWind {
  speed: number;
  deg: number;
}

export interface WeatherResponse {
  coord: WeatherCoords;
  dt: number;
  main: WeatherMain;
  name: string;
  weather: WeatherDescription[];
  wind: WeatherWind;
}

interface HourlyForecastMain {
  temp: number,
  temp_min: number,
  temp_max: number,
  pressure: number,
  humidity: number
}

interface HourlyForecastWeather {
  main: string,
  description: string,
  icon: string
}

export interface HourlyForecastItem {
  dt: string,
  main: HourlyForecastMain,
  weather: HourlyForecastWeather
}

export interface ForecastResponse {
  cnt: number,
  list: HourlyForecastItem[]
}