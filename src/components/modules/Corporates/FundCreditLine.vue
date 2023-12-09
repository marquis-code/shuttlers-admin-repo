<template>
	<main class="card space-y-6 lg:w-6/12">
		<h1 class="font-bold">
			Fund Credit Wallet For Select Staff
		</h1>
		<form class="space-y-6" @submit.prevent="submitForm">
			<div>
				<label class="text-gray-700">How much credit do you want to apply?</label>
				<input v-model="form.credit_amount" class="w-full rounded-md py-2.5 px-4 outline-none border" type="number">
			</div>
			<div>
				<label class="text-gray-700">Narration for this credit</label>
				<textarea v-model="form.credit_narration" class="w-full rounded-md py-2.5 px-4 resize-none outline-none border" rows="4" cols="4" />
			</div>
			<div>
				<label>Which employees do you want to give this credit to?</label>
				<div class="flex items-center gap-x-6">
					<label for="select_from_dropdown">
						<input id="select_from_dropdown" v-model="employeeCreditOption" value="select_from_dropdown" type="radio">
						Select from drop down
					</label>
					<label for="csvupload">
						<input id="csvupload" v-model="employeeCreditOption" type="radio" value="csv_upload">
						Select from csv document
					</label>
				</div>
			</div>
			<div v-if="employeeCreditOption === 'select_from_dropdown'">
				<InputMultiSelectUsers v-model="form.selected_employee" />
			</div>
			<div v-if="employeeCreditOption === 'csv_upload'">
				<h1>
					Upload a csv file with the email addresses of the staff. <button class="font-medium text-blue-600" :disabled="downloading" @click.prevent="downloadCsv">
						{{ downloading ? 'downloading..' : 'Download' }} csv template
					</button>
				</h1>
				<div>
					<ModulesUsersBatchBookingCsvFileUploadInput @emails="handleUploadedEmails" />
				</div>
			</div>
			<div>
				<label>
					<label>
						<input v-model="is_schedule_later_application" type="checkbox">
						Schedule to apply later</label>
				</label>
			</div>
			<div v-if="is_schedule_later_application" class="">
				<label for="startDate">Choose Date</label>
				<InputTimeInput v-model="form.application_date" format="YYYY-MM-DD hh:mm A" date-type="datetime" class="font-light" placeholder="select date" />
			</div>
			<div>
				<label>
					<label>
						<input type="checkbox">
						Clear previous balance</label>
				</label>
			</div>
			<button class="text-white bg-black rounded-md py-3 px-6">
				Fund Credit Wallet
			</button>
		</form>
	</main>
</template>

<script setup lang="ts">
import useCsvDownload from '@/composables/core/useCsvDownload'
import { useConvertDate } from '@/composables/core/useDateConverter'
const { convertDateFormat } = useConvertDate()
const { downloadCsv, downloading, templateName } = useCsvDownload()
templateName.value = 'users.csv'
definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})

const is_schedule_later_application = ref(false)

const form = reactive({
	selected_employee: [] as any,
	application_date: '',
	credit_amount: '',
	credit_narration: '',
	uploadedUsers: [] as any
})

const employeeCreditOption = ref('select_from_dropdown')
const selectedUser = ref()
const handleUploadedEmails = (item: any) => {
	const result = item.filter((itm: any) => itm !== '')
	form.uploadedUsers = result
}

const submitForm = () => {
	const payload = {
    narration: form.credit_narration,
    amount: form.credit_amount,
    increment_credit_wallet: 0,
    is_topup: true,
    selected_employee: form.uploadedUsers,
    scheduled: is_schedule_later_application.value,
	scheduled_for: convertDateFormat(form.application_date),
    only_selected_staff: form.selected_employee || null
}
}
</script>

<style>

</style>
