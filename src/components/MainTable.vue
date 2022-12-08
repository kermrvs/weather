<template>
  <table class="va-table va-table--striped va-table--clickable">
    <thead>
     <tr>
       <th v-for="column in columns" :key="column.key" @click="sortBy(column.key)" style="cursor: pointer">
         {{column.key}}
       </th>
     </tr>
    </thead>
    <tbody>
    <tr v-for="city in state.cities" :key="city.id">
      <td>{{city.id}}</td>
      <td>
        <va-chip>
          {{city.name}}
        </va-chip>
      </td>
      <td>
        <va-chip>{{city.longitude}}</va-chip>
      </td>
      <td>
        <va-chip>{{city.latitude}}</va-chip>
      </td>
      <td>
        <va-button @click="selectCity(city.id,city.name,city.latitude,city.longitude)">Select city</va-button>
      </td>
      <td>
        <va-checkbox :readonly="true" v-model="city.isSelected"></va-checkbox>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">

import {weatherStore} from '../store/weatherStore';
import {reactive} from 'vue';
import {WeatherService} from '../services/WeatherService';
import {useToast} from 'vuestic-ui';
import dayjs from 'dayjs';

const store = weatherStore();

const props = defineProps(['date'])

const {init} = useToast();

const state = reactive({
  cities:store.cities,
  selectedItemsEmitted:[],
  currentSelectedItems:[]
})

const columns = [
  {key:'Id'},
  {key:'Name'},
  {key:'Latitude'},
  {key:'Longitude'},
  {key:'Select'},
  {key:'Selected'}
]

const weatherService = new WeatherService();

async function selectCity(id:number,name:string,latitude:number,longitude:number){
  const now = dayjs(props.date);
  const currentDay = now.date()>9 ? `${now.year()}-${now.month()+1}-${now.date()}` : `${now.year()}-${now.month()+1}-0${now.date()}`;
  try{
    if(!store.selectedCities.find((value)=>{
      if(value.name === name){
        init({
          color:'green',
          message:'This city have been added'
        })
        return true;
      }else{
        return false;
      }
    })){
      const weatherCity = await weatherService.findTemperature(name,latitude,longitude,currentDay);

      weatherStore().selectCity(weatherCity.name);
      weatherStore().updateSelectedCities({id,...weatherCity})
    }
  }catch (e) {
    init({
      color:'red',
      message:'Something problem!!!'
    })
  }
}

function sortBy(key:string){
  switch (key) {
    case 'Name': state.cities.sort((a, b)=>{
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    }); break;
    case 'Id':state.cities.sort((a, b)=>{
      return a.id - b.id
    }); break;
    case 'Latitude': state.cities.sort(function(a, b){
      return a.latitude - b.latitude;
    }); break;
    case 'Longitude':state.cities.sort((a, b)=>{
      return a.longitude - b.longitude;
    }); break;
    default:break;
  }
}

</script>

<style scoped>

</style>