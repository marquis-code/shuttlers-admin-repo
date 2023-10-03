<template>
	<div class="lg:flex lg:gap-x-10 justify-center items-start space-y-10 lg:space-y-0">
		<div class="w-8/12 space-y-10">
			<div v-if="!Object.keys(selectedPartner).length && !loading">
				No Partner Detail available
			</div>
			<div v-else-if="loading" class="flex justify-content-center align-items-center">
				<Skeleton height="500px" />
			</div>
			<div v-else class="bg-white rounded-md shadow-sm p-3">
				<div class="flex justify-between items-center py-2.5 border-b pb-2 px-3">
					<div class="font-medium">
						Partner Information
					</div>
					<div>
						<button class="font-medium rounded-lg text-indigo-500 border border-indigo-500 px-2 py-2.5">
							Payout configuration
						</button>
					</div>
				</div>
				<div v-for="(item, index) in partnerInformation" :key="index" class="flex justify-between items-center border-b py-4 px-3">
					<p class="text-gray-500 text-sm">
						{{ item?.name }}
					</p>
					<p class="text-sm" :class="item.class">
						{{ item?.value }}
					</p>
					<p v-if="item?.name === 'AVATAR'">
						<Avatar :name="selectedPartner?.fname" bg="#B1C2D9" />
					</p>
				</div>
			</div>

			<div class="bg-white rounded-md shadow-sm p-3">
				<div class="py-2.5 border-b pb-2 px-3">
					<div class="font-medium">
						KYC Information
					</div>
				</div>
				<div v-if="!Object.keys(partnersKycInformation).length && !loadingKycDetails">
					Partner KYC detail not found.
				</div>
				<div v-else-if="loadingKycDetails" class="flex justify-content-center align-items-center">
					<Skeleton height="200px" />
				</div>
				<div v-else>
					<div class="bg-gray-100 py-3 rounded-md text-sm font-light pl-4 my-3">
						IDENTITY
					</div>
					<div v-for="(item, index) in kycIdentityInformation" :key="index" class="flex justify-between items-center border-b py-4 px-3">
						<p class="text-gray-500 text-sm">
							{{ item.name }}
						</p>
						<p v-if="item.name === 'STATUS'" class="text-sm">
							<button class="bg-black text-white border px-2 py-1.5 rounded-md text-xs">
								Verify
							</button>
						</p>
						<p v-else class="text-sm">
							{{ item.value }}
						</p>
					</div>
					<div class="bg-gray-100 py-3 rounded-md text-sm font-light pl-4 my-3">
						ADDRESS
					</div>
					<div v-for="(item, index) in kycAddressInformation" :key="index" class="flex justify-between items-center border-b py-4 px-3">
						<p class="text-gray-500 text-sm">
							{{ item.name }}
						</p>
						<p v-if="item.name === 'STATUS'" class="text-sm">
							<button :class="item.class">
								update
							</button>
						</p>
						<p v-else class="text-sm">
							{{ item.value }}
						</p>
					</div>
				</div>
			</div>
		</div>
		<div class="w-4/12 space-y-10">
			<div class="border-b py-3 bg-white rounded-md shadow-sm">
				<div class="border-b pb-4">
					<p class="font-medium pl-6">
						Partner Earnings
					</p>
				</div>
				<div v-if="Object.keys(partnersEarningInformation).length && !loadingEarnings">
					<div class="px-6">
						<div class="flex justify-between gap-y-2 items-center border-b py-4">
							<p class="text-sm text-gray-500">
								Total no. of trips
							</p>
							<p class="text-gray-400 text-sm font-medium">
								{{ partnersEarningInformation?.unsettledEarnings?.tripsCount ?? 'N/A' }}
							</p>
						</div>

						<div class="flex justify-between gap-y-2 items-center border-b py-4">
							<p class="text-sm text-gray-500">
								Payout Period
							</p>
							<p class="text-gray-400 text-sm font-medium">
								Day N/A of every Month
							</p>
						</div>

						<div class="flex justify-between gap-y-2 items-center py-4">
							<p class="text-sm text-gray-500">
								Past Payouts
							</p>
							<p class="text-sm underline text-indigo-500 font-medium">
								View all
							</p>
						</div>
					</div>
				</div>
				<div v-if="!Object.keys(partnersEarningInformation).length && !loadingEarnings">
					Partner Earning Detail not available
				</div>
				<div v-else-if="loadingEarnings" class="flex justify-content-center align-items-center">
					<Skeleton height="100px" />
				</div>
			</div>
			<div class="px-6 border-b py-3 bg-white rounded-md shadow-sm">
				<div v-if="!Object.keys(selectedPartner).length && !loading">
					No Partner Assets Details available
				</div>
				<div v-else-if="loading" class="flex justify-content-center align-items-center">
					<Skeleton height="100px" />
				</div>
				<div v-else>
					<div v-for="(item, index) in partnerAssetStats" :key="index" class="flex justify-between gap-y-2 border-b py-4 items-center">
						<p class="text-gray-500 text-xs">
							{{ item.name }}
						</p>
						<p class="text-gray-400 text-xs">
							{{ item.value }}
						</p>
					</div>
				</div>
			</div>

			<div class="px-6 py-6 bg-white rounded-md shadow-sm space-y-3">
				<p class="text-sm text-gray-900">
					Default settlement account
				</p>
				<div v-if="partnersEarningInformation?.settlementAccount">
					<span class="block font-weight-bold"
					>{{
						partnersEarningInformation?.settlementAccount?.accountNumber
					}}
						-
						{{
							partnersEarningInformation?.settlementAccount?.bankName
						}}</span
					>
				</div>
				<div v-else-if="loadingEarnings" class="flex justify-content-center align-items-center">
					<Skeleton height="100px" />
				</div>
				<p v-else class="text-gray-500 text-sm">
					No settlement account available
				</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { convertToCurrency } from '@/composables/utils/formatter'
