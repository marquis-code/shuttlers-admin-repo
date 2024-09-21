<template>
	<main class="flex flex-col gap-4">
		<div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
			<ButtonGoBack url="/partners" class="" />
			<div class="flex items-center gap-4">
				<p class="text-sm font-medium text-[#364152] flex gap-2 items-center">
					WALLET BALLANCE:
					<span class="text-dark text-base font-bold">
						{{ walletBalance?.formattedBalance ?? convertToCurrency(0) }}
					</span>
				</p>
				<button class="text-[#475467] border py-2 px-3 font-bold border-[#EAECF0] text-sm rounded-xl">
					Deduct from partner
				</button>
			</div>
		</div>

		<Table
			:loading="loading"
			:has-index="true"
			:headers="tableFields"
			:table-data="[]"
			:page="page"
		>
			<template #header>
				<TableFilter
					:filter-type="{
						showSearchBar: true,
						showDownloadButton: true,
					}"
					@filter="() => {}"
				>
					<template #filter_others>
						<div class="flex items-stretch border rounded-xl text-grey5_5 overflow-hidden">
							<p class="p-3 text-sm border-r">
								Payout type
							</p>
							<select class="capitalize w-fit px-2 bg-white font-medium focus:outline-none pr-6">
								<option v-for="n in ['all', 'weekly', 'monthly']" :key="n" :value="n">
									{{ n }}
								</option>
							</select>
						</div>
					</template>
				</TableFilter>
			</template>
			<template #sub_header>
				<div class="flex items-center justify-end p-4 border-t border-l border-r">
					<div class="flex items-center gap-4">
						<button v-for="n, i in types" :key="i" type="button" class="flex items-center gap-1.5" @click="type = n">
							<div class="w-[18px] h-[18px] rounded-full flex items-center justify-center" :class="type === n ? 'bg-[#BDFDDC]' : 'border border-[#D0D5DD]'">
								<div v-if="type === n" class="w-[12px] h-[12px] bg-green7 rounded-full" />
							</div>
							<p class="text-sm text-[#475467] font-medium capitalize">
								{{ n }}
							</p>
						</button>
					</div>
				</div>
			</template>
			<template #item="{ item }">
				<p v-if="item.desc" class="text-sm text-[#737876]">
					{{ item.data.description }}
				</p>
			</template>

			<!-- <template #footer>
				<TablePaginator
					:current-page="page"
					:total-pages="total"
					:loading="loading"
					@move-to="moveTo($event)"
					@next="next"
					@prev="prev"
				/>
			</template> -->
		</Table>
	</main>
</template>
<script setup lang="ts">
import { convertToCurrency } from '@/composables/utils/formatter'
import { usePayoutDetails } from '@/composables/modules/partners/payouts/details'

const { walletBalance, fetchWalletBalance, fetchParnersInfo } = usePayoutDetails()

fetchWalletBalance()

const loading = ref(false)
const page = ref(1)
const type = ref('all')

onMounted(async () => {
	await fetchParnersInfo()
	fetchWalletBalance()
})

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

const tableFields = ref([
	{ value: 'type', text: 'Date created' },
	{ value: 'desc', text: 'Payout type' },
	{ value: 'time', text: 'Payout period' },
	{ value: 'action', text: 'Reason' },
	{ value: 'time', text: 'Deduction' },
	{ value: 'action', text: 'Type' }
])

const types = ['All', 'Unattached', 'Attached', 'Applied']

</script>

<style scoped></style>
