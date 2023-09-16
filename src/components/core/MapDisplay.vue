<template>
	<div ref="map" class="map-container " :style="{ height: height }" />
</template>

<script setup>
import { initMap, calculateCenterAndZoom } from '@/composables/core/map'

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
    }
})

onMounted(() => {
    initMap(map)
    calculateCenterAndZoom(props.startPoint, props.endPoint, map.value.offsetWidth, 200)
})

</script>

<style scoped>
.map-container {
    width: 100%;
}
</style>
