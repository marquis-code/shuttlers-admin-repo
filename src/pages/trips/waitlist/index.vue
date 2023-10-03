<template>
	<main class="">
		<Table :loading="loadingWaitlist" :headers="tableFields" :table-data="waitlistList" :option="onRowClicked">
			<template #header>
				<TableFilter :filter-type="{showSearchBar:true, showDownloadButton: true, showStatus: true, showDatePicker: true}" />
			</template>
			<template #item="{ item }">
				<span v-if="item.date">
					{{ useDateFormat(item.data.date, "MMMM d, YYYY, HH:MM A").value }}
				</span>
			</template>
		</Table>
	</main>
</template>
<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { useGetwaitlistList } from '@/composables/modules/waitlist/fetch'
import { useWaitlistIdDetails } from '@/composables/modules/waitlist/id'

const { getWaitlist, loadingWaitlist, waitlistList } = useGetwaitlistList()
getWaitlist()

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

const onRowClicked = (data) => {
	const { selectedWaitlist } = useWaitlistIdDetails()
	useRouter().push(`/waitlist/${data.id}/waitlist-info`)
	selectedWaitlist.value = data
}

const tableFields = ref([
    {
        text: 'DATE',
        value: 'date'
    },
    {
        text: 'NUMBER OF ROUTES',
        value: 'waitlistCount'
    },
    {
        text: 'NUMBER OF ROUTES',
        value: 'routeCount'
    }
])

</script>

<style scoped></style>
