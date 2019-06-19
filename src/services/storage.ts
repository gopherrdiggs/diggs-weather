class StorageController {

  storage = window.localStorage;

  async set(key: string, value: any) {
    try {
      if (!this.storage) {
        throw new Error('Local storage unavailable.');
      }
      this.storage.setItem(key, JSON.stringify(value));
    }
    catch (error) {
      throw new Error(`Unable to store value in local storage: ${value} due to error:` + error.message);
    }
  }

  async get(key: string) {
    try {
      if (!this.storage) {
        throw new Error('Local storage unavailable.');
      }
      const item = this.storage.getItem(key);
      return JSON.parse(item);
    }
    catch (error) {
      throw new Error(`Unable to get value from local storage: ${key} due to error:` + error.message);
    }
  }

  async remove(key: string) {
    try {
      if (!this.storage) {
        throw new Error('Local storage unavailable.');
      }
      this.storage.removeItem(key);
    }
    catch (error) {
      throw new Error(`Unable to remove value from local storage: ${key} due to error:` + error.message);
    }
  }
}

export const Storage = new StorageController();
