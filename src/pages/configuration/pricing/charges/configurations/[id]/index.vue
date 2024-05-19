<template>
	<main>
		<ButtonGoBack url="/configuration/pricing/charges" class="mb-6" />
		<main class="flex flex-col gap-4">
			<Skeleton v-if="loading || fetchingAllChargeTypes" height="200px" />
			<template v-else>
				<div class="flex items-center gap-2">
					<router-link to="/configuration/pricing/charges" class="flex items-center gap-2 text-xs font-medium text-[#ACAFAE]">
						<span>Configure</span>
						<img src="@/assets/icons/source/caret-right.svg" alt="">
					</router-link>
					<p class="text-xs text-black font-medium">
						{{ config.additionChargeType?.name || '' }}
					</p>
				</div>
				<div class="bg-white border rounded-lg p-[16px] flex flex-col gap-4">
					<div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
						<div class="flex flex-col gap-1">
							<p class="text-lg text-[#000005] font-medium">
								{{ config.additionChargeType?.short_name }}-{{ config.additionChargeType?.name }}
							</p>
							<p class="text-sm text-[#737876]">
								{{ config.description }}
							</p>
						</div>
						<div class="flex items-stretch gap-2 shrink-0">
							<!-- <button type="button" class="border-none outline-none font-medium bg-transparent text-[#0DAC5C] underline" @click="useChargeModal().openCreateChargeTypes()">
							Additional charge
						</button> -->
							<button type="button" class="px-[16px] py-2 bg-transparent rounded w-fit border outline-none text-sm text-[#101211] font-medium"
								@click="initEditConfigure(config)"
							>
								Modify
							</button>
							<button type="button" class="px-[16px] py-2 bg-transparent rounded w-fit border border-danger outline-none"
								@click="initDeleteConfiguration(config.id, true)"
							>
								<img src="@/assets/icons/source/delete.svg" alt="">
							</button>
						</div>
					</div>
					<div class="border" />
					<div class="flex items-center flex-wrap gap-6 md:gap-4 justify-between">
						<div class="flex flex-col gap-1 text-sm text-[#101211] font-medium">
							<p>{{ config.country_currently_active_in.name }}</p>
							<ModulesConfigureChargesCityList :cities="config.cities_currently_active_in || []" />
						</div>
						<p class="text-sm text-[#0DAC5C] font-medium">
							{{ config.is_compulsory ? 'Compulsory' : 'Not compulsory' }}
						</p>
						<div class="flex flex-col gap-1 text-sm ">
							<p class="text-[#8D918F]">
								Charge
							</p>
							<p class="text-[#6E717C] font-medium">
								<template v-if="config.charge_type === 'flat'">
									{{ convertToCurrency(Number(config.charge_value)) }} flat
								</template>
								<template v-else>
									{{ config.charge_value }} Percent (%)
								</template>
							</p>
						</div>
						<div class="flex flex-col gap-1 text-sm">
							<p class="text-[#8D918F]">
								Configured by
							</p>
							<p class="text-[#2C8EED] font-medium">
								{{ config.updated_by_data.fname || '' }} {{ config.updated_by_data.lname || '' }}
							</p>
						</div>
						<div class="flex flex-col gap-1 text-xs text-[#313533] font-medium">
							<p>{{ moment(config.created_at).format('LT') }}</p>
							<p>{{ moment(config.created_at).format('LL') }}</p>
						</div>
						<p class="text-xs py-1 px-2 rounded-full font-medium w-fit" :class="config.is_active ? 'st_active' : 'st_inactive'">
							{{ config.is_active ? 'active' : 'inactive' }}
						</p>
					</div>
				</div>
			</template>

			<Table
				:loading="fetching_charge_history"
				:has-index="true"
				:headers="tableFields"
				:table-data="chargeHistory"
				:has-options="true"
				:page="page"
			>
				<template #header>
					<TableFilter
						:filter-type="{
							showStatus: false,
							showSearchBar: true,
							showDownloadButton: true,
							showDatePicker: false,
							showDateRange: true,
							downloading: downloading
						}"
						@filter="onFilterUpdate"
						@download="downloadHistory"
					>
						<template #filter_others>
							<button class="shrink-0 font-medium py-2 px-4 bg-black text-sm text-white rounded-lg border self-center"
								@click="useChargeModal().openRemitCharge()"
							>
								Mark as remmitted
							</button>
						</template>
					</TableFilter>
				</template>
				<template #sub_header>
					<div class="flex flex-col gap-y-2 gap-x-[16px] bg-white border border-b-0 md:flex-row md:items-center md:justify-between py-3 px-[16px] border-bottom">
						<p v-if="!loading_total" class="text-sm font-medium text-[#6E717C]">
							Total VAT: <span class="text-[#000005]">{{ convertToCurrency(totalCharge!) }}</span>
						</p>
						<Skeleton v-else height="20px" width="130px" />
						<ButtonMultiSelectDropdown v-model="countries" :children="countriesList" title="Countries:" />
						<ButtonMultiSelectDropdown v-model="cities" :children="citiesList" title="Cities:" />
						<div class="overflow-hidden flex items-stretch rounded border bg-[#F4F5F4] ">
							<button v-for="n,i in ['All', 'Remitted', 'Unremitted']" :key="i" class="py-2 px-4 border-none"
								:class="[status == n ? 'text-[#101211] !bg-white font-bold' : 'text-[#ACAFAE] bg-transparent', i === 1 ? 'border-right border-left' : '']"
								@click="status = n"
							>
								{{ n }}
							</button>
						</div>
					</div>
				</template>
				<template #item="{ item }">
					<div v-if="item.users" class="flex flex-col gap-0 text-sm text-[#101211]">
						<template v-if="item.data.payer_type === 'user'">
							<p class="font-medium">
								{{ item.data.payer?.fname || '' }} {{ item.data.payer?.lname || '' }}
							</p>
							<p class="text-[#737876]">
								{{ item.data.payer?.email || '' }}
							</p>
						</template>
						<template v-else>
							<p class="font-medium">
								{{ item.data.payer?.corporate_name || 'N/A' }} (company)
							</p>
							<p class="text-[#737876]">
								{{ item.data.payer?.email || '' }}
							</p>
						</template>
					</div>
					<div v-if="item.route" class="text-sm text-[#101211] whitespace-nowrap flex flex-col">
						<p class="font-medium">
							{{ item.data?.route?.route_code || 'N/A' }}
						</p>
						<p>{{ item.data?.route_day?.itinerary?.trip_time || 'N/A' }}</p>
					</div>
					<p v-if="item.trip_date" class="text-sm text-[#313533] whitespace-nowrap font-medium">
						{{ moment(new Date(item.data?.route_day?.trip_date)).format('ll') }}
					</p>
					<p v-if="item.t_amount" class="text-sm text-[#313533]">
						{{ convertToCurrency(Number(item.data?.trip_amount)) }}
					</p>
					<p v-if="item.c_amount" class="text-sm text-[#313533]">
						{{ convertToCurrency(Number(item.data?.amount)) }}
					</p>
					<p v-if="item.date" class="text-sm text-[#313533] font-medium whitespace-nowrap">
						{{ moment(item.data.created_at).format('ll') }}
					</p>
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
	</main>
