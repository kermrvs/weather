<template>
  <div class="container">
    <h4>Select city</h4>
    <div>
      <va-date-picker v-model="value"></va-date-picker>
    </div>
    <div class="main-table">
      <main-table :date="value"></main-table>
    </div>
    <div class="main-table main-table-2">
      <check-table></check-table>
    </div>
  </div>
</template>

<script setup lang="ts">

import MainTable from './components/MainTable.vue';
import CheckTable from './components/CheckTable.vue';
import {ref} from 'vue';

const value = ref(new Date());

</script>

<style lang>

</style>
