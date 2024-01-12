<template>
	<main class="">
		<Table :loading="loading" :headers="tableFields" :table-data="formattedCampaignList" :has-index="true" :has-options="true">
			<template #header>
				<TableFilter :filter-type="{showSearchBar:true, showDownloadButton: true, showDateRange: true}" :checkbox="true" @filter="onFilterUpdate" />
				<div class="bg-white pr-4 border-x border-y border-gray-200">
					<div class="flex justify-end items-end">
						<div class="flex items-center gap-x-3 py-3">
							<p>Turn on</p><Toggle v-model="isChecked" label="" />
						</div>
					</div>
				</div>
			</template>
			<template #footer>
				<TablePaginator :current-page="page" :total-pages="total" :loading="loading" @move-to="moveTo($event)" @next="next" @prev="prev" />
			</template>
		</Table>
	</main>
</template>

<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { useToggleCampaignStory } from '@/composables/modules/campaigns/toggleStory'
import { useConfirmationModal } from '@/composables/core/confirmation'
import { useCampaignWinners } from '@/composables/modules/campaigns/id'

const { getCampaignWinners, loading, campaignWinners, onFilterUpdate, moveTo, total, page, next, prev } = useCampaignWinners()
const { loading: loadingToggle, toggleCampaignStory, storyStatus } = useToggleCampaignStory()

getCampaignWinners()

const isChecked = ref(true)

const formattedCampaignList = computed(() =>
campaignWinners.value.map((i) => {
         return {
             ...i,
             date: useDateFormat(i.created_at, 'HH:mm:ss AA').value,
             name: `${i?.user?.fname} ${i?.user?.lname}`,
             email: i?.user?.email,
             phone: i?.user?.phone,
             prize: i?.reward?.description
         }
    })
)

const handleStoryToggle = (val) => {
    console.log(val, 'val hee')
	storyStatus.value = val
    useConfirmationModal().openAlert({
        title: 'Are you sure?',
		type: 'NORMAL',
        desc: 'You are about to turn on the valentine feature!',
		loading: loadingToggle,
		call_function: () => toggleCampaignStory()
    })
}

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