import { usePartnerIdDetails, useGetPartnerKyc, useGetPartnerEarningSummary } from '@/composables/modules/partners/id'
const { getPartnerById, loading, selectedPartner } = usePartnerIdDetails()
const { getPartnerKyc, loadingKycDetails, partnersKycInformation } = useGetPartnerKyc()
const { getPartnerEarning, loadingEarnings, partnersEarningInformation } = useGetPartnerEarningSummary()
const id = useRoute().params.id as string
const account_sid = useRoute().params.accountSid as string
getPartnerById(id)
getPartnerKyc(account_sid)
getPartnerEarning(account_sid)

const partnerInformation = computed(() => {
	if (!Object.keys(selectedPartner.value).length) return {}
	return [
		{ name: 'NAME', value: `${selectedPartner?.value?.owner?.fname} ${selectedPartner?.value?.owner?.lname}`, class: '' },
		{ name: 'PHONE NUMBER', value: selectedPartner?.value?.company_phone ?? 'N/A', class: '' },
		{ name: 'EMAIL ADDRESS', value: selectedPartner?.value?.company_email ?? 'N/A', class: '' },
		{ name: 'AVATAR', value: selectedPartner?.value?.fname, class: '' },
		{ name: 'COMPANY', value: selectedPartner?.value?.company_name ?? 'N/A', class: '' },
		{ name: 'DATE CREATED', value: selectedPartner?.value?.created_at ?? 'N/A', class: '' },
		{ name: 'STATUS', value: `${selectedPartner?.value?.owner?.fname} ${selectedPartner?.value?.owner?.lname}`, class: selectedPartner?.value?.active === 'active' ? 'text-green' : 'text-red' }
	]
})

const kycIdentityInformation = computed(() => {
	return [
		{ name: 'MEANS OF IDENTIFICATION', value: partnersKycInformation?.value?.identity?.document_type.toUpperCase() ?? 'N/A', class: '' },
		{ name: 'DOCUMENT NUMBER', value: partnersKycInformation?.value?.identity?.document_id ?? 'N/A', class: '' },
		{ name: 'DATE OF BIRTH', value: partnersKycInformation?.value?.identity?.dob ?? 'N/A', class: '' },
		{ name: 'STATUS', value: 'verify', class: 'bg-black text-white rounded-md px-2 py-1.5 text-xs' }
	]
})

const kycAddressInformation = computed(() => {
	return [
		{ name: 'ADDRESS', value: partnersKycInformation?.value?.address?.address, class: '' },
		{ name: 'DOCUMENT', value: 'view document', class: '' },
		{ name: 'STATUS', value: 'update', class: 'bg-black text-white rounded-md px-2 py-1.5 text-xs' }
	]
})

const partnerAssetStats = computed(() => {
	return [
		{ name: 'Total Number of vehicles', value: selectedPartner?.value?.stats?.allVehiclesCount ?? 'N/A', class: '' },
		{ name: 'Active Number of Vehicles', value: selectedPartner?.value?.stats?.activeVehiclesCount ?? 'N/A', class: '' },
		{ name: 'Total Number of Drivers', value: selectedPartner?.value?.stats?.allDriversCount ?? 'N/A', class: '' }
	]
})

definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})
</script>

<style scoped>

</style>
