<template>
  <table class="va-table va-table--striped va-table--clickable">
    <thead>
      <tr>
        <th v-for="column in columns" :key="column.key" @click="sortBy(column.key)" style="cursor: pointer">{{column.key}}</th>
      </tr>
    </thead>
    <tbody>
    <tr v-for="cities in state.selectedCities" :key="cities.id">
      <td>{{cities.id}}</td>
      <td>
        <va-chip>
          {{cities.name}}
        </va-chip>
      </td>
      <td>
        <va-chip :color="'danger'">
          {{cities.min}}
        </va-chip>
      </td>
      <td>
        <va-chip :color="'success'">
          {{cities.max}}
        </va-chip>
      </td>
      <td>
        <va-button :color="'danger'" @click="deleteCity(cities.name)">DELETE</va-button>
      </td>

    </tr>
    </tbody>

  </table>
</template>

<script setup lang="ts">
import {weatherStore} from '../store/weatherStore';
import {reactive, watch} from 'vue';

const store = weatherStore();

const state = reactive({
  selectedCities:store.selectedCities,
})

const columns = [
  {
    key:'Id'
  },
  {
    key:'Name'
  },
  {
    key:'Min temperature'
  },
  {
    key:'Max temperature'
  },
  {
    key:'Delete'
  }
]

function deleteCity(name:string){
  store.selectedCities = store.selectedCities.filter((value)=>{
    return value.name!==name;
  })
  state.selectedCities = store.selectedCities;
  store.updateDeletedCity(name);
}

function sortBy(key:string){
  console.log(1)
  switch (key) {
    case 'Name': state.selectedCities.sort((a, b)=>{
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    }); break;
    case 'Id':state.selectedCities.sort((a, b)=>{
      return a.id - b.id
    }); break;
    case 'Min temperature': state.selectedCities.sort(function(a, b){
      return a.min - b.min;
    }); break;
    case 'Max temperature':state.selectedCities.sort((a, b)=>{
      return a.max - b.max;
    }); break;
    default:break;
  }
}
</script>

<style scoped>

</style>