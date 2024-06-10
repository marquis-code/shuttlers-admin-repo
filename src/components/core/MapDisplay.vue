<template>
	<Skeleton v-if="loading || propsLoading" :height="height" width="100%" />
	<div v-show="!loading && !propsLoading" ref="mapRef" class="map-container z-0 max-h-[100%]" :style="{ height: height }" v-bind="$attrs" />
</template>

<script setup>
import { initMap, calculateCenterAndZoom, loading, getPathFromPolyline, loadPolyline, addPointOnMap } from '@/composables/core/map'

const mapRef = ref(null)

const props = defineProps({
    startPoint: {
        type: [Object, null],
        default: null,
        required: false
    },
    endPoint: {
        type: [Object, null],
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
        type: [Object, String],
        default: null
    },
    propsLoading: {
        type: Boolean,
        default: false
    },
    externalMarkers: {
        type: Array,
        default: () => []
    },
    mapId: {
        type: String,
        default: ''
    }
})

onMounted(async () => {
    initMap(mapRef, props.mapId)

    if (props.encodedPolyline && typeof props.encodedPolyline === 'string') {
        const poly = await getPathFromPolyline(props.encodedPolyline)
        loadPolyline(poly)
    }
    if (props.startPoint || props.endPoint) {
            if (props.startPoint) {
                addPointOnMap({ lat: props.startPoint.y, lng: props.startPoint.x })
            } else {
                addPointOnMap({ lat: props.endPoint.y, lng: props.endPoint.x })
            }
        }
})

watchEffect(async () => {
        const end_poly = await props.encodedPolyline
    if (end_poly && typeof end_poly === 'string') {
        const poly = await getPathFromPolyline(end_poly)
        loadPolyline(poly)
    }
  if (props.startPoint?.x || props.endPoint?.x) {
        if (props.startPoint) {
            addPointOnMap({ lat: props.startPoint.y, lng: props.startPoint.x })
        } else {
            addPointOnMap({ lat: props.endPoint.y, lng: props.endPoint.x })
        }
    }
})

</script>

<style scoped>
.map-container {
    width: 100%;
}
</style>
