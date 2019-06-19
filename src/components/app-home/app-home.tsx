import { Component, h, State } from '@stencil/core';
import { SettingsData } from '../../services/settings-data';
import { WeatherData } from '../../services/weather-data';
import { WeatherResponse, ForecastResponse } from '../../interfaces/weather';
import { Plugins } from '@capacitor/core';

const { Geolocation } = Plugins;

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css'
})
export class AppHome {

  @State() currentWeatherIcon: string = "thermometer";
  @State() currentWeather: WeatherResponse = {
    coord: null,
    dt: null,
    main: {
      humidity: null,
      pressure: null,
      temp: null,
      temp_max: null,
      temp_min: null
    },
    name: "Loading...",
    weather: [
      {
        id: null,
        main: null,
        description: null,
        icon: null
      }
    ],
    wind: null
  };
  @State() forecastWeather: ForecastResponse = {
    cnt: 12,
    list: []
  };

  async componentDidLoad() {
    let coordinates = await Geolocation.getCurrentPosition();
    await SettingsData.setCoords(coordinates.coords.latitude, coordinates.coords.longitude);

    try {
      this.currentWeather = await WeatherData.getCurrentWeather();
      this.forecastWeather = await WeatherData.getForecastWeather();
    }
    catch (err) {
      console.log(err);
    }

    const router = document.querySelector('ion-router');
    router.addEventListener('ionRouteDidChange', () => {
      this.handleRefresh();
    });

    this.currentWeatherIcon = this.getWeatherIcon(this.currentWeather.weather[0].description);
  }

  getWeatherIcon(description: string) {

    if (description) {
      if (description.includes("lightning") || description.includes("thunder")) {
        return "thunderstorm";
      } else if (description.includes("wind")) {
        return "flag";
      } else if (description.includes("rain") || description.includes("shower")) {
        return "rainy";
      } else if (description.includes("snow") || description.includes("frost")) {
        return "snow";
      } else if (description.includes("cloud")) {
        return "cloudy";
      } else if (description.includes("sun") || description.includes("clear ")) {
        return "sunny";
      } else {
        return "thermometer";
      }
    }
  }

  async handleRefresh(event?) {
    // Trigger a new request to the Weather API to refresh the data
    try {
      this.currentWeather = await WeatherData.refreshCurrentWeather();
      this.forecastWeather = await WeatherData.refreshForecastWeather();
    }
    catch (err) {
      console.log(err);
    }

    this.currentWeatherIcon = this.getWeatherIcon(this.currentWeather.weather[0].description);

    if (event) {
      event.target.complete();
    }
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Diggs Weather</ion-title>
          <ion-buttons slot="end">
            <ion-button href="/settings" routerDirection="forward">
              <ion-icon slot="icon-only" name="settings" />
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>,

      <ion-content class="ion-padding">
        <ion-refresher slot='fixed' onIonRefresh={(e) => this.handleRefresh(e)} />
        <div class="weather-display">
          <ion-card>
            <ion-card-header>
              <ion-card-subtitle>Current</ion-card-subtitle>
              <ion-card-title class='text-subdued'>{this.currentWeather.name}</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <ion-grid>
                <ion-row>
                  <ion-col size='7'>
                    <div class="temperature-info">
                      <div class="temperature text-prominent">{this.currentWeather.main.temp}&#176;</div>
                      <p>{this.currentWeather.weather[0].description}</p>
                    </div>
                  </ion-col>
                  <ion-col size='5'>
                    <ion-icon name={this.currentWeatherIcon} />
                  </ion-col>
                </ion-row>
              </ion-grid>
              <ion-grid>
                <ion-row>
                  <ion-col size="6">Temperature</ion-col>
                  <ion-col size="6">{this.currentWeather.main.temp}&#176;</ion-col>
                </ion-row>
                <ion-row>
                  <ion-col size="6">Humidity</ion-col>
                  <ion-col size="6">{this.currentWeather.main.humidity}%</ion-col>
                </ion-row>
                <ion-row>
                  <ion-col size="6">Pressure</ion-col>
                  <ion-col size="6">{this.currentWeather.main.pressure} hpa</ion-col>
                </ion-row>
              </ion-grid>
            </ion-card-content>
          </ion-card>

          <ion-card>
            <ion-card-header>
              <ion-card-subtitle>Forecast</ion-card-subtitle>
              <ion-card-title class='text-subdued'>Next 12 Hours</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <div class='hourly-forecast-wrapper'>
                {this.forecastWeather.list.map(forecastItem =>
                  <hourly-forecast-item
                    time={forecastItem.dt}
                    iconName={this.getWeatherIcon(forecastItem.weather.description)}
                    temperature={forecastItem.main.temp.toString()} />  
                )}
              </div>
            </ion-card-content>
          </ion-card>

        </div>
      </ion-content>
    ];
  }
}
