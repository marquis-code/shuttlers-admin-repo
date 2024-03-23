<template>
	<div class="w-full">
		<ButtonGoBack url="/companies" class="mb-6" />
		<div v-if="loading">
			<div class="p-4 text-center center">
				<span class="fe fe-spinner">Loading..</span>
			</div>
		</div>
		<div v-else class="flex flex-col overflow-hidden bg-white border rounded-lg">
			<div class="p-[16px] border_b">
				<div class="flex justify-between gap-4 md:flex-row md:items-center">
					<div class="flex-grow max-w-[600px]">
						<div class="text-lg font-medium leading-7 text-gray-900 ">
							Corporate Pay Configuration
						</div>
						<div class="text-sm font-normal leading-tight text-gray-500 ">
							Corporates should be able to configure different settings for their customers to restrict usage
							of Company Wallet.
						</div>
					</div>
					<button class="flex-shrink-0 btn" @click="saveChanges">
						Save Changes
					</button>
				</div>
			</div>
			<div class="overflow-auto p-[16px]">
				<div class="w-full px-[32px] flex-col justify-start items-start gap-6 inline-flex divide-y">
					<div class="self-stretch justify-start items-start gap-8 inline-flex pt-[16px]">
						<div class="w-[380px] flex-col justify-start items-start inline-flex">
							<div class="self-stretch text-sm font-medium leading-tight text-slate-700">
								Wallet Options
							</div>
							<div class="self-stretch text-sm font-normal leading-tight text-gray-500">
								Configure how your staff
								wallet behave
							</div>
						</div>
						<div class="inline-flex flex-col items-start justify-start w-full gap-3">
							<div :class="{
									'bg-emerald-400 border-green-600 bg-opacity-10': !book_on_public_routes,
									'bg-white border-gray-200 ': book_on_public_routes,
								}" class="inline-flex items-start self-stretch justify-start gap-1 p-4 border rounded-lg cursor-pointer"
								@click.prevent="toggleBookOnPublicRoutes">
								<div class="flex items-start justify-start h-5 gap-4 grow shrink basis-0">
									<div class="inline-flex flex-col items-start justify-start grow shrink basis-0">
										<div :class="{ 'text-zinc-950': !book_on_public_routes, 'text-slate-700': book_on_public_routes }"
											class="self-stretch text-sm font-normal leading-tight">
											Restrict booking
											on public routes with company wallet
										</div>
									</div>
								</div>
								<div v-if="!book_on_public_routes"
									class="w-4 h-4 p-[3px] bg-green-600 rounded-lg border border-green-600 justify-center items-center flex">
									<div class="w-2.5 h-2.5 relative flex-col justify-start items-start flex">
										<span class="text-white tiny-text">&check;</span>
									</div>
								</div>
								<div v-else class="relative w-4 h-4 bg-white border border-gray-300 rounded-lg">
									<span class="text-white tiny-text">&check;</span>
								</div>
							</div>
							<div :class="{
									'bg-emerald-400 border-green-600 bg-opacity-10': !book_on_corporate_routes,
									'bg-white border-gray-200 ': book_on_corporate_routes,
								}" class="inline-flex items-start self-stretch justify-start gap-1 p-4 border rounded-lg cursor-pointer"
								@click.prevent="toggleBookOnCorporateRoutes">
								<div class="flex items-start justify-start h-5 gap-4 grow shrink basis-0">
									<div class="inline-flex flex-col items-start justify-start grow shrink basis-0">
										<div :class="{ 'text-zinc-950': !book_on_public_routes, 'text-slate-700': book_on_public_routes }"
											class="self-stretch text-sm font-normal leading-tight">
											Restrict booking
											on private routes with company wallet
										</div>
									</div>
								</div>
								<div v-if="!book_on_corporate_routes"
									class="w-4 h-4 p-[3px] bg-green-600 rounded-lg border border-green-600 justify-center items-center flex">
									<div class="w-2.5 h-2.5 relative flex-col justify-start items-start flex">
										<span class="text-white tiny-text">&check;</span>
									</div>
								</div>
								<div v-else class="relative w-4 h-4 bg-white border border-gray-300 rounded-lg">
									<span class="text-white tiny-text">&check;</span>
								</div>
							</div>
						</div>
					</div>
					<div class="inline-flex items-start self-stretch justify-start gap-8 pt-5">
						<div class="w-[380px] flex-col justify-start items-start inline-flex">
							<div class="self-stretch text-sm font-medium leading-tight text-slate-700">
								Limit Configuration
							</div>
							<div class="self-stretch text-sm font-normal leading-tight text-gray-500">
								This settings will allow
								corporate or Shuttlers Admin Configure a limit/Period.
							</div>
						</div>
						<div class="w-full flex-col justify-start items-start gap-3 inline-flex">
							<ModulesCorporatesCorporatePayConfigComp type="amount"
								:active="default_corporate_payment_limit.limit_type.value == 'amount'"
								:book_or_amount_limit="defaultLimitValueForAmount"
								:select_period="defaultLimitValueUnitForAmount" :show_example="false"
								@clicked="setDefaultCorporatePaymentLimitType('amount')"
								@update:book_or_amount_limit="(val) => defaultLimitValueForAmount = val"
								@update:select_period="(val) => defaultLimitValueUnitForAmount = val" />
							<ModulesCorporatesCorporatePayConfigComp type="trip"
								:active="default_corporate_payment_limit.limit_type.value == 'trip'"
								:book_or_amount_limit="defaultLimitValueForTrip"
								:select_period="defaultLimitValueUnitForTrip" :show_example="false"
								@clicked="setDefaultCorporatePaymentLimitType('trip')"
								@update:book_or_amount_limit="(val) => defaultLimitValueForTrip = val"
								@update:select_period="(val) => defaultLimitValueUnitForTrip = val" />
						</div>
					</div>

					<div class="flex items-center justify-between gap-4 w-full my-4">
						<div class="flex flex-col gap-1">
							<p class="text-[#09090F] text-lg font-medium">
								Show staffs their limit usage
							</p>
							<p class="text-sm text-[#737876]">
								Do you want the staffs of this company to see their limit usage?
							</p>
						</div>
						<!-- <VueToggles width="50" checked-bg="#15CD70"
							:value="corporatePaySettings.staff_can_view_wallet_limit_usage.value"
							@click="toggleStaffsAbilityToViewCorporatePayUsage" /> -->
						<label
							for="AcceptConditions"
							class="relative h-8 w-14 cursor-pointer [-webkit-tap-highlight-color:_transparent]"
						>
							<input id="AcceptConditions" :value="corporatePaySettings.staff_can_view_wallet_limit_usage.value"
								type="checkbox" class="peer sr-only" @change="toggleStaffsAbilityToViewCorporatePayUsage">

							<span
								class="absolute inset-0 rounded-full bg-gray-300 transition peer-checked:bg-shuttlersGreen"
							/>

							<span
								class="absolute inset-y-0 start-0 m-1 h-6 w-6 rounded-full bg-white transition-all peer-checked:start-6"
							/>
						</label>
					</div>

					<!-- exemptions -->
					<div v-if="default_corporate_payment_limit.limit_value"
						class="self-stretch justify-start items-start gap-[32px] flex flex-col xl:flex-row pt-[20px]">
						<div class="w-full xl:max-w-[280px] flex flex-col justify-start items-start flex-shrink-0">
							<div class="self-stretch text-sm font-medium leading-tight text-slate-700">
								Exemptions
							</div>
							<div class="self-stretch text-sm font-normal leading-tight text-gray-500">
								This configuration will allow a company exempt some users or a group of users from the
								“Limit restrictions”.
							</div>
						</div>
						<section class="flex-grow flex flex-col gap-[12px] border rounded-lg p-[16px] w-full">
							<header class="flex items-center justify-between gap-[16px] w-full border_b pb-[8px]">
								<span>Create new exemption for your staff</span>
								<div class="flex items-center gap-4">
									<div v-if="isEditingExemption" class="flex items-center gap-4">
										<button class="btn border bg-transparent !text-white border-black rounded px-3 py-2"
											@click="() => { isEditingExemption = false; clear_exemption_obj() }">
											Cancel
										</button>
										<button class="py-2 btn"
											:disabled="!exemption_obj.subject_type.value || !exemption_obj.subject_ids.value"
											@click="updateExemptions()">
											Save
										</button>
									</div>

									<button v-else class="flex-shrink-0 btn" @click="isEditingExemption = true">
										Add exemption
									</button>
								</div>
							</header>
							<div v-if="isEditingExemption" class="flex flex-col gap-3">
								<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
									<div class="flex items-center gap-4">
										<label for="group" class="text-sm font-medium text-[#09090F]">Create exemption for
											groups in your company</label>
										<input id="group" v-model="exemption_obj.subject_type.value" type="radio"
											value="group">
									</div>
									<div class="flex items-center gap-4">
										<label for="user" class="text-sm font-medium text-[#09090F]">Create exemption for
											individual users in your company</label>
										<input id="user" v-model="exemption_obj.subject_type.value" type="radio"
											value="user">
									</div>
								</div>

								<div v-if="exemption_obj.subject_type.value === 'user'" class="max-w-[400px]">
									<!-- <v-select v-model="exemption_obj.subject_ids.value" :filterable="false"
										:options="filteredStaff" label="fname" placeholder="Select staff"
										:reduce="(option) => option.id" @search="searchUser">
										<template #option="option">
											{{ option.fname }} {{ option.lname }}
										</template>
										<template #selected-option="{ fname, lname }">
											<span> {{ fname }} {{ lname }}</span>
										</template>
									</v-select> -->
									<select v-model="exemption_obj.subject_ids.value" class="outline-none border border-gray-400 py-2.5 px-4 rounded-md w-full">
										<option value="" disabled>
											Please select
										</option>
										<option v-for="(option, idx) in filteredStaff" :key="idx" :value="option.id">
											{{ option.fname }} {{ option.lname }}
										</option>
									</select>
								</div>
								<div v-if="exemption_obj.subject_type.value === 'group'" class="max-w-[400px]">
									<!-- <v-select v-model="exemption_obj.subject_ids.value" :options="groups" label="name"
										placeholder="Select group" :reduce="(option) => option.id" /> -->
									<select v-model="exemption_obj.subject_ids.value" class="outline-none border border-gray-400 py-2.5 px-4 rounded-md w-full">
										<option value="" disabled>
											Please select
										</option>
										<option v-for="(option, idx) in groups" :key="idx" :value="option.id">
											{{ option.name }}
										</option>
									</select>
								</div>
								<div class="flex flex-col gap-2">
									<p class="text-xs font-bold text-gray7">
										Configuration
									</p>
									<ModulesCorporatesCorporatePayConfigComp type="amount" :active="exemption_obj.type.value == 'amount'"
										:book_or_amount_limit="exemption_obj.book_or_amount_limit.value"
										:select_period="exemption_obj.select_period.value" :show_example="true"
										@clicked="() => { exemption_obj.type.value = 'amount'; clearExemptLimitAndPeriod() }"
										@update:book_or_amount_limit="(val) => exemption_obj.book_or_amount_limit.value = val"
										@update:select_period="(val) => exemption_obj.select_period.value = val" />
									<ModulesCorporatesCorporatePayConfigComp type="trip" :active="exemption_obj.type.value == 'trip'"
										:book_or_amount_limit="exemption_obj.book_or_amount_limit.value"
										:select_period="exemption_obj.select_period.value" :show_example="true"
										@clicked="() => { exemption_obj.type.value = 'trip'; clearExemptLimitAndPeriod() }"
										@update:book_or_amount_limit="(val) => exemption_obj.book_or_amount_limit.value = val"
										@update:select_period="(val) => exemption_obj.select_period.value = val" />
								</div>
							</div>
							<div v-else class="flex flex-col gap-3">
								<span v-if="!exemptions.length" class="text-sm text-center">
									No exemption has been added yet
								</span>
								<div v-else class="w-full overflow-auto border rounded-lg">
									<table description="" class="w-full min-w-[600px]">
										<thead>
											<tr class="border-b">
												<th class="text-left font-medium text-xs text-[#667085] p-3 w-[50%]">
													Limitations
												</th>
												<th class="text-left font-medium text-xs text-[#667085] p-3 w-[30%]">
													Group or Users
												</th>
												<th class="text-left font-medium text-xs text-[#667085] p-3 w-[20]">
													action
												</th>
											</tr>
										</thead>
										<tbody>
											<tr v-for="n, index in exemptions" :key="index"
												:class="index % 2 !== 1 ? 'bg-[#F9FAFB]' : ''">
												<td class="px-3 py-4 text-xs text-left text-[#09090F]">
													{{ getExemptionLimitWriteUp(n) }}
												</td>
												<td class="px-3 py-4 text-xs text-left text-[#09090F]">
													<template v-if="n.subject_type === 'group' && computedGroup.length">
														{{ computedGroup.filter(el => el.id == n.subject_id)[0].name }}
													</template>
													<template v-else-if="n.subject_type === 'user' && computedStaff.length">
														{{ `${computedStaff.filter(el => el.id == n.subject_id)[0]?.fname}
																												${computedStaff.filter(el => el.id == n.subject_id)[0]?.lname}` }}
													</template>
													<span v-else>Loading</span>
												</td>
												<td class="px-3 py-4 text-xs text-left text-[#09090F]">
													<div class="flex items-center gap-3">
														<button class="bg-transparent border-none"
															@click="editExemption(n)">
															<img src="@/assets/icons/source/edit.svg" alt="">
														</button>
														<button class="bg-transparent border-none"
															@click="onDeleteExemption(n.id)">
															<img src="@/assets/icons/source/edit.svg" alt="">
														</button>
													</div>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</section>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useCorporateStaff } from '@/composables/modules/corporates/staff/fetch'
