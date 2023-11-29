<template>
	<Table :loading="loadingAmenities" :headers="tableFields" :table-data="amenitiesList" :has-options="true">
		<template #header>
			<h1 class="border bg-white px-6 py-2.5 border-b-0 rounded-md">
				Amenities List
			</h1>
		</template>
		<template #item="{ item }">
			<span v-if="item.image" class="flex items-center gap-x-2">
				<img :src="item.data.image" alt="amenity image" class="h-10 w-10 rounded-full object-cover"> {{ item.data.short_name }}{{ item.data.image.substr(item.data.image.length - 5) }}
			</span>
			<span v-if="item.created_at">
				{{ useDateFormat(item.data.created_at, "MMMM d, YYYY").value }}
			</span>
			<span v-if="item.id">
				<button @click="deleteAmentity(item.data)"><img src="@/assets/icons/source/red-trash.svg" alt="red trash"></button>
			</span>
		</template>

		<template #footer>
			<TablePaginator :current-page="page" :total-pages="total" :loading="loadingAmenities" @move-to="moveTo($event)" @next="next" @prev="prev" />
		</template>
	</Table>
</template>

<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { useCreateAmentiites } from '@/composables/modules/configure/create'
import { useConfirmationModal } from '@/composables/core/confirmation'
import { useAmenitiesList } from '@/composables/modules/configure/fetch'
const { getAmenitiesList, loadingAmenities, amenitiesList, moveTo, next, prev, total, page } = useAmenitiesList()
getAmenitiesList()
const { deleteAmenity, deletingAmenity: loading } = useCreateAmentiites()
const tableFields = ref([
    {
        text: 'IMAGE',
        value: 'image'
    },
    {
        text: 'DATE CREATED',
        value: 'created_at'
    },
    {
        text: 'NAME',
        value: 'name'
    },
    {
        text: 'SHORT NAME',
        value: 'short_name'
    },
    {
        text: 'ACTION',
        value: 'id'
    }
])

const deleteAmentity = (data: any) => {
    useConfirmationModal().openAlert({
        title: 'You’re about to delete an amenity ?',
		type: 'NORMAL',
        desc: 'You’re about to delete this vehicle amenity, if this is action was not intentional please cancel ?',
		loading,
		call_function: () => deleteAmenity(data.id)
    })
}
</script>

<style>

</style>
