<template>
	<main class="card space-y-6 lg:w-6/12">
		<h1 class="font-bold">
			Fund Credit Wallet For Select Staff
		</h1>
		<form class="space-y-6" @submit.prevent="submitForm">
			<div>
				<label class="text-gray-700">How much credit do you want to apply?</label>
				<input v-model="form.credit_amount" required class="w-full rounded-md py-2.5 px-4 bg-gray-50 outline-none border" type="number">
			</div>
			<div>
				<label class="text-gray-700">Narration for this credit</label>
				<textarea v-model="form.credit_narration" required class="w-full rounded-md bg-gray-50 py-2.5 px-4 resize-none outline-none border" rows="4" cols="4" />
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
				<InputMultiSelectCorporateUsers v-model="form.selected_employee" :multiple="false" :corporate-id="($route.params.id as string)" />
			</div>
			<div v-if="employeeCreditOption === 'csv_upload'">
				<h1>
					Upload a csv file with the email addresses of the staff. <button class="font-medium text-blue-600" :disabled="downloading" @click.prevent="downloadCsv">
						{{ downloading ? 'downloading..' : 'Download' }} csv template
					</button>
				</h1>
				<div>
					<ModulesUsersBatchBookingCsvFileUploadInput @emails="handleUploadedEmails" @on-file-selected="handleEvent" />
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
			<div class="flex items-center gap-2">
				<input id="clear_prev_bal" v-model="form.clear_prev_bal" type="checkbox">
				<label for="clear_prev_bal" class="m-0">Clear previous balance</label>
			</div>
			<button :disabled="!isButtonEnabled || loading" type="submit" class="text-white bg-black rounded-md py-3 px-6 disabled:opacity-25 disabled:cursor-not-allowed min-w-[100px]">
				<span v-if="!loading" class="flex justify-center items-center gap-2.5">
					Fund Credit Wallet
				</span>
				<Spinner v-else />
			</button>
		</form>
	</main>
</template>

<script setup lang="ts">
import useCsvDownload from '@/composables/core/useCsvDownload'
import { useConvertDate } from '@/composables/core/useDateConverter'
import { useGetCreditSystem } from '@/composables/modules/corporates/creditLine'
import { useBatchScheduleCreditSystem } from '@/composables/modules/corporates/creditLineExecutions'
const { populateBatchCreditSystemScheduleForm, loading, scheduleBatchCreditSystem } = useBatchScheduleCreditSystem()
const { convertDateFormat } = useConvertDate()
const { creditSystem, getCorporatesCreditSystem } = useGetCreditSystem()
const { downloadCsv, downloading, templateName } = useCsvDownload()
templateName.value = 'users.csv'
definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})
onMounted(() => {
	getCorporatesCreditSystem()
})

const is_schedule_later_application = ref(false)

const form = reactive({
	selected_employee: [],
	application_date: '',
	credit_amount: '',
	credit_narration: '',
	uploadedUsers: [],
	clear_prev_bal: false
})

const isButtonEnabled = computed(() => {
    return !!(form.credit_amount && form.credit_narration)
})

const employeeCreditOption = ref('select_from_dropdown')
const selectedUser = ref()
const selectedFile = ref(null as any)

const handleEvent = (event:Record<string, any>) => {
	const file = event.target.files[0]
	selectedFile.value = file
}

const submitForm = () => {
	const staffArray = [] as any
	staffArray.push(form.selected_employee?.id)
	const payload:Record<string, any> = {
		narration: form.credit_narration,
		amount: form.credit_amount,
		increment_credit_wallet: Number(!form.clear_prev_bal),
		is_topup: true,
		selected_employee: null,
		scheduled: is_schedule_later_application.value
	}
	if (is_schedule_later_application.value) {
		payload.scheduled_for = form.application_date
	}
	if (employeeCreditOption.value === 'csv_upload') {
		payload.selected_employee = selectedFile.value
	} else {
		payload.only_selected_staff = staffArray || null
	}
	populateBatchCreditSystemScheduleForm(payload)
	scheduleBatchCreditSystem(creditSystem.value.id)
}
</script>
