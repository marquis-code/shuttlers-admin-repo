<template>
	<main class="">
		<Table :loading="loadingBusCaptains" :headers="tableFields" :table-data="formattedBusCaptainsList">
			<template #header>
				<TableFilter :filter-type="{showSearchBar:true, showDownloadButton: true, showStatus: true, showDatePicker: true}" @filter="onFilterUpdate" />
			</template>
			<template #item="{ item }">
				<span v-if="item.id">
					{{ item.data.id }}
				</span>
				<div v-if="item.user" class="flex items-center gap-x-2">
					<Avatar :name="item.data.user" bg="#B1C2D9" />
					<NuxtLink class="text-blue-600" to="/">
						{{ item.data.user }}
					</NuxtLink>
				</div>
				<div v-if="item.phone">
					<NuxtLink class="text-blue-600" to="/">
						{{ item.data.phone }}
					</NuxtLink>
				</div>
				<div v-if="item.email">
					<NuxtLink class="text-blue-600" to="/">
						{{ item.data.email }}
					</NuxtLink>
				</div>
				<div v-if="item.route">
					<NuxtLink class="text-blue-600" to="/">
						{{ item.data.route }}
					</NuxtLink>
				</div>
				<span v-if="item.action">
					<ButtonIconDropdown :children="dropdownChildren" :data="item.data" class-name="w-56" />
				</span>
			</template>
			<template #footer>
				<TablePaginator :current-page="page" :total-pages="total" :loading="loadingBusCaptains" @move-to="moveTo($event)" @next="next" @prev="prev" />
			</template>
		</Table>
	</main>
</template>
<script setup lang="ts">
import { useRemoveBusCaptain } from '@/composables/modules/trips/buscaptain'
import { useConfirmationModal } from '@/composables/core/confirmation'
import { useGetBusCaptainsList } from '@/composables/modules/trips/fetch'
const { removeBusCaptain, loading } = useRemoveBusCaptain()
const { getBusCaptains, loadingBusCaptains, busCaptainsList, filterData, onFilterUpdate, moveTo, total, page, next, prev } = useGetBusCaptainsList()
getBusCaptains()

const formattedBusCaptainsList = computed(() =>
busCaptainsList.value.map((i, index) => {
         return {
             ...i,
             user: `${i?.user?.fname} (${i?.user?.lname})`,
			 phone: i?.user?.phone ?? 'N/A',
			 email: i?.user?.email ?? 'N/A',
			 route: `${i?.route?.route_code}` ?? 'N/A',
			 itinerary: i?.itinerary?.trip_time ?? 'N/A',
             action: '',
			 id: index + 1
         }
    })
)

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

const dropdownChildren = computed(() => [
	{ name: 'Remove as captain', func: (data) => { handleRemoveBusCaptain(data) }, class: '!text-red' }
])

const handleRemoveBusCaptain = (data: any) => {
    useConfirmationModal().openAlert({
        title: 'Please Confirm',
		type: 'NORMAL',
        desc: `Are you sure you want to remove ${data.user} as bus captain?`,
		loading,
		call_function: () => removeBusCaptain(data.id)
    })
}

const tableFields = ref([
    {
        text: 'USER',
        value: 'user'
    },
    {
        text: 'PHONE',
        value: 'phone'
    },
    {
        text: 'EMAIL',
        value: 'email'
    },
    {
        text: 'ROUTE',
        value: 'route'
    },
    {
        text: 'ITINERARY',
        value: 'itinerary'
    },
	{
		text: 'ACTIONS',
		value: 'action'
	}
])

</script>

<style scoped></style>
