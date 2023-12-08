<template>
	<main class="">
		<Table :loading="loading" :page="page" :has-index="true" :headers="tableFields" :table-data="formattedShuttleRequest" :option="onRowClicked">
			<template #header>
				<div class="flex items-center gap-x-3  bg-white rounded-tr-md rounded-tl-md px-4 py-3">
					<div class="flex items-center w-full gap-x-4">
						<p class="font-medium text-sm text-gray-600">
							Service option
						</p>
						<div>
							<select class="input-field w-full px-6">
								<option value="all">
									All services
								</option>
								<option value="exclusive">
									Exclusive
								</option>
								<option value="shared">
									Shared
								</option>
							</select>
						</div>
					</div>
				</div>
				<TableFilter :filter-type="{showDatePicker: true}" @filter="onFilterUpdate" />
			</template>
			<template #item="{ item }">
				<span v-if="item.status" class="px-3 py-2" :class="[item.data.status == 'active' ? 'text-white bg-shuttlersGreen text-xs rounded-xl' : ' bg-rose-600 text-white text-xs rounded-xl']">
					{{ item.data.status == 'active' ? 'Active' : 'Inactive' }}
				</span>
				<span v-if="item.created_at">
					{{ useDateFormat(item.data.created_at, "MMMM d, YYYY").value }}
				</span>
			</template>

			<template #footer>
				<TablePaginator :current-page="page" :total-pages="total" :loading="loading" @move-to="moveTo($event)" @next="next" @prev="prev" />
			</template>
		</Table>
	</main>
</template>

<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { useGetCorporateShuttleRequests } from '@/composables/modules/corporates/shuttleRequest'

const { getCorporateShuttleRequest, loading, shuttleRequests, page, total, next, prev, moveTo, onFilterUpdate, filterData, selectedRequest } = useGetCorporateShuttleRequests()
getCorporateShuttleRequest()

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

const onRowClicked = (data) => {
	useRouter().push(`/companies/shuttle-requests/${data.id}/info`)
	selectedRequest.value = data
}

const formattedShuttleRequest = computed(() =>
    shuttleRequests.value.map((i) => {
         return {
             ...i,
             company_name: i.corporate?.corporate_name,
             staffs_count: i.users?.length
         }
    })
)

const tableFields = ref([
    {
        text: 'ID',
        value: 'name'
    },
    {
        text: 'COMPANY',
        value: 'company_name'
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
        value: 'staffs_count'
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
