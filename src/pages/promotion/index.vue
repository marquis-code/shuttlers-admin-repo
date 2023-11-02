<template>
	<main class="">
		<Table :loading="loadingPromotions" :headers="tableFields" :table-data="promotionsList" :has-index="true" :page="page" :has-options="true" :option="(data)=> $router.push(`/promotion/${data.id}`)">
			<template #header>
				<TableFilter :filter-type="{showSearchBar:true, showDownloadButton: true, showDatePicker: true}" :checkbox="true" />
			</template>
			<template #item="{ item }">
				<span v-if="item.has_promotion_expired">
					<StatusBadge :name="item.data.has_promotion_expired === true ? 'inactive' : 'active'" />
				</span>
				<span v-if="item.expires_at">
					<span>{{ item.data.expires_at ? item.data.expires_at : 'Never' }}</span>
				</span>
			</template>

			<template #footer>
				<TablePaginator :current-page="page" :total-pages="total" :loading="loadingPromotions" @move-to="moveTo($event)" @next="next" @prev="prev" />
			</template>
		</Table>
	</main>
</template>

<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { useGetPromotionsList } from '@/composables/modules/promocodes/fetch'
// import { useDriverIdDetails } from '@/composables/modules/drivers/id'

const { getPromotionsList, loadingPromotions, promotionsList, moveTo, next, prev, total, page } = useGetPromotionsList()

// filterData.status.value = useRoute().query.status === '1' ? 'active' : 'inactive'
getPromotionsList()

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
        text: 'PROMO CODE',
        value: 'promo_code'
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
