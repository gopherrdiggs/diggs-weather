import { WeatherResponse, ForecastResponse } from '../interfaces/weather';
import { SettingsData } from '../services/settings-data';
import { convertFromKelvin } from '../helpers/utils';

class WeatherDataController {

  public currentWeatherData: WeatherResponse;
  public forecastWeatherData: ForecastResponse;
  private apiKey: string = '';

  constructor() { }

  async refreshCurrentWeather() {
    let [location, unit] = await Promise.all([
      SettingsData.getLocation(),
      SettingsData.getTemperatureUnit()
    ]);

    let currentDataResponse;

    try {
      if (location.useCoords) {
        currentDataResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lng}&APPID=${this.apiKey}`
        );
      } 
      else {
        currentDataResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${location.name}&APPID=${this.apiKey}`
        );
      }
      if (!currentDataResponse.ok) {
        throw new Error(currentDataResponse.statusText);
      }
    } 
    catch (err) {
      throw new Error(err.message);
    }

    let currentWeatherData = await currentDataResponse.json();
    return this.processCurrentWeatherData(currentWeatherData, unit);

  }

  async refreshForecastWeather() {
    let [location, unit] = await Promise.all([
      SettingsData.getLocation(),
      SettingsData.getTemperatureUnit()
    ]);

    let forecastDataResponse;

    try {
      if (location.useCoords) {
        forecastDataResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lng}&APPID=${this.apiKey}&cnt=12`
        )
      } 
      else {
        forecastDataResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${location.name}&APPID=${this.apiKey}&cnt=12`
        )
      }
      if (!forecastDataResponse.ok) {
        throw new Error(forecastDataResponse.statusText);
      }
    } 
    catch (err) {
      throw new Error(err.message);
    }

    let forecastData = await forecastDataResponse.json();
    return this.processForecastWeatherData(forecastData, unit);

  }
  processCurrentWeatherData(data: WeatherResponse, unit: string) {
    data.main.temp = parseFloat(convertFromKelvin(data.main.temp, unit).toFixed(1));
    data.main.temp_min = parseFloat(convertFromKelvin(data.main.temp_min, unit).toFixed(1));
    data.main.temp_max = parseFloat(convertFromKelvin(data.main.temp_max, unit).toFixed(1));

    return (this.currentWeatherData = data);
  }

  processForecastWeatherData(data: ForecastResponse, unit: string) {
    for (let d of data.list) {
      let date = new Date(parseFloat(d.dt) * 1000);
      let hours = date.getHours();
      let minutes = '0' + date.getMinutes();
      d.dt = `${hours}:${minutes}`;
      d.main.temp = parseFloat(convertFromKelvin(d.main.temp, unit).toFixed(1));
    }
    return (this.forecastWeatherData = data);
  }

  async getCurrentWeather() {

    if (this.currentWeatherData) {
      return this.currentWeatherData;
    } 
    else {
      return await this.refreshCurrentWeather();
    }
  }

  async getForecastWeather() {
    
    if (this.forecastWeatherData) {
      return this.forecastWeatherData;
    } 
    else {
      return await this.refreshForecastWeather();
    }
  }
}

export const WeatherData = new WeatherDataController();