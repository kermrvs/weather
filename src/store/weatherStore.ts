import {defineStore} from 'pinia';

type ITemperatureTable = {
  id : number,
  name:string,
  min:number,
  max:number
}

export const weatherStore = defineStore('weather',{
  state: ()=>({
    cities:[
      {
        id:1,
        name:'Berlin',
        latitude:52.52,
        longitude:13.41,
        isSelected:false
      },
      {
        id:2,
        name:'Paris',
        latitude:48.85,
        longitude:2.35,
        isSelected:false
      },
      {
        id:3,
        name:'London',
        latitude:51.51,
        longitude:-0.13,
        isSelected:false
      },
      {
        id:4,
        name:'Madrid',
        latitude:40.42,
        longitude:-3.70,
        isSelected:false
      },
      {
        id:5,
        name:'Munich',
        latitude:48.14,
        longitude:11.58,
        isSelected:false
      },
      {
        id:6,
        name:'Krakow',
        latitude:50.06,
        longitude:19.94,
        isSelected:false
      },
      {
        id:7,
        name:'Warsaw',
        latitude:52.23,
        longitude:21.01,
        isSelected:false
      }
    ],
    selectedCities:[] as ITemperatureTable[]

  }),
  actions:{
    selectCity(name:string){
      this.cities.forEach(value => {
        if(value.name === name){
          value.isSelected = true;
        }
      })
    },

    updateDeletedCity(name:string){
      this.cities.forEach(value => {
        if(value.name === name){
          value.isSelected = false;
        }
      })
    },

    updateSelectedCities(city:ITemperatureTable){
      this.selectedCities.push(city);
    }
  }
})