import { useCorporatePaySetting } from '@/composables/modules/corporates/corporatePay'
import { useCorporateIdDetails } from '@/composables/modules/corporates/id'
import { useGroup } from '@/composables/modules/corporates/corporateGroup'
import { useConfirmationModal } from '@/composables/core/confirmation'
const { selectedCorporate } = useCorporateIdDetails()
const { loading: loadingCorporateStaffs, staffs, getCorporateStaff } = useCorporateStaff()
const search = ref('')
const { groups, fetchGroup } = useGroup()
onMounted(() => {
	getCorporateStaff()
	fetchGroup(Number(selectedCorporate.value.id))
})

const {
	book_on_public_routes,
	book_on_corporate_routes,
	default_corporate_payment_limit,
	exemptions,
	corporatePaySettings,
	fetchCorporatePaySetting,
	saveCorporatePaySettings,
	loading,
	isEditingExemption, clear_exemption_obj, getExemptionLimitWriteUp, exemption_obj,
	editExemption, deleteExemption, updateExemptions, toggleStaffsAbilityToViewCorporatePayUsage
} = useCorporatePaySetting()

const defaultLimitValueForTrip = ref(default_corporate_payment_limit.limit_value.value || 0)
const defaultLimitValueUnitForTrip = ref(default_corporate_payment_limit.limit_value_unit.value || 'per_day')
const defaultLimitValueForAmount = ref(default_corporate_payment_limit.limit_value_unit.value || 0)
const defaultLimitValueUnitForAmount = ref(default_corporate_payment_limit.limit_value_unit.value || 'per_day')
// const defaultLimitValueUnitForShowingStaffsTheirCorporateUsage = ref(default_corporate_payment_limit.limit_value_unit.value || 'per_day')

