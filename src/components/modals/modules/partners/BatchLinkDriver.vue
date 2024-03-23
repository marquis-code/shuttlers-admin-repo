<template>
	<Modal
		modal="$atts.modal"
		title="Link drivers with emails (csv)"
	>
		<form class="flex flex-col gap-4 w-full" @submit.prevent="initLinkDriverWithEmail">
			<div v-if="file && driver_emails_errors.length" class="flex flex-col gap-1">
				<p class="text-xs text-red font-medium">
					The following plate numbers are invalid!. Please correct them and try again.
				</p>
				<div class="flex gap-2 ">
					<p v-for="n,i in driver_emails_errors" :key="i" class="p-2 border border-red rounded-md text-center text-sm px-4 text-red font-medium">
						{{ n?.driver_id }}
					</p>
				</div>
			</div>

			<div class="flex items-center gap-4 justify-between">
				<div class="flex flex-col gap-0">
					<p class="text-base text-dark font-medium">
						Batch link a driver
					</p>
					<p class="text-sm text-grey5">
						Upload drivers list (CSV only)
					</p>
				</div>
				<a href="/template/link_driver_template.csv" download="Drivers_batch_linking_template" class="underline text-sm text-green7 font-medium">
					Download CSV Template
				</a>
			</div>

			<input id="csvPlateNumber" type="file" class="hidden" accept=".csv" @change="onChange">

			<div class="field relative cursor-pointer bg-grey p-3 rounded-lg" @click="selectFile">
				<p class="text-sm text-dark font-bold">
					Upload document
				</p>
				<p class="text-xs text-grey5">
					File size should be a max of 500kb
				</p>
			</div>

			<div v-if="file" class="bg-dark p-4 flex items-center gap-4 justify-between rounded-lg">
				<p class="text-light text-sm">
					{{ file?.name }}
				</p>
				<Icon name="close" class="text-light w-4 cursor-pointer" @click="clearFile" />
			</div>

			<div v-if="file" class="flex gap-2 flex-wrap">
				<p v-for="n in driver_emails" :key="n" class="p-2 border rounded-md text-center text-sm px-4 font-medium">
					{{ n }}
				</p>
			</div>

			<button type="submit" :disabled="loading || !enableButton" class="text-sm bg-black p-[16px] text-white text-center w-full mt-2 rounded disabled:cursor-not-allowed disabled:bg-[#E0E6ED]">
				{{ loading ? 'processing...' : 'Proceed' }}
			</button>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import Papa from 'papaparse/papaparse.js'
import { useEmailToLinkDriver } from '@/composables/modules/partners'

const { loading, driver_emails, driver_emails_errors, initLinkDriverWithEmail, clearObj } = useEmailToLinkDriver()
const enableButton = computed(() => {
	return !!(driver_emails.value.length)
})
const file = ref(null) as Ref<any>

const selectFile = () => {
    const x = document.querySelector('#csvPlateNumber') as HTMLInputElement
    x.click()
}

const clearFile = () => {
    file.value = null
    clearObj()
}

const onChange = (event:any) => {
	file.value = event.target.files[0]
    driver_emails.value = []

	if (file.value) {
		Papa.parse(file.value, {
			header: true,
			dynamicTyping: true,
			complete: function(results) {
				const csvDataArray = results.data
				driver_emails.value = csvDataArray.map((el) => el['Drivers Email']).filter((val) => { return val !== null })
			}
		})
	}
    const x = document.querySelector('#csvPlateNumber') as any
    x.value = null
}

onBeforeUnmount(() => clearObj())
</script>

<style scoped>
label{
	margin: 0;
}
</style>
