<template>
	<main class="">
		<Table :loading="loadingReferrals" :headers="tableFields" :table-data="referralsList" :has-index="true" :page="page" :has-options="true" :option="(data)=> $router.push(`/referral/${data.id}`)">
			<template #header>
				<TableFilter :filter-type="{showStatus:false, showSearchBar:true, showDownloadButton: true, showDatePicker: true}" />
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
import { useGetPromotionsList } from '@/composables/modules/referralcodes/fetch'
const { getReferralsList, loadingReferrals, referralsList, moveTo, next, prev, total, page } = useGetPromotionsList()
getReferralsList()
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
