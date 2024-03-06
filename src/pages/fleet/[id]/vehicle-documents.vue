<template>
	<main class="">
		<ButtonGoBack class="mb-6" />
		<Table :loading="loading" :headers="tableFields" :table-data="fleetDocuments" :has-options="true" :option="(data)=>$router.push(`/admin/${data.id}/info`)">
			<template #header>
				<TableFilter :filter-type="{showStatus:true, showSearchBar:true}" />
			</template>
			<template #item="{ item }">
				<span v-if="item.fname" class="flex items-center gap-4">
					<div>
						<Avatar :name="item.data.fname" bg="#B1C2D9" />
					</div>

					<span>{{ item.data.fname }} {{ item.data.lname }}</span>
				</span>
				<span v-else-if="item.active" :class="[item.data.active == 1 ? 'text-green-500' : 'text-red-500']">
					{{ item.data.active == 1 ? 'Active' : 'Inactive' }}
				</span>
				<span v-else-if="item.created_at">
					{{ useDateFormat(item.data.created_at, "MMMM d, YYYY").value }}
				</span>
				<span v-else-if="item.updated_at">
					{{ useDateFormat(item.data.updated_at, "MMMM d, YYYY").value }}
				</span>
			</template>
		</Table>
	</main>
</template>

<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { useGetFleetDocuments } from '@/composables/modules/fleets/id'

const { getFleetsDocuments, loading, fleetDocuments, moveTo, total, page, next, prev } = useGetFleetDocuments()
getFleetsDocuments()

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})
const tableFields = ref([
    {
        text: 'TYPE',
        value: 'fname'
    },
    {
        text: 'CATEGORY',
        value: 'phone'
    },
    {
        text: 'DOCUMENT',
        value: 'email'
    },
    {
        text: 'EXPIRY DATE',
        value: 'active'
    },
    {
        text: 'STATUS',
        value: 'role'
    },
    {
        text: 'DATE CREATED',
        value: 'created_at'
    },
    {
        text: 'ACTIONS',
        value: 'updated_at'
    }
])

</script>

<style scoped></style>
