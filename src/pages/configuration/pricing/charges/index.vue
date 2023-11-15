<template>
	<main class="">
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
				>
					<template #filter_others>
						<button class="shrink-0 flex items-center gap-[16px] font-medium justify-center py-3 px-4 bg-[#FAFAFA] rounded border text-[#444854]" @click="useChargeModal().openCreateChargeConfigurations()">
							<img src="@/assets/icons/source/plus_black.svg" alt="">
							Configure new charge
						</button>
					</template>
				</TableFilter>
			</template>
			<template #item="{ item }">
				<p v-if="item.type" class="text-sm text-[#737876] whitespace-nowrap">
					<span class="text-[#101211] uppercase">
						{{ item.data.additionChargeType?.short_name + ' ' || '' }}
					</span>
					<span>
						{{ item.data.additionChargeType?.name || '' }}
					</span>
				</p>
				<p v-if="item.fees" class="text-sm text-[#737876] whitespace-nowrap">
					<template v-if="item.data.charge_type === 'flat'">
						N{{ item.data.charge_value }}
					</template>
					<template v-else>
						{{ item.data.charge_value }}%
					</template>
				</p>
				<div v-if="item.countries" class="flex flex-col gap-1 py-2 text-[#101211] font-medium">
					<p class="text-sm">
						{{ item.data.country_currently_active_in.name }}
					</p>
					<ModulesConfigureChargesCityList :cities="item.data?.cities_currently_active_in || []" />
				</div>
				<p v-if="item.desc" class="text-sm text-[#737876]">
					{{ item.data.description }}
				</p>
				<p v-if="item.configured_by" class="text-sm text-[#2C8EED] font-medium">
					{{ item.data.updated_by_data?.fname || '' }} {{ item.data.updated_by_data?.lname || '' }}
				</p>
				<div v-if="item.time" class="flex flex-col gap-1 text-xs text-[#313533] font-medium">
					<p>{{ moment(item.data.created_at).format('LT') }}</p>
					<p class="whitespace-nowrap">
						{{ moment(item.data.created_at).format('LL') }}
					</p>
				</div>
				<p v-if="item.status" class="text-xs py-1 px-2 rounded-full font-medium w-fit"
					:class="item.data?.is_active ? 'st_active' : 'st_inactive'"
				>
					{{ item.data.is_active ? 'Active' : 'Inactive' }}
				</p>
				<span v-if="item.action">
					<ButtonIconDropdown :children="dropdownChildren" :data="item.data" class-name="w-40" />
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
	// { value: 'sn', text: 'S/N' },
	{ value: 'type', text: 'Charges type' },
	{ value: 'fees', text: 'Fees' },
	{ value: 'countries', text: 'Countries/Cities' },
	{ value: 'configured_by', text: 'Configured by' },
	{ value: 'time', text: 'Time/date' },
	{ value: 'status', text: 'Status' },
	{ value: 'action', text: 'Action' }
])

const dropdownChildren = computed(() => [
	{ name: 'Activate', func: (data:any) => { intiActivate(data.id) } },
	{ name: 'Modify', func: (data:any) => { initEditConfigure(data) } },
	{ name: 'Delete', func: (data:any) => initDeleteConfiguration(data.id), class: '!text-red' }
])

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
