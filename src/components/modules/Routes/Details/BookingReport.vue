<template>
	<div class="rounded-md bg-white shadow-md">
		<div class="flex justify-between items-center border-b py-3 px-6">
			<div>
				<p class="text-sm font-bold">
					Reports
				</p>
			</div>
			<div class="flex items-center">
				<img src="@/assets/icons/source/download.svg" class="h-4 w-4" alt="download icon">
				<ButtonIconDropdown class="" button-text="Download" :children="dropdownChildren" :data="selectedRoute" class-name="w-56" />
			</div>
		</div>
		<form class="p-6 space-y-6" @submit.prevent="proceedToGenerate">
			<p class="font-medium text-sm">
				Business Booking Report
			</p>
			<div class="">
				<CompanySelector v-model="corporate" class="w-full" />
			</div>
			<div>
				<label for="month" class="text-xs">Month</label>
				<select id="month" v-model="selectedMonth" class="input-field" required>
					<option value="" class="text-sm">
						Select Month
					</option>
					<option v-for="item in monthsArray" :key="item.value" :value="item.value">
						{{ item.name }}
					</option>
				</select>
			</div>
			<button :disabled="!isFormEmpty" type="submit" class="bg-black text-white px-3 py-2 text-xs rounded-md">
				<span v-if="!processing" class="flex justify-center items-center gap-2.5">
					Generate
				</span>
				<Spinner v-else />
			</button>
		</form>
	</div>
</template>

<script lang="ts" setup>
import { useCompaniesModal } from '@/composables/core/modals'
import { useExportCorporateRouteManifest } from '@/composables/modules/corporates/exportManifest'
import { useRouteIdDetails, useRoutePaymentOptionsById, useTripStartTimeById, useRoutePassengersById, useRouteDriversById } from '@/composables/modules/routes/id'
import { useGenerateBusinessBookingReport } from '@/composables/modules/corporates/generateCorporateReport'
import { useWeekBounds } from '@/composables/core/useWeekBounds'
import { useMonthBounds } from '@/composables/core/useMonthBound'
import { useDownloadBookingReport } from '@/composables/modules/routes/generateReport'
const { manifestExportType } = useExportCorporateRouteManifest()
const { processing: downloading, setPayload, downloadBookingReport } = useDownloadBookingReport()
const { processing, generateBusinessBookingReport, setRequestPayload } = useGenerateBusinessBookingReport()
const { selectedRoute, loading, getRouteById } = useRouteIdDetails()
const { firstDayOfWeek, lastDayOfWeek } = useWeekBounds()
const { firstDayOfMonth, lastDayOfMonth } = useMonthBounds()
const dropdownChildren = computed(() => [
	{ name: 'This Week', func: (data) => handleWeeklyReportDownload() },
	{ name: 'This Month', func: (data) => handleMonthlyReportDownload() },
	{ name: 'Custom', func: (data) => handleCustomReportExport() }
])
const proceedToGenerate = () => {
	const payload = {
		corporateId: corporate.value.id,
		monthId: selectedMonth.value
	}
	setRequestPayload(payload)
	generateBusinessBookingReport()
}

const isFormEmpty = computed(() => {
    return !!(corporate.value.id && selectedMonth.value)
})

const corporate = ref('') as any

const selectedMonth = ref('')

const monthsArray = ref([
	{ name: 'Jan', value: 1 },
	{ name: 'Feb', value: 2 },
	{ name: 'Mar', value: 3 },
	{ name: 'Apr', value: 4 },
	{ name: 'May', value: 5 },
	{ name: 'Jun', value: 6 },
	{ name: 'Jul', value: 7 },
	{ name: 'Aug', value: 8 },
	{ name: 'Sep', value: 9 },
	{ name: 'Oct', value: 10 },
	{ name: 'Nov', value: 11 },
	{ name: 'Dec', value: 12 }
])

const handleWeeklyReportDownload = () => {
	const payload = {
		start_date: firstDayOfWeek,
		routeId: useRoute().params.id,
		end_date: lastDayOfWeek
	}
	setPayload(payload)
	downloadBookingReport()
}

const handleMonthlyReportDownload = () => {
	const payload = {
		start_date: firstDayOfMonth,
		routeId: useRoute().params.id,
		end_date: lastDayOfMonth
	}
	setPayload(payload)
	downloadBookingReport()
}

const handleCustomReportExport = () => {
	manifestExportType.value = 'businessRoutes'
	useCompaniesModal().openCorporateManifestExport()
}

</script>
