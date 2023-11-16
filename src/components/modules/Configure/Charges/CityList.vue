<template>
	<div v-if="cities.length" class="flex flex-wrap gap-2 min-w-[150px] max-w-[170px]">
		<template v-for="n,i in (cities as Record<string, any>[])">
			<p v-if="i < 3" :key="i" class="text-[#737876] text-xs bg-[#FAFAFA] p-1 rounded">
				{{ n.city_name }},
			</p>
			<!-- <p v-if="i >= 3 && show" :key="i" class="text-[#737876] text-xs bg-[#FAFAFA] p-1 rounded">
				{{ n.city_name }}
			</p> -->
		</template>
		<button v-if="cities.length > 3" class="text-xs font-medium text-green09" @click.stop="show = !show">
			{{ show ? 'show less' : 'show more' }}
		</button>
	</div>
	<div v-if="show" class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-style">
		<div class="w-[90%] max-w-[400px] bg-white rounded-lg p-4 pt-10 md:px-6 relative min-h-[150px]">
			<Icon name="close" class="w-5 absolute top-2 right-2 cursor-pointer" @click="show = false" />
			<span v-for="n,i in (cities as Record<string, any>[])" :key="i" class="text-sm font-medium">
				{{ n.city_name }}{{ i === cities.length-1 ? '' : ', ' }}
			</span>
		</div>
	</div>
</template>

<script setup lang="ts">
defineProps({
	cities: {
        type: Array,
        default: () => []
    }
})
const show = ref(false)
</script>

<style scoped>
.bg-style{
	background-color: rgba(0, 0, 0, 0.4);
	backdrop-filter: blur(1.5px);
	z-index: 101;
}
</style>
