<template>
	<HeadersHeaderSlot title="Fleet" pre-title="Overview">
		<template #actions>
			<div class="space-x-2 flex items-center">
				<button class="border-2 border-gray-950 bg-white text-gray-800 py-2 rounded-lg px-4">
					Export QR Codes
				</button>
				<NuxtLink to="/fleet/add" class="btn-primary">
					Add Vehicle
				</NuxtLink>
			</div>
		</template>

		<template #tabs>
			<RouterTabs :tabs="pageTabs" />
		</template>
	</HeadersHeaderSlot>
</template>
<script setup lang="ts">

const pageTabs = ref([
	{
		name: 'Vehicles',
		path: '/fleet'
	},
	{
		name: 'Inspection Days',
		path: '/fleet/inspection-days'
	}
])
</script>
