<template>
	<Skeleton v-if="loading || propsLoading" :height="height" width="100%" />
	<div v-show="!loading && !propsLoading" ref="mapRef" class="map-container z-0" :style="{ height: height }" v-bind="$attrs" />
	{{ loading }} {{ propsLoading }}
</template>

<script setup>
import { initMap, calculateCenterAndZoom, loading, getPathFromPolyline, loadPolyline } from '@/composables/core/map'

const mapRef = ref(null)

const props = defineProps({
    startPoint: {
        type: Object,
        default: null,
        required: false
    },
    endPoint: {
        type: Object,
        default: null,
        required: false
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
    propsLoading: {
        type: Boolean,
        default: false
    },
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
    } else if (props.startPoint && props.endPoint) {
            calculateCenterAndZoom({ lat: props.startPoint.y, lng: props.startPoint.x }, { lat: props.endPoint.y, lng: props.endPoint.x })
        }
})

</script>

<style scoped>
.map-container {
    width: 100%;
}
</style>
