<template>
	<GMapMap :center="center" :zoom="7" map-type-id="terrain" style="width: 500px; height: 300px">
		<GMapCluster>
			<GMapMarker
				v-for="(m, index) in markers"
				:key="index"
				:position="m.position"
				:clickable="true"
				:draggable="true"
				@click="center = m.position"
			/>
		</GMapCluster>
	</GMapMap>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {
      center: { lat: 51.093048, lng: 6.84212 },
      markers: [
        {
          position: {
            lat: 51.093048,
            lng: 6.84212
          }
        } // A long list of clusters
      ]
    }
  }
}
</script>
