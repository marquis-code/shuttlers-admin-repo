<template>
	<div class="lg:flex justify-between space-y-10 lg:space-y-0u">
		<div class="lg:w-6/12 space-y-10 rounded-lg bg-white p-6 border">
			<div class="space-y-2">
				<h1 class="text-lg font-medium text-gray-900">
					Staff settings
				</h1>
				<p class="text-sm font-medium text-gray-600">
					Corporates should be able to configure different settings for their staff.
				</p>
			</div>

			<div class="space-y-2">
				<h1 class="text-lg font-medium text-gray-900">
					Staff profile update link
				</h1>
				<p class="text-sm font-medium text-gray-600">
					Share this link to your staff whenever you need them to update their profiles
				</p>
				<div class="flex items-center relative">
					<div class="w-full">
						<input :value="inviteUrl" readonly class="input-field">
					</div>
					<button class="text-shuttlersGreen absolute right-4 top-3 font-bold" @click="copyUrl">
						Copy Link
					</button>
				</div>
			</div>
			<div class="flex justify-between items-center">
				<div>
					<h1 class="text-lg font-medium text-gray-900">
						Staff fields configuration
					</h1>
					<p class="text-sm font-medium text-gray-600 pr-10">
						Configure fields that should be made compulsory or visible during the staff onboarding process
					</p>
				</div>
				<div v-if="isUpdate" class="flex items-center gap-x-3">
					<button class="bg-black text-xs text-white px-3 py-2 rounded-md" @click="isUpdate = false">
						Cancel
					</button>
					<button class="text-xs text-white px-3 py-2 rounded-md bg-shuttlersGreen" @click="updateStaffConfig">
						Proceed
					</button>
				</div>
				<button v-else class="bg-black text-white text-xs px-3 py-2 rounded-md" @click="isUpdate = true">
					Update
				</button>
			</div>
			<div class="relative">
				<ModulesCorporatesStaffFieldsConfigurationTable :corporate-settings="corporateSettings.staff_details_config"
					:loading="loadingCorporateSettings" class="p-6" />
				<div v-if="isUpdate === false"
					class="inset-0 absolute bg-black/10 blur-sm backdrop-brightness-75 cursor-not-allowed rounded-md" />
			</div>
			<div class="flex justify-between items-center">
				<div>
					<h1 class="text-lg font-medium text-gray-900">
						Company domain
					</h1>
					<p class="text-sm font-medium text-gray-600">
						Add any user that joins with the company domain
					</p>
				</div>

				<div>
					<label for="enable_staff_addition_by_domain"
						class="relative h-8 w-14 cursor-pointer [-webkit-tap-highlight-color:_transparent]">
						<input id="enable_staff_addition_by_domain" v-model="computedStaffAdditionForm.enable_staff_addition_by_domain"
							type="checkbox" class="peer sr-only"
							@change="handleDomainOptionChange">

						<span class="absolute inset-0 rounded-full bg-gray-300 transition peer-checked:bg-shuttlersGreen" />

						<span
							class="absolute inset-y-0 start-0 m-1 h-6 w-6 rounded-full bg-white transition-all peer-checked:start-6" />
					</label>
				</div>
			</div>
			<div class="flex justify-between items-center ">
				<div>
					<h1 class="text-lg font-medium text-gray-900">
						Your staff can see routes that are not assigned to your company
					</h1>
					<p class="text-sm font-medium text-gray-600 pr-6">
						Staffs will only see routes that are assigned to your company when they use the shuttlers mobile and
						web apps.
					</p>
				</div>
				<div>
					<label for="prevent_staff_view_of_public_routes"
						class="relative h-8 w-14 cursor-pointer [-webkit-tap-highlight-color:_transparent]">
						<input id="prevent_staff_view_of_public_routes" v-model="computedPrivateRouteVisibilityForm.prevent_staff_view_of_public_routes"
							type="checkbox" class="peer sr-only"
							@change="handleVisibilityOptionChange">

						<span class="absolute inset-0 rounded-full bg-gray-300 transition peer-checked:bg-shuttlersGreen" />

						<span
							class="absolute inset-y-0 start-0 m-1 h-6 w-6 rounded-full bg-white transition-all peer-checked:start-6" />
					</label>
				</div>
			</div>
		</div>
		<div>
			<button class="bg-black text-white text-sm px-3 py-3 rounded-md">
				Reset to default
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useUpdateStaffAdditionByDomainStatus } from '@/composables/modules/corporates/toggleStaffAddition'
import { useCorporateSetting } from '@/composables/modules/corporates/id'
import { useAlert } from '@/composables/core/notification'
const { corporateSettings, loading: loadingCorporateSettings, getCorporateSettings } = useCorporateSetting()
const { updateStaffAdditionStatus, loading, populateDomainForm, populateRouteVisibilityForm } = useUpdateStaffAdditionByDomainStatus()
getCorporateSettings()
definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})
const url = ref(`https://business.shuttlers.africa/business/invitation?corporate_id=${useRoute().params.id}&mode=update`)
const inviteUrl = computed(() => {
	return `${url.value.slice(0, 60)}...`
})
const copyUrl = async () => {
	try {
		if (navigator.clipboard) {
			await navigator.clipboard.writeText(url.value)
		} else {
			const el = document.createElement('input')
			el.value = url.value
			el.style.opacity = String(0)
			document.body.appendChild(el)
			el.select()
			document.execCommand('copy')
			document.body.removeChild(el)
		}
		useAlert().openAlert({ type: 'Alert', msg: 'Copied to clipboard!' })
	} catch (e) {
		(e)
	}
}

const computedStaffAdditionForm = computed(() => {
	return {
		enable_staff_addition_by_domain: corporateSettings.value.enable_staff_addition_by_domain
	}
})

const computedPrivateRouteVisibilityForm = computed(() => {
	return {
		prevent_staff_view_of_public_routes: corporateSettings.value.prevent_staff_view_of_public_routes
	}
})

const handleDomainOptionChange = () => {
	populateDomainForm(computedStaffAdditionForm.value)
	updateStaffAdditionStatus('domain-addition')
}

const handleVisibilityOptionChange = () => {
	populateRouteVisibilityForm(computedPrivateRouteVisibilityForm.value)
	updateStaffAdditionStatus('route-visibility')
}

const isUpdate = ref(false)
const updateStaffConfig = () => {
	useAlert().openAlert({
		type: 'SUCCESS',
		msg: 'Staff config successfully updated'
	})
	isUpdate.value = false
}
</script>

<style scoped></style>
