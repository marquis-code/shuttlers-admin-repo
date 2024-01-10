<template>
	<Modal
		modal="$atts.modal"
		title="Route Availability Configuration"
		:no-close-btn="false"
		class="text-center"
	>
		<form
			class="flex flex-col gap-6"
			@submit.prevent="configureRouteAvailability"
		>
			<div v-if="activeStep === 'config'" class="space-y-6">
				<div>
					<label>Route Visibility</label>
					<div class="flex items-center gap-x-4">
						<div class="flex items-center gap-x-2">
							<input
								id="public"
								v-model="selectedRouteVisibility"
								value="public"
								name="public"
								type="radio"
							>
							<label for="public" class="mt-2">Public</label>
						</div>
						<div class="flex items-center gap-x-2">
							<input
								id="private"
								v-model="selectedRouteVisibility"
								value="private"
								name="private"
								type="radio"
							>
							<label for="private" class="mt-2">Private</label>
						</div>
					</div>
				</div>
				<div v-if="selectedRouteVisibility === 'private'">
					<CompanySelector v-model="form.corporate" class="w-full" />
					<p v-if="!form.corporate" class="text-rose-600 text-sm font-medium">
						You need to select a company
					</p>
				</div>
				<div>
					<label>Route Type</label>
					<div class="flex items-center gap-x-4">
						<div class="flex items-center gap-x-2">
							<input
								id="shared"
								v-model="form.isShared"
								:disabled="selectedRouteVisibility === 'public'"
								value="shared"
								name="shared"
								type="checkbox"
								@change="updateSelection"
							>
							<label for="shared" class="mt-2">Shared</label>
						</div>
						<div
							v-if="selectedRouteVisibility === 'private'"
							class="flex items-center gap-x-2"
						>
							<input
								id="exclusive"
								v-model="form.isExclusive"
								value="exclusive"
								name="exclusive"
								type="checkbox"
								@change="updateSelection"
							>
							<label for="exclusive" class="mt-2">Exclusive</label>
						</div>
					</div>
				</div>
				<div>
					<label>Route selection</label>
					<div class="flex items-center gap-x-4">
						<div class="flex items-center gap-x-2">
							<input
								id="all"
								v-model="selectedRouteSelection"
								value="all"
								name="all"
								type="radio"
							>
							<label for="all" class="mt-2">All</label>
						</div>
						<div class="flex items-center gap-x-2">
							<input
								id="selected"
								v-model="selectedRouteSelection"
								value="selected"
								name="selected"
								type="radio"
							>
							<label for="selected" class="mt-2">Selected</label>
						</div>
					</div>
				</div>
				<div v-if="selectedRouteSelection === 'selected'" class="field relative">
					<RouteSelector
						class="w-full"
						:multiple="true"
						@selected="handleSelectedRoute"
					/>
				</div>
				<div class="w-full space-y-4">
					<div class="grid grid-cols-3 gap-4">
						<div
							v-for="(itm, idx) in form.selectedUnavailableDays"
							:key="idx"
							class="text-xs rounded-md bg-gray-300 text-gray-900 flex items-center py-2.5 gap-x-3 px-2"
						>
							{{ itm }}
							<div class="cursor-pointer" @click="removeDate(itm)">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="10"
									height="10"
									viewBox="0 0 24 24"
									fill="none"
									stroke="#000000"
									stroke-width="2.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<line x1="18" y1="6" x2="6" y2="18" />
									<line x1="6" y1="6" x2="18" y2="18" />
								</svg>
							</div>
						</div>
					</div>
					<div>
						<label>Unavailability period</label>
						<InputDateInput
							id="startDate"
							class="font-light"
							placeholder="Filter by date"
							@update:model-value="handleSelectedDate"
						/>
					</div>
				</div>
				<div class="w-full">
					<label>Reason</label>
					<textarea
						v-model="form.reason"
						class="w-full p-3 resize-none border outline-none rounded-md"
						rows="3"
						cols="3"
					/>
				</div>
				<div class="flex w-full">
					<button type="button"
						class="flex justify-center items-center rounded-md gap-2.5 w-full py-3 bg-black text-white"
						@click="activeStep = 'confirmation'"
					>
						Proceed
					</button>
				</div>
			</div>
			<div v-if="activeStep === 'confirmation'" class="space-y-6">
				<div class="flex items-center gap-x-3 bg-indigo-300 rounded-2xl py-3 px-6">
					<img src="@/assets/icons/source/caution.svg" class="h-6 w-6" alt="">
					<p class="text-white text-sm">
						Are you sure you want to save this changes ?
					</p>
				</div>
				<p class="text-sm text-gray-700">
					Are you sure you want to make the selected routes unavailable? if this action was not agreed upon by the necessary stakeholders, it is advised that you abort as penalties may be attached to unauthorized actions.
				</p>
				<div class="field relative">
					<label for="confirmation_password">Password</label>
					<input id="confirmation_password" v-model="form.verification_password" type="password" class="input-field">
				</div>
				<div class="flex justify-between items-center gap-x-6">
					<button type="submit" class="btn-primary w-full">
						<span v-if="!processing" class="flex justify-center text-sm items-center gap-2.5">
							Proceed
						</span>
						<Spinner v-else />
					</button>
					<button class="rounded-md py-3 bg-gray-500 text-white w-full" @click="activeStep = 'config'">
						Go back
					</button>
				</div>
			</div>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useSetAvailability } from '@/composables/modules/routes/setAvailabilityConfiguration'
