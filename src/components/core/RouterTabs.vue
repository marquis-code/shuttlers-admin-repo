<template>
	<ul class="flex mb-2 md:flex-wrap">
		<li v-for="tab in tabs" :key="tab.path" class="nav-item">
			<nuxt-link :to="tab.path" class="nav-link" exact-active-class="active" :class="tab.active ? 'active' : ''">
				{{ tab.name }}
			</nuxt-link>
		</li>
	</ul>
</template>

<script setup lang="ts">
defineProps({
	tabs: {
		type: Array as PropType<{ name: string; path: string; active?: boolean }[]>,
		required: true
	}
})
</script>

<style scoped>
.nav-link{
@apply text-sm font-medium text-grey5_5 leading-[20px] px-5 py-4 w-auto;
}
.nav-item .active{
@apply border-b-[3px] border-shuttlersGreen font-medium text-shuttlersGreen py-2;
}
</style>
