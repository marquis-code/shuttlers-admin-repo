<template>
	<div v-if="cities.length" class="flex flex-wrap gap-2 min-w-[150px]">
		<template v-for="n,i in cities">
			<p v-if="i < 3" :key="i" class="text-[#737876] text-xs bg-[#FAFAFA] p-1 rounded">
				{{ n.city_name }}
			</p>
			<p v-if="i >= 3 && show" :key="i" class="text-[#737876] text-xs bg-[#FAFAFA] p-1 rounded">
				{{ n.city_name }}
			</p>
		</template>
		<button v-if="cities.length > 3" class="text-xs font-medium text-green09" @click.stop="show = !show">
			{{ show ? 'show less' : 'show more' }}
		</button>
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
