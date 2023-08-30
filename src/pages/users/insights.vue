<template>
	<div class="space-y-10">
		<div>
			<ModulesUsersInsightsChart />
		</div>
		<div class="flex justify-between">
			<div class="w-6/12">
				<ModulesUsersRecentUsers />
			</div>
			<div class=""></div>
		</div>
	</div>
</template>

<script setup lang="ts">
definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})
</script>

<style scoped>

</style>
