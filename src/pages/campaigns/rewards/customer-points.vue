<template>
	<main class="space-y-10">
		<div class="text-center bg-black h-14 text-white flex justify-center items-center">
			Current customer point rate: 1 point ~ ₦50
		</div>
		<div>
			<div class="container mx-auto">
				<div class="flex justify-between items-center px-4 py-2 border">
					<p class="text-[#101828] font-[400] leading-[28px] text-sm">
						Configure customers reward points.
					</p>
					<div class="lg:flex items-center gap-x-3 space-y-4 lg:space-y-0">
						<button class="bg-white text-[#344054] text-xs py-[10px] px-[16px] w-full lg:w-max border font-[500] border-[#D0D5DD] rounded-md">
							Add event
						</button>
						<button class="bg-black text-white text-xs py-[10px] px-[16px] w-full lg:w-max rounded-md">
							Configure point
						</button>
					</div>
				</div>
				<div class="overflow-x-auto border-[0.4px] rounded-b-lg">
					<table class="min-w-full text-xs">
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
										{{ item.event }}
									</p>
								</td>
								<td class="px-3 py-6">
									<p class="text-gray-500">
										{{ item.point }}
									</p>
								</td>
								<td class="px-3 py-6">
									<p class="text-gray-500">
										{{ item.value }}
									</p>
								</td>
								<td class="px-3 py-6 text-right">
									<div v-if="!isEditing" class="flex items-center gap-x-2">
										<button :class="[!togel[item.id] ? 'bg-[#4848ED]' : 'bg-black']" class="text-white text-xs py-1 txet-xs w-full rounded-md" @click.prevent="edit(item.id)">
											{{ !togel[item.id] ? "Edit" : "Save" }}
										</button>
										<div>
											<img v-if="!togel[item.id]" src="@/assets/icons/source/delete.svg" alt="delete icon" class="cursor-pointer" @click="handleDelete(item.id)">
											<button v-else class="bg-gray-500 text-white text-xs py-1 txet-xs w-full rounded-md" @click="isEditing = false">
												Cancel
											</button>
										</div>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})

const isEdited = ref(false)
const isEditing = ref(false)
const editedValue = ref('')

const pointsList = ref([
	{
        id: 1,
		event: 'No show',
		point: 'N/A',
		value: 'N/A'
	},
	{
        id: 2,
		event: 'No show',
		point: 'N/A',
		value: 'N/A'
	},
	{
        id: 3,
		event: 'No show',
		point: 'N/A',
		value: 'N/A'
	},
	{
        id: 4,
		event: 'No show',
		point: 'N/A',
		value: 'N/A'
	},
	{
        id: 5,
		event: 'No show',
		point: 'N/A',
		value: 'N/A'
	}
])

const togel = ref(pointsList.value.reduce((agg, item) => ({ ...agg, [item.id]: false }), {}))

const edit = (id) => {
	togel.value[id] = !togel.value[id]
}

const saveEdit = (id) => {
	togel.value[id] = !togel.value[id]
}

const handleDelete = (itm) => {
	const itemIndex = pointsList.value.findIndex((item) => item.id === itm.id)
	pointsList.value.splice(itemIndex, 1)
}
</script>

<style scoped></style>
