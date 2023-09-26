<template>
	<main class="space-y-10">
		<div class="text-center bg-black h-14 text-white flex justify-center items-center">
			Current pilot point rate: 1 point ~ ₦50
		</div>
		<div>
			<div class="container mx-auto">
				<div class="flex justify-between items-center px-4 py-2 border">
					<p class="text-[#101828] font-[400] leading-[28px] text-sm">
						Configure pilot reward points.
					</p>
					<div class="lg:flex items-center gap-x-3 space-y-4 lg:space-y-0">
						<button class="bg-white text-[#344054] text-xs py-[10px] px-[16px] border font-[500] w-full lg:w-max border-[#D0D5DD] rounded-md">
							Add event
						</button>
						<button class="bg-black text-white text-xs py-[10px] px-[16px] w-full lg:w-max rounded-md" @click="useCampaignModal().openConfigurePoints()">
							Configure point
						</button>
					</div>
				</div>
				<div class="overflow-x-auto border-[0.4px] rounded-b-lg">
					<table v-if="loadingPointsList" class="min-w-full text-xs">
						<colgroup>
							<col>
							<col>
							<col>
							<col>
							<col class="w-32">
						</colgroup>
						<thead class="bg-white">
							<tr class="text-left text-gray-900">
								<th v-for="(item, index) in ['S/N', 'EVENT', 'POINT', 'VAALUE', 'ACTION']" :key="index" class="px-3 py-4">
									{{ item }}
								</th>
							</tr>
						</thead>
						<tbody class="">
							<tr v-for="(item, index) in pointsList" :key="index" class="border-[0.4px] border-opacity-20 odd:bg-white even:bg-slate-50 text-gray-950">
								<td class="px-3 py-6">
									<p class="font-medium">
										{{ index + 1 }}
									</p>
								</td>
								<td class="px-3 py-6">
									<p class="font-medium">
										{{ item?.event_name }}
									</p>
								</td>
								<!-- <td class="px-3 py-6">
									<p v-if="!togel[item.id]" class="text-gray-500">
										{{ item?.points }}
									</p>
									<p v-else>
										<input v-model="item?.points" type="tel" class="w-10 flex justify-center items-center pl-2 py-2 text-xs text-center  rounded-md  border outline-none">
									</p>
								</td> -->
								<td class="px-3 py-6">
									<p class="text-gray-500">
										{{ item?.updated_by }}
									</p>
								</td>
								<td class="px-3 py-6 text-right">
									<div class="flex items-center gap-x-2">
										<button :class="[!togel[item.id] ? 'bg-[#4848ED]' : 'bg-black']" class="text-white py-2 text-xs w-full rounded-md" @click.prevent="edit(item.id)">
											{{ !togel[item.id] ? "Edit" : "Save" }}
										</button>
										<div>
											<img v-if="!togel[item.id]" src="@/assets/icons/source/delete.svg" alt="delete icon" class="cursor-pointer" @click="handleDelete(item.id)">
											<button v-else class="bg-gray-500 text-white px-2 text-xs py-2 txet-xs w-full rounded-md" @click="togel[item.id] = false">
												Cancel
											</button>
										</div>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
					<Skeleton v-else class="" height="400px" />
				</div>
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
import { useCampaignModal } from '@/composables/core/modals'
import { use_get_pilot_point_list } from '@/composables/modules/campaigns/fetch'
const { getPilotPoints, loadingPointsList, pointsList } = use_get_pilot_point_list()
getPilotPoints()
console.log(pointsList, 'pilot poits here')
definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})

const togel = ref(pointsList.value.reduce((agg, item) => ({ ...agg, [item.id]: false }), {}))

const edit = (id) => {
	togel.value[id] = !togel.value[id]
}

const handleDelete = (itm) => {
	const itemIndex = pointsList.value.findIndex((item) => item.id === itm.id)
	pointsList.value.splice(itemIndex, 1)
}

</script>

<style scoped></style>
