<template>
	<main class="">
		<ButtonGoBack class="mb-6" />
		<Table
			:loading="loading"
			:has-index="true"
			:headers="tableFields"
			:table-data="configuredCharges"
			:has-options="true"
			:page="page"
			:option="onRowClicked"
		>
			<template #header>
				<TableFilter
					:filter-type="{
						showStatus: false,
						showSearchBar: true,
						showDownloadButton: false,
						showDatePicker: false,
					}"
					@filter="onFilterUpdate"
				/>
			</template>
			<template #item="{ item }">
				<p v-if="item.charge_type" class="text-sm text-[#737876] whitespace-nowrap">
					<span class="text-[#101211] uppercase">
						{{ item?.data?.additionChargeType?.short_name + ' ' || '' }}
					</span>
					<span>
						({{ item?.data?.additionChargeType?.name || '' }})
					</span>
				</p>
				<p v-if="item.charge_value" class="text-sm text-[#737876] whitespace-nowrap">
					<template v-if="item.data.charge_type === 'flat'">
						₦{{ item?.data?.charge_value }}
					</template>
					<template v-else>
						{{ item?.data?.charge_value }}%
					</template>
				</p>
				<p v-if="item.is_compulsory" class="text-sm font-medium whitespace-nowrap" :class="item.data.is_compulsory ? 'text-[orange]' : 'text-[#0DAC5C]'">
					{{ item?.data?.is_compulsory ? 'Compulsory' : 'Optional' }}
				</p>
				<div v-if="item.country_currently_active_in" class="flex flex-col gap-1 py-2 text-[#101211] font-medium">
					<p class="text-sm">
						{{ item?.data?.country_currently_active_in?.name }}
					</p>
					<p v-if="item.data?.cities_currently_active_in.length" class="text-[#737876] text-xs">
						{{ item.data?.cities_currently_active_in?.length }} {{ item.data?.cities_currently_active_in?.length > 1 ? 'states' : 'state' }}
					</p>
				</div>
				<p v-if="item.description" class="text-sm text-[#737876]">
					{{ item?.data?.description }}
				</p>
				<p v-if="item.updated_by_data" class="text-sm text-[#2C8EED] font-medium">
					{{ item?.data?.updated_by_data?.fname || '' }} {{ item?.data.updated_by_data?.lname || '' }}
				</p>
				<div v-if="item.created_at" class="flex flex-col gap-1 text-xs text-[#313533] font-medium">
					<p>{{ moment(item?.data?.created_at).format('LT') }}</p>
					<p class="whitespace-nowrap">
						{{ moment(item?.data?.created_at).format('LL') }}
					</p>
				</div>
				<p v-if="item.is_active" class="text-xs py-1 px-2 rounded-full font-medium w-fit"
					:class="item.data?.is_active ? 'st_active' : 'st_inactive'"
				>
					{{ item?.data?.is_active ? 'Active' : 'Inactive' }}
				</p>
				<span v-if="item.id">
					<ButtonIconDropdown :index="item.index" :children="sortDropdownChildren(item.data)" :data="item.data" class-name="w-40" />
				</span>
			</template>

			<template #footer>
				<TablePaginator
					:current-page="page"
					:total-pages="total"
					:loading="loading"
					@move-to="moveTo($event)"
					@next="next"
					@prev="prev"
				/>
			</template>
		</Table>
	</main>
</template>

<script setup lang="ts">
import moment from 'moment'
import { useFetchConfiguredCharges, useDeleteChargeConfiguration, useCreateConfigureCharge, useActivateConfiguration } from '@/composables/modules/configure/charges/configure/index'
import { useFetchChargeTypes } from '@/composables/modules/configure/charges/types/index'
import { useChargeModal } from '@/composables/core/modals'
import { useCityAndCountry } from '@/composables/modules/configure/charges/utils'

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

const { loading, fetchConfiguredCharges, configuredCharges, total, page, next, prev, moveTo, onFilterUpdate } = useFetchConfiguredCharges()
const { fetchAllCityNames, fetchAllCountries } = useCityAndCountry()
const { initEditConfigure } = useCreateConfigureCharge()
const { initDeleteConfiguration } = useDeleteChargeConfiguration()
const { intiActivate } = useActivateConfiguration()
const tableFields = ref([
	{ value: 'charge_type', text: 'Charges type' },
	{ value: 'charge_value', text: 'Fees' },
	{ value: 'is_compulsory', text: 'Compulsory' },
	{ value: 'country_currently_active_in', text: 'Countries/Cities' },
	{ value: 'description', text: 'Configured by' },
	{ value: 'updated_by_data', text: 'Configured by' },
	{ value: 'created_at', text: 'Date created' },
	{ value: 'is_active', text: 'Status' },
	{ value: 'id', text: 'Action' }
])

const sortDropdownChildren = (data:Record<string, any>) => {
	return [
		{
			name: `${data.is_active ? 'Deactivate' : 'Activate'}`,
			func: (data:any) => { intiActivate(data.id, !data.is_active) }
		},
		{ name: 'Modify', func: (data:any) => { initEditConfigure(data) } },
		{ name: 'Delete', func: (data:any) => initDeleteConfiguration(data.id), class: '!text-red' }
	]
}

const onRowClicked = (data) => {
	useRouter().push(`/configuration/pricing/charges/configurations/${data.id}`)
}

fetchAllCityNames()
fetchAllCountries()
fetchConfiguredCharges()
</script>

<style scoped>
.st_active{
	border: 1px solid #0DAC5C;
	color: #0DAC5C;
	background: #F5FFFA;
}

.st_inactive{
	background-color: #FAFAFA;
	border: 1px solid #6E717C;
	color: #6E717C;
}
</style>
