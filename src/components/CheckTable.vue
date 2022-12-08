<template>
  <table class="va-table va-table--striped va-table--clickable">
    <thead>
      <tr>
        <th v-for="column in columns" :key="column.key">{{column.key}}</th>
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

function sortBy(name:string) {
  
}

function deleteCity(name:string){
  store.selectedCities = store.selectedCities.filter((value)=>{
    return value.name!==name;
  })
  state.selectedCities = store.selectedCities;
  store.updateDeletedCity(name);
}
</script>

<style scoped>

</style>