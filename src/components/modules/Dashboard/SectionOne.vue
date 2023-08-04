<template>
	<section class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
		<div v-for="(item, index) in dashboardStats" :key="index" class="card">
			<h3 class="text-xs text-gray-400 font-medium leading-loose">
				{{ item.title }}
			</h3>
			<p class="text-lg font-bold text-black">
				{{ item.count }}
			</p>
		</div>
	</section>
</template>

<script setup lang="ts">
const dashboardStats = ref([
        {
            title: 'TOTAL RIDES',
            count: '102,354'
        },
        {
            title: 'TOTAL TRANSACTIONS',
            count: '1,441,860'
        },
        {
            title: 'TOTAL USERS',
            count: '77,472'
        },
        {
            title: 'TOTAL DRIVERS',
            count: '1,606'
        }
     ])
</script>

<style scoped>

</style>
