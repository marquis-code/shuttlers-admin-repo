<template>
	<LineChart :chart-data="data" :options="options" />
</template>

  <script>
  import { LineChart } from 'vue-chart-3'
  import { Chart, registerables } from 'chart.js'

  Chart.register(...registerables)

  export default {
	name: 'App',
	components: { LineChart },
	setup() {
	  const data = {
		labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
		datasets: [
		  {
			label: '# of Votes',
			data: [12, 19, 3, 5, 2, 3]
		  }
		]
	  }

	  const options = {
		scales: {
		  x: {},
		  y: {}
		}
	  }

	  return { data, options }
	}
  }
  </script>

  <style>
  #app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
  }
  </style>
