<template>
	<div v-show="!loading" ref="map" class="map-container z-0" :style="{ height: height }" />
	<Skeleton v-if="loading" :height="height" />
</template>

<script setup>
import { initMap, calculateCenterAndZoom, loading, getPathFromPolyline, loadPolyline } from '@/composables/core/map'

const map = ref(null)

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
    }
})

onMounted(async () => {
    initMap(map)
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