watch(default_corporate_payment_limit.limit_value, () => {
	switch (default_corporate_payment_limit.limit_type.value) {
		case 'trip':
			defaultLimitValueForTrip.value = default_corporate_payment_limit.limit_value.value
			defaultLimitValueUnitForTrip.value = default_corporate_payment_limit.limit_value_unit.value
			break
		case 'amount':
			defaultLimitValueForAmount.value = default_corporate_payment_limit.limit_value.value
			defaultLimitValueUnitForAmount.value = default_corporate_payment_limit.limit_value_unit.value
			break
		default:
			break
	}
}, { immediate: true })

const clearExemptLimitAndPeriod = () => {
	exemption_obj.book_or_amount_limit.value = 0
	exemption_obj.select_period.value = ''
}

const saveChanges = () => {
	const limitType = default_corporate_payment_limit.limit_type.value || 'none'

	const changes = {
		book_on_public_routes: !!book_on_public_routes.value,
		book_on_corporate_routes: !!book_on_corporate_routes.value,
		staff_can_view_wallet_limit_usage: corporatePaySettings.staff_can_view_wallet_limit_usage.value
	}

	if (limitType === 'none') {
		changes.default_corporate_payment_limit = {
			id: default_corporate_payment_limit.id.value,
			limit_type: limitType,
			limit_value: 0,
			limit_value_unit: 'per_day'
		}
	} else {
		changes.default_corporate_payment_limit = {
			id: default_corporate_payment_limit.id.value,
			limit_type: limitType,
			limit_value: (limitType === 'trip') ? defaultLimitValueForTrip.value : defaultLimitValueForAmount.value,
			limit_value_unit: (limitType === 'trip') ? defaultLimitValueUnitForTrip.value : defaultLimitValueUnitForAmount.value
		}
	}

	useConfirmationModal().openAlert({
		title: 'Are you sure?',
		type: 'NORMAL',
		desc: 'You are about to save changes',
		loading,
		call_function: () => saveCorporatePaySettings(changes)
	})
}

