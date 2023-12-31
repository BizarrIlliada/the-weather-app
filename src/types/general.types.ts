export interface ICity {
  country: string,
  lat: number,
  lon: number,
  name: string,
  state?: string,
  local_names: { [key: string]: string },
}

export interface IWeather {
  id: number,
  name: string,
  coord: {
    lat: number,
    lon: number,
  },
  main: {
    temp: number,
    feels_like: number,
    pressure: number,
    humidity: number,
  },
  wind: {
    speed: number,
  },
  isFavorite?: boolean,
}

export interface IForecastItem {
  dt_txt: string,
  main: {
    temp: number,
  }
}

export interface IAlert {
  severity?: 'info' | 'error' | 'success' | 'warn',
  time?: number,
  title?: string,
  sticky?: boolean,
  message: string,
  translatable?: boolean,
}

export interface IUniqueAlert extends IAlert {
  id: symbol,
}