import { useAlert } from '@/composables/core/notification'
import { useGetCorporateList } from '@/composables/modules/corporates/fetch'
const {
  getCorporatesList,
  loading: loadingCorporateList,
  corporatesList,
  page_size: corporate_page_size
} = useGetCorporateList()
const { processing, setAvailabilityPayload, setRouteAvailabilityConfig } =
  useSetAvailability()
const selectedRouteVisibility = ref('public')
const selectedRouteSelection = ref('all')
const activeStep = ref('config')
const form = reactive({
  selectedUnavailableDays: [],
  verification_password: '',
  corporate: {},
  reason: '',
  isShared: true,
  isExclusive: false,
  selectedCheckboxes: [],
  selectedRoutesArray: []
})

const handleSelectedDate = (val: string) => {
  if (!val) return
  if (form.selectedUnavailableDays.includes(val)) {
    useAlert().openAlert({
      type: 'ERROR',
      msg: `${val} has already been selected`
    })
    return
  }
  form.selectedUnavailableDays.push(val)
}

const removeDate = (val: string) => {
  form.selectedUnavailableDays = form.selectedUnavailableDays.filter(
    (itm) => itm !== val
  )
}

const computed_route_type = computed(() => {
	return form.isShared && !form.isExclusive
        ? 'shared'
        : form.isExclusive && !form.isShared
        ? 'exclusive'
        : (form.isExclusive === true && form.isShared === true)
        ? 'all'
        : ''
})

const configureRouteAvailability = () => {
  const requestPayload = {
    cancel_user_bookings: false,
    dates: form.selectedUnavailableDays,
    reason: form.reason,
    route_type: computed_route_type.value,
    route_visibility: selectedRouteVisibility.value,
    staff_password: form.verification_password
  }
  const payload = { ...requestPayload }
  if (form.selectedRoutesArray.length) {
    payload.route_ids = form.selectedRoutesArray
  }
  if (Object.keys(form.corporate).length) {
    payload.corporate_ids = [form.corporate.id]
  }

  setAvailabilityPayload(payload)
  setRouteAvailabilityConfig()
}
const handleSelectedRoute = (val) => {
  form.selectedRoutesArray = val.map((item) => item.id)
}

const updateSelection = () => {
  form.selectedCheckboxes = []
  if (form.isShared) {
    form.selectedCheckboxes.push('shared')
  }
  if (form.isExclusive) {
    form.selectedCheckboxes.push('exclusive')
  }
}
</script>
