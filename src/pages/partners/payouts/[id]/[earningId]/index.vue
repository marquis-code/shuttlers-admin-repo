<template>
	<main v-if="false" class="flex flex-col gap-6">
		<Skeleton v-if="loading_partners || loading_earnings" height="45px" radius="10px" />
		<div v-else class="flex items-center gap-2">
			<NuxtLink to="/partners/payouts" class="text-sm text-grey4">
				Payout
			</NuxtLink>
			<img src="@/assets/icons/source/caret-greater-than.svg" alt="">
			<p>{{ `${partnerInfo.owner?.fname || ''} ${partnerInfo.owner?.lname || ''}` }}</p>
		</div>
		<Skeleton v-if="loading_partners || loading_earnings" height="300px" radius="10px" />
		<div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-6">
			<div class="bg-light rounded-md p-4 border flex flex-col">
				<h3 class="text-base font-medium text-dark border-b py-3">
					Partner Information
				</h3>
				<div v-for="n in partner_info" :key="n.key" class="flex items-center justify-between gap-4 py-3 border-b">
					<p class="key">
						{{ n.key }}
					</p>
					<p class="value">
						{{ n.value }}
					</p>
				</div>
				<div class="flex items-center justify-between gap-4 py-3 border-b">
					<p class="key">
						settlement account
					</p>
					<div class="flex flex-col gap-1">
						<p class="value !text-dark !font-medium">
							{{ earningInfo?.settlementAccount?.accountNumber || 'N/A' }}
						</p>
						<p class="value">
							{{ earningInfo?.settlementAccount?.accountName || 'N/A' }}
						</p>
						<p class="value">
							{{ earningInfo?.settlementAccount?.bankName || 'N/A' }}
						</p>
					</div>
				</div>
				<div class="flex items-center justify-between gap-4 py-3">
					<p class="key">
						Partners full details
					</p>
					<NuxtLink :to="`/partners/${$route.params.id}/${$route.params.earningId}/partner-info`" class="underline text-blue-500 text-sm">
						Click to view
					</NuxtLink>
				</div>
			</div>

			<div class="bg-light rounded-md p-4 border flex flex-col">
				<h3 class="text-base font-medium text-dark border-b py-3">
					Payout
				</h3>
				<div class="flex flex-col gap-1 py-4">
					<h1 class="text-3xl font-bold text-dark text-center">
						₦ {{ earningInfo?.netRevenue || 0 }}
					</h1>
					<h3 class="text-grey4 text-base text-center font-medium">
						PARTNERS PAYOUT
					</h3>
				</div>
				<div v-for="n in payout_info" :key="n.key" class="flex items-center justify-between gap-4 py-3 border-b">
					<p class="key">
						{{ n.key }}
					</p>
					<p class="value">
						{{ n.value }}
					</p>
				</div>
			</div>
		</div>

		<div class="bg-light p-4 rounded-md">
			<Table
				:loading="loading_deductions"
				:has-index="true"
				:headers="tableFields"
				:table-data="deductions"
				:page="1"
			>
				<template #header>
					<p class="p-2 text-base text-dark">
						Deductions on earnings
					</p>
				</template>
				<template #item="{ item }">
					<p v-if="item.amount" class="text-sm whitespace-nowrap text-red">
						-₦{{ item.data?.amount || 0 }}
					</p>
					<p v-if="item.date" class="text-sm whitespace-nowrap">
						{{ item.data.createdAt ? moment(item.data.createdAt).format('LL') : 'N/A' }}
					</p>
				</template>
			</Table>
		</div>

		<div class="flex flex-col gap-4">
			<div class="flex items-center justify-end gap-4">
				<button class="p-2 bg-[rgb(237,242,249)] text-dark text-sm px-4 rounded">
					Resync Revenues
				</button>
				<button class="p-2 bg-[rgb(237,242,249)] text-dark text-sm px-4 rounded" @click="markMultiple">
					Mark multiple revenues as paid
				</button>
			</div>
			<Table
				:loading="loading"
				:has-index="true"
				:headers="revenueFields"
				:table-data="revenues"
				:page="page"
			>
				<template #header>
					<TableFilter
						:filter-type="{
							showSearchBar: true,
							showDateRange: true,
							showDownloadButton: true
						}"
						@filter="onFilterUpdate"
					/>
				</template>
				<template #item="{ item }">
					<p v-if="item.date" class="text-sm whitespace-nowrap">
						{{ moment(item.data.tripStartTime).format('LL') }} <br>
						{{ moment.utc(item.data.tripStartTime).format('LT') }}
					</p>
					<p v-if="item.creation_date" class="text-sm whitespace-nowrap">
						{{ moment(item.data.createdAt).format('LL') }} <br>
						Marked by: {{ item.data?.metadata?.actor?.fname || '' }} {{ item.data?.metadata?.actor?.lname || '' }}
					</p>
					<div v-if="item.route" class="text-sm">
						<RouteDescription :pickup="item.data.metadata?.pickup" :destination="item.data.metadata?.dropoff" />
					</div>
					<p v-if="item.route_code" class="text-sm whitespace-nowrap">
						{{ item.data?.metadata?.routeCode || 'N/A' }}
					</p>
					<p v-if="item.deduction" class="text-sm whitespace-nowrap text-red">
						{{ item.data?.totalDeductedAmount || '0' }}
					</p>
					<p v-if="item.status" class="text-xs p-1 rounded text-dark whitespace-nowrap font-medium w-fit"
						:class="item.data?.isSettled ? 'bg-green7' : 'bg-orange-400'"
					>
						{{ item.data?.isSettled ? 'Settled' : 'Not settled' }}
					</p>
					<span v-if="item.action">
						<ButtonIconDropdown :index="item.index" :children="dropdownChildren" :data="item.data" class-name="w-40" />
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
		</div>
	</main>
	<main v-else class="flex flex-col gap-6">
		<Skeleton v-if="loading_partners || loading_earnings" height="45px" radius="10px" />
		<div v-else class="flex items-center gap-2">
			<NuxtLink to="/partners/payouts" class="text-sm text-grey4">
				Payout
			</NuxtLink>
			<img src="@/assets/icons/source/caret-greater-than.svg" alt="">
			<p>{{ `${partnerInfo.owner?.fname || ''} ${partnerInfo.owner?.lname || ''}` }}</p>
		</div>
		<Skeleton v-if="loading_partners || loading_earnings" height="300px" radius="10px" />
		<div v-else class="flex flex-col gap-6">
			<div class="p-4 flex items-center gap-4 justify-between flex-wrap bg-light border rounded-lg">
				<div class="flex flex-col">
					<p class="text-grey5 text-sm font-medium">Name</p>
					<p class="text-base text-grey1 font-medium">
						{{ `${partnerInfo.owner?.fname || ''} ${partnerInfo.owner?.lname || ''}` }}
					</p>
				</div>
				<div class="flex flex-col">
					<p class="text-grey5 text-sm font-medium">Company Name</p>
					<p class="text-base text-grey1 font-medium">
						{{ partnerInfo.company_name || 'N/A' }}
					</p>
				</div>
				<div class="flex flex-col">
					<p class="text-grey5 text-sm font-medium">Partner's Email</p>
					<p class="text-base text-[#7493CB] font-medium">
						{{ partnerInfo.owner?.email || 'N/A' }}
					</p>
				</div>
				<div class="flex flex-col">
					<p class="text-grey5 text-sm font-medium">Company Email</p>
					<p class="text-base text-[#7493CB] font-medium">
						{{ partnerInfo?.company_email || 'N/A' }}
					</p>
				</div>
				<div class="flex flex-col gap-1">
					<p class="text-grey5 text-sm font-medium">Settlement Account</p>
					<div class="flex flex-col">
						<p class="text-base text-grey1 font-medium">
							{{ earningInfo.settlementAccount?.accountNumber }}
						</p>
						<p class="text-xs font-medium text-grey5">{{ earningInfo.settlementAccount?.bankName }} - {{ earningInfo.settlementAccount?.accountName }}</p>
					</div>
				</div>
				<NuxtLink :to="`/partners/${id}/${earningId}/partner-info`"
					class="text-sm p-2 border rounded-md font-medium px-4 text-grey7"
				>
					View Details
				</NuxtLink>
			</div>
			<div class="flex flex-col lg:flex-row lg:items-start gap-6">
				<div class="bg-light rounded-md p-4 border flex flex-col w-full max-w-[400px] lg:min-w-[300px]shrink-0">
					<h3 class="text-base font-medium text-dark border-b py-3">
						Payout
					</h3>
					<div class="flex flex-col gap-1 py-4">
						<h1 class="text-3xl font-bold text-dark text-center">
							₦ {{ earningInfo?.netRevenue || 0 }}
						</h1>
						<h3 class="text-grey4 text-base text-center font-medium">
							PARTNERS PAYOUT
						</h3>
					</div>
					<div v-for="n in payout_info" :key="n.key" class="flex items-center justify-between gap-4 py-3 border-b">
						<p class="key">
							{{ n.key }}
						</p>
						<p class="value">
							{{ n.value }}
						</p>
					</div>
				</div>
				<div class="bg-light rounded-md border d-flex flex-col w-full flex-grow overflow-auto">
					<h3 class="p-4 text-dark font-medium border-b">
						Deductions
					</h3>
					<div>
						<Table
							:loading="loading_deductions"
							:has-index="true"
							:headers="tableFields"
							:table-data="deductions"
							:page="1"
						>
							<template #item="{ item }">
								<p v-if="item.amount" class="text-sm whitespace-nowrap text-red">
									-₦{{ item.data?.amount || 0 }}
								</p>
								<p v-if="item.date" class="text-sm whitespace-nowrap">
									{{ item.data.createdAt ? moment(item.data.createdAt).format('LL') : 'N/A' }}
								</p>
								<p v-if="item.type" class="text-sm whitespace-nowrap">
									{{ item.data?.tripRevenueId ? 'Revenue' : 'Earning' }} deduction
								</p>
							</template>
						</Table>
					</div>
				</div>
			</div>
		</div>

		<div class="flex flex-col gap-4">
			<!-- <div class="flex items-center justify-end gap-4">
				<button class="p-2 bg-[rgb(237,242,249)] text-dark text-sm px-4 rounded">
					Resync Revenues
				</button>
				<button class="p-2 bg-[rgb(237,242,249)] text-dark text-sm px-4 rounded" @click="markMultiple">
					Mark multiple revenues as paid
				</button>
			</div> -->
			<Table
				:loading="loading"
				:has-index="true"
				:headers="revenueFields"
				:table-data="revenues"
				:page="page"
			>
				<template #header>
					<TableFilter
						:filter-type="{
							showSearchBar: false,
							showDateRange: true,
							showDownloadButton: true
						}"
						@filter="onFilterUpdate"
					/>
				</template>
				<template #sub_header>
					<ModulesPartnersPayoutsEarningsGrid :obj="revenueMeta" :loading="loading" />
				</template>
				<template #item="{ item }">
					<p v-if="item.date" class="text-sm whitespace-nowrap">
						{{ moment(item.data.tripStartTime).format('LL') }} <br>
						{{ moment.utc(item.data.tripStartTime).format('LT') }}
					</p>
					<p v-if="item.creation_date" class="text-sm whitespace-nowrap">
						{{ moment(item.data.createdAt).format('LL') }} <br>
						Marked by: {{ item.data?.metadata?.actor?.fname || '' }} {{ item.data?.metadata?.actor?.lname || '' }}
					</p>
					<div v-if="item.route" class="text-sm">
						<RouteDescription :pickup="item.data.metadata?.pickup" :destination="item.data.metadata?.dropoff" />
					</div>
					<p v-if="item.route_code" class="text-sm whitespace-nowrap">
						{{ item.data?.metadata?.routeCode || 'N/A' }}
					</p>
					<p v-if="item.deduction" class="text-sm whitespace-nowrap text-red">
						{{ item.data?.totalDeductedAmount || '0' }}
					</p>
					<p v-if="item.status" class="text-xs p-1 rounded text-dark whitespace-nowrap font-medium w-fit"
						:class="item.data?.isSettled ? 'bg-green7' : 'bg-orange-400'"
					>
						{{ item.data?.isSettled ? 'Settled' : 'Not settled' }}
					</p>
					<span v-if="item.action">
						<ButtonIconDropdown :index="item.index" :children="dropdownChildren" :data="item.data" class-name="w-40" />
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
		</div>
	</main>
