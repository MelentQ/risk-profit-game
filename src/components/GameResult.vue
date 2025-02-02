<script setup>
import Chart from 'primevue/chart';
import {computed} from "vue";
import state from "@/state.js";

const chartData = computed(() => {
  return {
    datasets: [
      {
        label: 'Исход',
        showLine: true,
        data: state.result,
        borderWidth: 1,
        tension: 0.1,
      },
    ]
  };
});

const chartOptions = computed(() => {
  return {
    animation: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {display: false},
        min: 1,
        title: {
          text: 'Игра',
          align: 'end',
          display: true,
        }
      },
      y: {
        grid: {display: false},
        min: 0,
        title: {
          display: true,
          align: 'end',
          text: 'Баланс'
        }
      },
    }
  };
});
</script>

<template>
  <div v-if="state.result.length">
    <Chart style="position: static;" type="scatter" :data="chartData" :options="chartOptions"/>
  </div>
</template>

<style scoped>

</style>
