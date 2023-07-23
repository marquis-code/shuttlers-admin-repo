<template>
	<ul class="flex gap-4 mb-2">
		<li v-for="tab in tabs" :key="tab.path" class="nav-item">
			<nuxt-link :to="tab.path" class="nav-link" exact-active-class="active">
				{{ tab.name }}
			</nuxt-link>
		</li>
	</ul>
</template>

<script setup lang="ts">
defineProps({
	tabs: {
		type: Array as PropType<{ name: string; path: string }[]>,
		required: true
	}
})
</script>

<style scoped>
.nav-link{
@apply text-[15px] font-normal text-blue-600;
}
.nav-item .active{
@apply border-b-[3px] border-primary font-bold text-dark py-2;
}
</style>