</template>

<script setup lang="ts">
import moment from 'moment'
import { usePayoutDetails, useEarningsRevenues, useMarkRevenueAsPaid, useApprove } from '@/composables/modules/partners/payouts/details'
import { useDeductPayout } from '@/composables/modules/partners/payouts'
import { useAlert } from '@/composables/core/notification'

const { loading_partners, loading_earnings, fetchParnersInfo, fetchEarningInfo, partnerInfo, earningInfo, fetchDeductions, deductions, loading_deductions } = usePayoutDetails()
const { loading, revenues, revenueMeta, onFilterUpdate, moveTo, page, total, next, prev } = useEarningsRevenues()
const { initDeduct } = useDeductPayout()
const { initMarkRevenueAsPaid } = useMarkRevenueAsPaid()

const earningId = useRoute().params.earningId as string
const id = useRoute().params.id as string

fetchParnersInfo()
fetchEarningInfo()
fetchDeductions()
const partner_info = computed(() => {
	return [
		{ key: 'Name', value: `${partnerInfo.value.owner?.fname || ''} ${partnerInfo.value.owner?.lname || ''}` },
		{ key: 'Company', value: partnerInfo.value?.company_name || 'N/A' },
		{ key: 'Partner\'s Email', value: partnerInfo.value?.owner?.email || 'N/A' },
		{ key: 'Company\'s Email', value: partnerInfo.value?.company_email || 'N/A' }
	]
})

