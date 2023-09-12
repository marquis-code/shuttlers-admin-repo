<template>
	<main class="">
		<Table :has-index="true" :loading="loading" :headers="tableFields" :table-data="shuttleRequestsList">
			<template #header>
				<TableFilter :filter-type="{showDownloadButton:true, showSearchBar:true}" @filter="onFilterUpdate" />
			</template>

			<template #item="{ item }">
				<span v-if="item.name" class="flex items-center gap-4">
					<span>{{ item?.data?.name ?? 'N/A' }}</span>
				</span>

				<span v-if="item.corporate" class="flex items-center gap-4">
					<span>{{ item?.data?.corporate?.corporate_name ?? 'N/A' }}</span>
				</span>

				<span v-if="item.created_at" class="flex items-center gap-4">
					<span>{{ useDateFormat(item.data.created_at, "MMMM d, YYYY").value ?? 'N/A' }}</span>
				</span>
				<span v-if="item.service_type" class="flex items-center gap-4">
					<span>{{ item?.data?.service_type.split("_").join(" ") ?? 'N/A' }}</span>
				</span>

				<span v-if="item.sharing_type" class="flex items-center gap-4">
					<span>{{ item?.data?.sharing_type ?? 'N/A' }}</span>
				</span>

				<span v-if="item.payment_type" class="flex items-center gap-4">
					<span>{{ item?.data?.payment_type ?? 'N/A' }}</span>
				</span>

				<span v-if="item.users" class="flex items-center gap-4">
					<span>{{ item?.data?.users?.length ?? 'N/A' }}</span>
				</span>

				<span v-if="item.start_date" class="flex items-center gap-4">
					<span v-if="item?.data?.start_date === null">N/A</span>
					<span v-else>{{ useDateFormat(item?.data?.start_date, "MMMM d, YYYY").value }}</span>
				</span>

				<span v-if="item.status" class="flex items-center gap-4">
					<span :style="{'background-color': item.data.active !== 'not_completed' ? '#e63757': '#00d97e'}" class="text-xs text-white px-2 py-1 rounded-lg">{{ item.data.status == 'not_completed' ? 'Inactive' : 'Active' }}</span>
				</span>
			</template>
		</Table>
	</main>
</template>

<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { useGetShuttleRequests } from '@/composables/modules/corporates/fetch'

const { loadShuttleRequest, loading, shuttleRequestsList } = useGetShuttleRequests()
loadShuttleRequest()

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})
const tableFields = ref([
    {
        text: 'ID',
        value: 'name'
    },
    {
        text: 'COMPANY',
        value: 'corporate'
    },
    {
        text: 'DATE CREATED',
        value: 'created_at'
    },
    {
        text: 'SERVICE TYPE',
        value: 'service_type'
    },
    {
        text: 'SHARING TYPE',
        value: 'sharing_type'
    },
    {
        text: 'PAYMENT',
        value: 'payment_type'
    },
    {
        text: 'NO OF STAFF',
        value: 'users'
    },
    {
        text: 'START DATE',
        value: 'start_date'
    },
    {
        text: 'STATUS',
        value: 'status'
    }

])

</script>

<style scoped></style>
