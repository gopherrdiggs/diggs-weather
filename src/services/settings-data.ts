import { Storage } from '../services/storage';
import { Location } from '../interfaces/location';

const TEMPERATURE_UNIT_KEY = "weatherTemperatureUnit";
const LOCATION_KEY = "weatherUserLocation";

export class SettingsController {

  private defaultLocation: Location = {
    lat: null,
    lng: null,
    name: "Adelaide",
    useCoords: true
  };

  // TEMPERATURE UNIT
  async getTemperatureUnit(): Promise<string> {
    return (await Storage.get(TEMPERATURE_UNIT_KEY)) || "celsius";
  }

  async setTemperatureUnit(unit: string): Promise<void> {
    await Storage.set(TEMPERATURE_UNIT_KEY, unit);
  }

  // LOCATION
  async getLocation(): Promise<Location> {
    return (await Storage.get(LOCATION_KEY)) || this.defaultLocation;
  }

  async setLocationName(name: string): Promise<void> {
    let location = (await this.getLocation()) || this.defaultLocation;
    location.name = name;

    return Storage.set(LOCATION_KEY, location);
  }

  // COORDS
  async setCoords(lat: number, lng: number): Promise<void> {
    let location = (await this.getLocation()) || this.defaultLocation;
    location.lat = lat;
    location.lng = lng;

    return Storage.set(LOCATION_KEY, location);
  }

  async setUseCoords(flag: boolean): Promise<void> {
    let location = (await this.getLocation()) || this.defaultLocation;
    location.useCoords = flag;

    return Storage.set(LOCATION_KEY, location);
  }
}

export const SettingsData = new SettingsController();