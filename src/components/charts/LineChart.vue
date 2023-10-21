<template>
	<Line v-if="!isEmptyObject(data) || !loading" :data="data" :options="chartOptions" v-bind="{...$attrs}" />
	<Skeleton v-else height="300px" />
</template>

<script setup lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

import { Line } from 'vue-chartjs'
import { isEmptyObject } from '@/composables/utils/basics'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

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
