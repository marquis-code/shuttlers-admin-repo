<template>
	<div ref="mapRef" class="map-container z-0" :style="{ height: height }" />
	<Skeleton v-if="loading" :height="height" />
</template>

<script setup>
import { initMap, calculateCenterAndZoom, loading, getPathFromPolyline, loadPolyline, loadExternalDataMarkers } from '@/composables/core/map'

const mapRef = ref(null)

const props = defineProps({
    startPoint: {
        type: Object,
        default: null,
        required: true
    },
    endPoint: {
        type: Object,
        default: null,
        required: true
    },
    stops: {
        type: Array,
        default: () => []
    },
    pins: {
        type: Array,
        default: () => []
    },
    height: {
        default: '500px',
        type: String
    },
    encodedPolyline: {
        type: String,
        default: null
    },
    // loading: {
    //     type: Boolean,
    //     default: false
    // },
    externalMarkers: {
        type: Array,
        default: () => []
    }
})

onMounted(async () => {
    initMap(mapRef)
    // calculateCenterAndZoom(props.startPoint, props.endPoint)
    if (props.encodedPolyline) {
        const poly = await getPathFromPolyline(props.encodedPolyline)
        loadPolyline(poly)
    } else {
            calculateCenterAndZoom({ lat: props.startPoint.y, lng: props.startPoint.x }, { lat: props.endPoint.y, lng: props.endPoint.x })
    }
})

</script>

<style scoped>
.map-container {
    width: 100%;
}
</style>
