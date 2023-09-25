<template>
	<main class="">
		<Table :loading="loading" :headers="tableFields" :table-data="selectedWaitlist">
			<template #header>
				<TableFilter :filter-type="{showSearchBar:true, showDownloadButton: true, showStatus: true, showDatePicker: true}" />
			</template>
		</Table>
	</main>
</template>

<script setup lang="ts">
import { useWaitlistIdDetails } from '@/composables/modules/waitlist/id'
const { selectedWaitlist, loading, getWaitlistById } = useWaitlistIdDetails()
const id = useRoute().params.id as string
getWaitlistById(id)

definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})

const tableFields = ref([
    {
        text: 'Route',
        value: 'routeCode'
    },
    {
        text: 'Time',
        value: 'itenery'
    },
    {
        text: 'Name',
        value: 'fname'
    },
    {
        text: 'Phone Number',
        value: 'phone'
    },
    {
        text: 'Email Address',
        value: 'email'
    },
    {
        text: 'Bus Stop',
        value: 'destination'
    }
])
</script>

<style scoped>

</style>
