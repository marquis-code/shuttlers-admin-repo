<template>
	<main class="relative">
		<section class="w-3/12 space-y-3 absolute -top-8 -left-9 z-50 bg-gray-100">
			<div class="w-full">
				<input class="border py-3 rounded-md w-full pl-3 text-sm outline-none" placeholder="Filter Bus Stop in route">
			</div>
			<div v-if="!loading" class="h-screen bg-white">
				<div v-for="(itm, idx) in busstopsList" :key="idx" class="flex focus:bg-black items-center justify-between px-3 py-3.5 border-b cursor-pointer hover:bg-gray-200" @click="handleSelected(itm)">
					<p class="text-xs text-blue-500">
						{{ itm.name }}
					</p>
					<p><img src="@/assets/icons/source/dark-more.svg" alt=""></p>
				</div>
			</div>
			<Skeleton v-else height="500px" />
		</section>
		<MapDisplay height="670px" class="" />
	</main>
</template>
<script setup lang="ts">
import { useRouteBusstopList } from '@/composables/modules/routes/id'
const { loading, getRouteBusstopsById, busstopsList } = useRouteBusstopList()
const id = useRoute().params.id as string
getRouteBusstopsById(id)
definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})
const selected_start_point = ref({})
const selected_end_point = ref({})
const handleSelected = (itm) => {
	selected_start_point.value = itm?.geometry
}
</script>