const toggleBookOnCorporateRoutes = () => {
	book_on_corporate_routes.value = !book_on_corporate_routes.value
}

const toggleBookOnPublicRoutes = () => {
	book_on_public_routes.value = !book_on_public_routes.value
}

const setDefaultCorporatePaymentLimitType = (type) => {
	if (default_corporate_payment_limit.limit_type.value === type) {
		default_corporate_payment_limit.limit_type.value = 'none'
		default_corporate_payment_limit.limit_value_unit.value = 'none'
	} else {
		default_corporate_payment_limit.limit_type.value = type
	}
}

const onDeleteExemption = (id) => {
	useConfirmationModal().openAlert({
		title: 'Are you sure?',
		type: 'NORMAL',
		desc: 'You are about to delete an exemption',
		loading,
		call_function: () => deleteExemption(id)
	})
}

const filteredStaff = computed(() => {
	return staffs.value.filter((el) => `${el.fname}${el.lname}`.toLowerCase().includes(search.value.toLowerCase()))
})
const searchUser = (data) => {
	search.value = data
}

const computedGroup = computed(() => {
	return groups.value
})

const computedStaff = computed(() => {
	return staffs.value
})

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

fetchCorporatePaySetting()
isEditingExemption.value = false
</script>

<style scoped>
h3,
h2,
p,
h1 {
	margin: 0;
}

.border_b {
	border-bottom: 1px solid #E5E9F2
}

/* for the add or deduct controller that shows on input:number */
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}

/* Firefox */
input[type=number] {
	appearance: textfield;
}

.tiny-text {
	font-size: 8px;
}

.btn {
	outline: none;
	background: black;
	color: white;
	font-size: 14px;
	width: fit-content;
	height: fit-content;
	white-space: nowrap;
	padding: 8px;
	border-radius: 8px;
	&:disabled{
		cursor: not-allowed;
		opacity: 0.5;
	}
}
</style>
