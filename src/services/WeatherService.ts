import {getWeather} from '../api/getWeather';
import {weatherStore} from '../store/weatherStore';

type ITemperature = {
  name:string,
  min:number,
  max:number
}

export class WeatherService{
  async findTemperature(name:string,latitude:number,longitude:number,currentDay:string):Promise<ITemperature>{
    const weather = await getWeather(latitude,longitude,currentDay);
    const min = Math.min(...weather.hourly.temperature_2m);
    const max = Math.max(...weather.hourly.temperature_2m);

    return{
      name,
      min,
      max
    }
  }
}