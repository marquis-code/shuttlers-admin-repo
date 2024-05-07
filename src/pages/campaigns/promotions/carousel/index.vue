<template>
	<main class="">
		<Table :loading="loading_carousels" :headers="tableFields" :table-data="computedCarouselList" :has-index="true" :has-options="true" :option="onRowClicked">
			<template #header>
				<TableFilter :filter-type="{showStatus:false}" />
			</template>
			<template #item="{ item }">
				<p v-if="item.date">
					{{ moment(item?.data?.created_at).format('ll') }}
				</p>
				<p v-if="item?.multiple" class="uppercase font-medium">
					{{ item?.data?.assets?.length > 1 ? 'yes' : 'no' }}
				</p>
				<div v-if="item?.toggle">
					<ToggleButton v-model="item.data.toggle.value" :show-label="false" :disabled="true" :name="`toggle-banner-${item?.data?.id}`" @click.stop="toggleChange(item?.data)" />
				</div>
			</template>

			<!-- <template #footer>
				<TablePaginator :current-page="page" :total-pages="total_pages" :loading="loading_banners" @move-to="moveTo($event)" @next="next" @prev="prev" />
			</template> -->
		</Table>
	</main>
</template>

<script setup lang="ts">
import moment from 'moment'
import { use_get_carousels, useUpdateCarousel } from '@/composables/modules/campaigns/carousels'

const { getCarousels, carouselsList, loading_carousels, moveTo, next, prev, total, page, total_pages } = use_get_carousels()
const { initUpdateCarousel } = useUpdateCarousel()
getCarousels()

const onRowClicked = (data: Record<string, any>) => {
	useRouter().push(`/campaigns/promotions/carousel/${data?.id}`)
}

const computedCarouselList = computed(() => {
    return carouselsList.value.map((el) => {
        return {
            ...el,
            toggle: ref(el?.status === 'active')
        }
    })
})

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})
const tableFields = ref([
    { text: 'DATE', value: 'date' },
    { text: 'CAROUSEL TITLE', value: 'name' },
    { text: 'MULTIPLE IMAGES', value: 'multiple' },
    { text: 'ENABLE', value: 'toggle' }
])

const toggleChange = (carousel_data: Record<string, any>) => {
    initUpdateCarousel(carousel_data)
}

</script>