</template>

<script setup lang="ts">
import moment from 'moment'
import { useFetchConfiguredCharges, useDeleteChargeConfiguration, useCreateConfigureCharge, useDetails } from '@/composables/modules/configure/charges/configure/index'
import { useChargeModal } from '@/composables/core/modals'
import { useFetchChargeTypes } from '@/composables/modules/configure/charges/types/fetch'
import { useCityAndCountry } from '@/composables/modules/configure/charges/utils'
import { convertToCurrency } from '@/composables/utils/formatter'

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

const { loading, fetchSingleConfiguredCharges, singleConfiguredCharge: config } = useFetchConfiguredCharges()
const { loading: fetchingAllChargeTypes } = useFetchChargeTypes()
const { initEditConfigure } = useCreateConfigureCharge()
const { initDeleteConfiguration } = useDeleteChargeConfiguration()
const { fetchHistory, chargeHistory, loading: fetching_charge_history, total, page, next, prev, moveTo, onFilterUpdate, status, loading_total, getTotalCharges, totalCharge, downloading, cities, countries, downloadHistory } = useDetails()
const { allCityNames, fetchAllCityNames, fetchAllCountries, allCountries } = useCityAndCountry()

const tableFields = [
	{ value: 'users', text: 'Users/Company' },
	{ value: 'route', text: 'Route' },
	{ value: 'trip_date', text: 'Trip date' },
	{ value: 't_amount', text: 'Trip amount' },
	{ value: 'c_amount', text: 'Charge amount' },
	{ value: 'date', text: 'Date' }
]

const citiesList = computed(() => {
	return allCityNames.value.map((el) => { return { name: el.name, value: el.id } })
})

const countriesList = computed(() => {
	return allCountries.value.map((el) => { return { name: el.name, value: el.id } })
})

fetchSingleConfiguredCharges(useRoute().params.id as string)
fetchHistory()
getTotalCharges()
fetchAllCityNames()
fetchAllCountries()
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
