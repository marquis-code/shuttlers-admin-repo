<template>
	<main>
		<Table :loading="loading" :headers="tableFields" :table-data="tableData">
			<template #item="{ item }">
				<span v-if="item.passengers_name" class="flex items-center gap-4">
					<span>{{ item?.data?.passengers_name ?? 'N/A' }}</span>
				</span>

				<span v-if="item.old_pickup" class="flex items-center gap-4">
					<span>{{ item?.data?.old_pickup ?? 'N/A' }}</span>
				</span>
				<div v-if="item.new_pickup" class="flex items-center gap-4 max-w-5xl">
					<div>
						<select>
							<option>Lekki</option>
						</select>
					</div>
				</div>
				<span v-if="item.old_dropoff" class="flex items-center gap-4">
					<span>{{ item?.data?.old_dropoff ?? 'N/A' }}</span>
				</span>
				<span v-if="item.new_dropoff" class="flex items-center gap-4">
					<div>
						<select>
							<option>Lekki</option>
						</select>
					</div>
				</span>
			</template>
		</Table>
		<div class="flex justify-between items-center gap-x-6 mt-10">
			<button @click="goBack" class="bg-gray-500 rounded-md w-full text-white py-2.5">Back</button>
			<button class="bg-black rounded-md text-white w-full py-2.5">Transfer</button>
		</div>
	</main>
</template>

<script setup lang="ts">
    const props = defineProps({
		tableData: {
			type: Array
		},
		loading: {
			type: Boolean
		}
})

const tableFields = ref([
    {
        text: 'PASSENGER NAME',
        value: 'passengers_name'
    },
    {
        text: 'OLD PICKUP',
        value: 'old_pickup'
    },
    {
        text: 'NEW PICKUP',
        value: 'new_pickup'
    },
    {
        text: 'OLD DROPOFF',
        value: 'old_dropoff'
    },
    {
        text: 'NEW DROPOFF',
        value: 'new_dropoff'
    }

])
const emits = defineEmits(['goBack'])
const goBack = () => {
	emits('goBack')
}
</script>
