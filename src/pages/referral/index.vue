<template>
	<main class="">
		<Table :loading="loadingReferrals" :headers="tableFields" :table-data="referralsList" :has-index="true" :page="page" :has-options="true" :option="onRowClicked">
			<template #header>
				<TableFilter :filter-type="{showStatus:true, showSearchBar:true, showDownloadButton: true, showDatePicker: true}" :selected="log_ids" :checkbox="true" @filter="onFilterUpdate" @checked="log_ids = ($event)" />
			</template>
			<template #item="{ item }">
				<span v-if="item.has_promotion_expired">
					<StatusBadge :name="item.data.has_promotion_expired === true ? 'inactive' : 'active'" />
				</span>
				<span v-if="item.customer">
					<span>{{ item.data.customer.fname }} {{ item.data.customer.lname }}</span>
				</span>
				<span v-if="item.expires_at">
					<span>{{ item.data.expires_at ? item.data.expires_at : 'Never' }}</span>
				</span>
			</template>

			<template #footer>
				<TablePaginator :current-page="page" :total-pages="total" :loading="loadingReferrals" @move-to="moveTo($event)" @next="next" @prev="prev" />
			</template>
		</Table>
	</main>
</template>

<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { useGetPromotionsList } from '@/composables/modules/referralcodes/fetch'
// import { useDriverIdDetails } from '@/composables/modules/drivers/id'

const { getReferralsList, loadingReferrals, referralsList, moveTo, next, prev, total, page } = useGetPromotionsList()

// filterData.status.value = useRoute().query.status === '1' ? 'active' : 'inactive'
getReferralsList()

// const onRowClicked = (data) => {
// 	const { selectedDriver } = useDriverIdDetails()
// 	useRouter().push(`/drivers/${data.id}/driver-info`)
// 	selectedDriver.value = data
// }

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})
const tableFields = ref([
    {
        text: 'CAMPAIGN',
        value: 'description'
    },
    {
        text: 'CUSTOMER',
        value: 'customer'
    },
    {
        text: 'MAX NUMBER OF USES',
        value: 'max_number_of_uses'
    },
	{
        text: 'EXPIRES AT',
        value: 'expires_at'
    },
    {
        text: 'STATUS',
        value: 'has_promotion_expired'
    }
])

</script>
