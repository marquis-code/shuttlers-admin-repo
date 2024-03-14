<template>
	<Modal
		modal="$atts.modal"
		title="Create new reward"
		:is-large-modal="true"
	>
		<form class="flex flex-col gap-4 w-full max-w-[640px] mx-auto" @submit.prevent="createReward">
			<div class="grid grid-cols-2 gap-4">
				<div class="flex flex-col gap-2">
					<label class="label">Reward name</label>
					<input v-model="reward_name" required type="text" class="input-field" @change="generatePrefix" placeholder="Enter reward name">
				</div>
				<div class="flex flex-col gap-2">
					<label class="label">Prefix</label>
					<input v-model="prefix" required type="text" class="input-field" placeholder="Enter prefix">
				</div>
			</div>
			<div class="flex flex-col gap-2">
				<label class="label">Description</label>
				<textarea v-model="description" class="input-field resize-none h-[100px]" cols="30" rows="10" placeholder="Short description of the reward..." />
			</div>
			<div class="flex items-center justify-between gap-4">
				<div class="flex items-center gap-4">
					<p class="text-base text-[#101828] font-medium">
						Users
					</p>
					<a href="/template/users_email.csv" download="Users template" class="flex items-center gap-0 text-purp7 font-medium">
						<Icon name="doc" class="w-6" />
						<span class="underline">Download template</span>
					</a>
				</div>
				<div>
					<input id="csvInput" type="file" accept=".csv" class="hidden" @input="onChange">
					<button v-if="!file" type="button" class="btn text-light bg-dark p-4 rounded-lg gap-2 text-xs font-bold" @click="selectFile">
						<Icon name="file_upload" class="w-6" />
						<span>Upload CSV file</span>
					</button>
					<p v-else class="text-[#101828] text-base font-medium">
						({{ emails?.length || 0 }}) Users
					</p>
				</div>
			</div>

			<div v-if="file" class="flex items-center justify-between gap-4 text-base bg-dark p-3 rounded-lg text-light">
				<p>{{ file?.name }}</p>
				<Icon name="close" class="w-5 cursor-pointer" @click="clearFile" />
			</div>

			<div class="flex flex-col gap-2">
				<label class="label">How many trips should this apply to ?</label>
				<div class="w-full h-fit relative">
					<input v-model="trips_count" required type="number" class="input-field w-full" placeholder="">
					<p class="absolute_tag font-bold">
						Trips
					</p>
				</div>
			</div>

			<div class="grid grid-cols-2 gap-4">
				<div class="flex flex-col gap-2">
					<label class="label">Reward type</label>
					<select v-model="reward_type" class="input-field" disabled>
						<option value="percentage_discount_on_trips">
							Discount by percentage
						</option>
					</select>
				</div>
				<div class="flex flex-col gap-2">
					<label class="label">Discount percentage</label>
					<div class="w-full h-fit relative">
						<input v-model="percent" required type="number" class="input-field w-full" placeholder="">
						<p class="absolute_tag">
							%
						</p>
					</div>
				</div>
			</div>

			<button type="submit" :disabled="loading || !enableButton" class="text-sm bg-black p-4 text-white text-center w-full mt-2 rounded disabled:cursor-not-allowed disabled:bg-grey8">
				{{ loading ? 'processing...' : 'Proceed' }}
			</button>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import Papa from 'papaparse/papaparse.js'
import { useCreateReward } from '@/composables/modules/promocodes/reward/create'

const { loading, clearObj, percent, reward_type, reward_name, emails, description, prefix, trips_count, createReward } = useCreateReward()
const enableButton = computed(() => {
	return !!(reward_name.value && prefix.value && reward_type.value && description.value && trips_count.value && emails.value.length && percent.value)
})

const file = ref(null) as Ref<any>

const selectFile = () => {
    const x = document.querySelector('#csvInput') as HTMLInputElement
    x.click()
}

const clearFile = () => {
    file.value = null
    emails.value = []
}
const onChange = (event:any) => {
	file.value = event.target.files[0]

	if (file.value) {
		Papa.parse(file.value, {
			header: true,
			dynamicTyping: true,
			complete: function(results) {
				const csvDataArray = results.data
				emails.value = csvDataArray.map((el) => el.email).filter((val) => { return val !== null })
			}
		})
	}
    const x = document.querySelector('#csvInput') as any
    x.value = null
}

const generatePrefix = () => {
    if (prefix.value.length) return
    const words = reward_name.value.split(' ')
    const abbreviatedWords = words.map((word) => word.substring(0, 3))
    const abbreviatedString = abbreviatedWords.join('').toUpperCase()
    prefix.value = abbreviatedString
}
onBeforeUnmount(() => clearObj())
</script>

<style scoped>
label{
	margin: 0;
}

.absolute_tag{
	@apply absolute right-2 top-1/2 -translate-y-1/2 text-sm text-neut9 font-medium pl-2 border-l border-neut9
}
</style>
