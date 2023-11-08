<template>
	<main class="">
		<Table :loading="loading" :headers="tableFields" :table-data="formattedCampaignList" :has-index="true" :has-options="true">
			<template #header>
				<TableFilter :filter-type="{showStatus:true, showSearchBar:true, showDownloadButton: true, showDatePicker: true}" :checkbox="true" @filter="onFilterUpdate" />
			</template>

			<!-- <template #item="{ item }">
				<div v-if="item.location">
					<RouteDescription :pickup="item.data.trip.route.pickup" :destination="item.data.trip.route.destination" />
				</div>
				<span v-else-if="item.created_at">
					{{ useDateFormat(item.data.created_at, "MMMM D, YYYY").value }}
				</span>
				<span v-else-if="item.status" class="flex">
					<StatusBadge :name="item.data.status" />
				</span>
				<div v-else-if="item.trip_id" class="flex">
					<button class="btn-primary-xs" :disabled="item.data.sos_provider_ref" @click.stop="openNotifier(item.data)">
						{{ item.data.sos_provider_ref ? 'Notified' : 'Notify' }}
					</button>git
				</div>
			</template> -->
			<template #footer>
				<TablePaginator :current-page="page" :total-pages="total" :loading="loading" @move-to="moveTo($event)" @next="next" @prev="prev" />
			</template>
		</Table>
	</main>
</template>

<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { useCampaignWinners } from '@/composables/modules/campaigns/id'

const { getCampaignWinners, loading, campaignWinners, onFilterUpdate, moveTo, total, page, next, prev } = useCampaignWinners()

getCampaignWinners()

const formattedCampaignList = computed(() =>
campaignWinners.value.map((i) => {
         return {
             ...i,
             date: useDateFormat(i.created_at, 'HH:mm:ss AA').value,
             name: `${i?.user?.fname} ${i?.user?.name}`,
             email: i?.user?.email,
             phone: i?.user?.phone,
             prize: i?.reward?.description
         }
    })
)

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})
const tableFields = ref([

    {
        text: 'DATE & TIME',
        value: 'date'
    },
    {
        text: 'NAME',
        value: 'name'
    },
    {
        text: 'EMAIL ADDRESS',
        value: 'email'
    },
    {
        text: 'PHONE NUMBER',
        value: 'phone'
    },
    {
        text: 'PRIZE',
        value: 'prize'
    }

])

</script>

<style scoped></style>
src/composables/modules/commute/sos/fetch
