import api from '../index';
import dayjs from 'dayjs';
interface IWeather{
  current_weather:{
    temperature:number,
    time:string,
    weathercode:number,
    windspeed:number,
    winddirection:number
  },
  latitude:number,
  longitude:number,
  elevation:number,
  generationtime_ms:number,
  timezone:string,
  timezone_abbreviation:string,
  utc_offset_seconds:number,
  hourly_units:{
    temperature_2m:string
  },
  hourly:{
    time:Array<string>,
    temperature_2m:Array<number>
  }
}

export const getWeather = async function (latitude:number,longitude:number,currentDay:string):Promise<IWeather> {
  const { data } = await api.get(`/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&current_weather=true&start_date=${currentDay}&end_date=${currentDay}`)
  return data;
}