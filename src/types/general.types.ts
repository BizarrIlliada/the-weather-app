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
  main: {
    temp: number,
    feels_like: number,
    pressure: number,
    humidity: number,
  },
  wind: {
    speed: number,
  }
}