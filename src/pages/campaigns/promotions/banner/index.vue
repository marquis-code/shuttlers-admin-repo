<template>
	<main class="">
		<Table :loading="loading_banners" :headers="tableFields" :table-data="computedBannerList" :has-index="true" :has-options="true" :option="onRowClicked">
			<template #header>
				<TableFilter :filter-type="{showStatus:true, showSearchBar:true}" @filter="onFilterUpdate" />
			</template>
			<template #item="{ item }">
				<p v-if="item.date">
					{{ moment(item?.data?.created_at).format('ll') }}
				</p>
				<div v-if="item?.toggle">
					<ToggleButton v-model="item.data.toggle.value" :show-label="false" :disabled="true" :name="`toggle-banner-${item?.data?.id}`" @click.stop="toggleChange(item?.data)" />
				</div>
				<ButtonIconDropdown v-if="item?.action" :children="dropdownChildren" :data="item.data" class-name="w-40" />
			</template>

			<template #footer>
				<TablePaginator :current-page="page" :total-pages="total_pages" :loading="loading_banners" @move-to="moveTo($event)" @next="next" @prev="prev" />
			</template>
		</Table>
	</main>
</template>

<script setup lang="ts">
import moment from 'moment'
import { use_get_baners, useUpdateBanner } from '@/composables/modules/campaigns/banner'
import { useDeleteBanner } from '@/composables/modules/campaigns/banner/delete'

const { getBaners, loading_banners, banersList, moveTo, next, prev, total, page, total_pages, onFilterUpdate } = use_get_baners()
const { initUpdateBanner } = useUpdateBanner()
getBaners()

const { initDelete } = useDeleteBanner()

const onRowClicked = (data: Record<string, any>) => {
	useRouter().push(`/campaigns/promotions/banner/${data?.id}`)
}

const computedBannerList = computed(() => {
    if (!banersList.value) return
    return banersList.value.map((el) => {
        return {
            ...el,
            toggle: ref(el?.status === 'active')
        }
    })
})

const dropdownChildren = computed(() => {
    return [
        { name: 'Update Banner', func: (data:any) => { initUpdateBanner(data, true) } },
        { name: 'Delete Banner', func: (data:any) => { initDelete(data) } }
    ]
})

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})
const tableFields = ref([
    {
        text: 'DATE',
        value: 'date'
    },
    {
        text: 'BANNER TITLE',
        value: 'title'
    },
    {
        text: 'ENABLE',
        value: 'toggle'
    },
    // {
    //     text: 'ACTION TYPE',
    //     value: 'action_type'
    // },
    {
        text: 'ACTIONS',
        value: 'action'
    }
])

const toggleChange = (banner_data: Record<string, any>) => {
    initUpdateBanner(banner_data)
}

</script>
