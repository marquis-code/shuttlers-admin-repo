<template>
	<Doughnut v-if="!isEmptyObject(data) || !loading" :data="data" :options="chartOptions" />
	<Skeleton v-else height="300px" />
</template>

<script setup lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'
import { isEmptyObject } from '@/composables/utils/basics'

ChartJS.register(ArcElement, Tooltip, Legend)

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
