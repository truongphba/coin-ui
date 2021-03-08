<template>
  <q-page class="q-py-sm q-pl-sm">
    <div class="small">
      <bar :chart-data="datacollection"></bar>
      <button @click="fillData()">Randomize</button>
    </div>
  </q-page>
</template>

<script>
import { Bar } from 'vue-chartjs'

export default {
  name: 'Dashboard',
  extends: Bar,
  data () {
    return {
    }
  }
}
</script>
