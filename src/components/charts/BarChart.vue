<template>
	<BarChart v-if="!isEmptyObject(data) || !loading"
		v-bind="{...$attrs}" id="my-chart-id" :data="data" :options="chartOptions" class="!h-72" />
	<Skeleton v-else height="300px" />
</template>

<script setup lang="ts">
import { Bar as BarChart } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { isEmptyObject } from '@/composables/utils/basics'
ChartJS.register(Title, Tooltip, BarElement, CategoryScale, LinearScale)

defineProps({
    data: {
        type: Object,
        required: true
    },
    loading: {
        type: Boolean,
        required: true
    }
    // options: {
    //     type: Object,
    //     required: true
    // },
})
const chartOptions = ref({
  maintainAspectRatio: false,
      responsive: true,
      elements: {
        point: {
          radius: 0
        }
      },
      legend: {
        display: false
      }
})
</script>

<style scoped>

</style>