const payout_info = computed(() => {
	return [
		{ key: 'Total amount', value: `₦ ${earningInfo.value?.totalRevenue || 0}` },
		{ key: 'Deductions', value: `₦ ${earningInfo.value?.totalDeduction || 0}` },
		{ key: 'Status', value: earningInfo.value?.status }
	]
})

const tableFields = ref([
	{ text: 'DATE CREATED', value: 'date' },
	{ text: 'DEDUCTION', value: 'amount' },
	{ text: 'REASON', value: 'description' },
	{ text: 'TYPE', value: 'type' }
])

const revenueFields = ref([
	{ text: 'TRIP DATE', value: 'date' },
	{ text: 'TIME OF CREATION', value: 'creation_date' },
	{ text: 'route', value: 'route' },
	{ text: 'route code', value: 'route_code' },
	{ text: 'Amount earned', value: 'partnersRevenue' },
	{ text: 'Deduction', value: 'deduction' },
	{ text: 'Net income', value: 'finalPartnersRevenue' },
	{ text: 'Description', value: 'description' },
	{ text: 'Status', value: 'status' },
	{ text: 'Action', value: 'action' }
])

const dropdownChildren = computed(() => [
	{ name: 'Mark as paid', func: (data) => { initMarkRevenueAsPaid(data) } },
	{ name: 'Deduct from revenue', func: (data) => { initDeduct(data, true, true) }, class: '!text-red' }
])

const markMultiple = () => {
	if (revenues.value.length) {
		initMarkRevenueAsPaid(revenues.value[0], true)
	} else {
		useAlert().openAlert({ type: 'ERROR', msg: 'No Revenue available' })
	}
}

definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})
</script>

<style scoped>
.key{
	@apply uppercase font-medium text-grey5 text-sm
}
.value{
	@apply text-sm text-dark text-right
}
</style>
