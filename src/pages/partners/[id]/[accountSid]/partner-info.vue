<template>
	<main>
		<ButtonGoBack url="/partners" class="mb-6" />
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
							<Avatar :src="selectedPartner?.owner?.avatar" :name="selectedPartner?.owner?.fname" bg="#B1C2D9" />
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
						<div class="bg-gray-100 py-3 rounded-md text-sm px-4 flex items-center justify-between my-3">
							<p>IDENTITY</p>
							<button v-if="AdminCanUpdatePartnerKYC()" class="font-medium text-dark border border-dark px-2 py-1.5 rounded-md" @click="useUpdateKyc().openIdentity()">
								Update Identity
							</button>
						</div>
						<p v-if="!partnersKycInformation?.identity?.status" class="text-sm text-center py-2 text-grey6">
							Partner Identity information not submitted
						</p>
						<template v-else>
							<div v-for="(item, index) in kycIdentityInformation" :key="index" class="flex justify-between items-center border-b py-4 px-3">
								<p class="text-gray-500 text-sm">
									{{ item.name }}
								</p>
								<template v-if="item.name === 'STATUS'">
									<p v-if="partnersKycInformation?.identity?.status === 'completed'" class="text-sm font-medium text-green">
										Verified
									</p>
									<button v-else class="bg-black text-white border px-2 py-1.5 rounded-md text-xs"
										@click="initVerifyKyc(partnersKycInformation.identity, 'Identity')"
									>
										Verify
									</button>
								</template>
								<p v-else class="text-sm">
									{{ item.value }}
								</p>
							</div>
						</template>
						<div class="bg-gray-100 py-3 rounded-md text-sm font-light pl-4 my-3 flex items-center justify-between gap-4">
							<p>ADDRESS</p>
							<button v-if="AdminCanUpdatePartnerKYC()" class="font-medium text-dark border border-dark px-2 py-1.5 rounded-md" @click="useUpdateKyc().openAddress()">
								Update Address
							</button>
						</div>
						<p v-if="!partnersKycInformation?.address?.status" class="text-sm text-center py-2 text-grey6">
							Partner address information not submitted
						</p>
						<template v-else>
							<div v-for="(item, index) in kycAddressInformation" :key="index" class="flex justify-between items-center border-b py-4 px-3">
								<p class="text-gray-500 text-sm">
									{{ item.name }}
								</p>
								<template v-if="item.name === 'STATUS'">
									<p v-if="partnersKycInformation?.address?.status === 'completed'" class="text-sm font-medium text-green">
										Verified
									</p>
									<div v-else>
										<div v-if="verifingAddress" class="flex items-center gap-3">
											<select v-model="address_status" class="min-w-[100px] px-2 py-1 border rounded w-fit">
												<option value="failed">
													Failed
												</option>
												<option value="completed">
													Approve
												</option>
											</select>
											<button class="text-red text-sm p-2" @click="verifingAddress = false">
												Cancel
											</button>
											<button class="bg-dark text-sm text-light p-2 rounded"
												@click="initVerifyAddress(partnersKycInformation.address, address_status)"
											>
												Save
											</button>
										</div>
										<button v-else class="bg-black text-white border px-2 py-1.5 rounded-md text-xs" @click="verifingAddress = true">
											Update
										</button>
									</div>
								</template>
								<a v-else-if="item.name === 'DOCUMENT'" :href="partnersKycInformation?.address?.document_files![0]"
									target="_blank" class="text-blue-500 font-medium text-sm underline"
								>
									View document
								</a>
								<p v-else class="text-sm">
									{{ item.value }}
								</p>
							</div>
						</template>
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
						<div class="flex items-center justify-center py-4">
							<div class="flex flex-col gap-1 text-center">
								<h1 class="text-3xl font-bold text-dark">
									{{ convertToCurrency(partnersEarningInformation?.unsettledEarnings?.amount) || '₦0.00' }}
								</h1>
								<p class="text-sm text-grey6 font-medium">
									PARTNER EARNINGS
								</p>
							</div>
						</div>
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
								<NuxtLink :to="`/pastpayouts/${id}/${account_sid}`" class="text-sm underline text-indigo-500 font-medium">
									View all
								</NuxtLink>
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

				<div class="flex flex-col rounded-xl border">
					<div class="border-b p-4 py-2 flex items-center gap-4 justify-between">
						<p class="text-sm font-medium text-dark">
							Settlement details
						</p>
						<button class="btn border font-medium p-2" @click="initUpdateSettlementAccount(configs?.earningCycle || '')">
							Update Info
						</button>
					</div>
					<Skeleton v-if="loadingEarnings || loading || fetching_configs" height="100px" />
					<div v-else class="flex flex-col px-4">
						<div class="flex items-center gap-4 text-sm justify-between border-b py-4">
							<p class="uppercase text-grey5 whitespace-nowrap">
								Default Account
							</p>
							<div class="flex flex-col text-right">
								<p class="text-dark font-medium">
									{{ partnersEarningInformation?.settlementAccount?.accountNumber || 'N/A' }}
								</p>
								<p class="text-grey5 text-xs">
									{{ partnersEarningInformation?.settlementAccount?.bankName }} - {{ partnersEarningInformation?.settlementAccount?.accountName }}
								</p>
							</div>
						</div>
						<div class="flex items-center gap-4 text-sm justify-between py-4">
							<p class="uppercase text-grey5">
								Earning cycle
							</p>
							<p class="capitalize" :class="configs?.earningCycle === 'monthly' ? 'badge-blue' : 'badge-green'">
								{{ configs?.earningCycle }}
							</p>
						</div>
					</div>
				</div>

				<!-- <div class="px-6 py-6 bg-white rounded-xl shadow-sm space-y-3 border">
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
				</div> -->
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
import moment from 'moment'
import { convertToCurrency } from '@/composables/utils/formatter'
import { usePartnerIdDetails, useGetPartnerKyc, useGetPartnerEarningSummary, useVerifyPartnerKyc } from '@/composables/modules/partners/id'
import { useUpdateSettlementAccount, usePartnerConfigs, useUpdateKyc } from '@/composables/modules/partners'
import { usePartnerModal } from '@/composables/core/modals'
import { AdminCanUpdatePartnerKYC } from '@/composables/flagging/flags'

const { getPartnerById, loading, selectedPartner } = usePartnerIdDetails()
const { getPartnerKyc, loadingKycDetails, partnersKycInformation } = useGetPartnerKyc()
const { getPartnerEarning, loadingEarnings, partnersEarningInformation } = useGetPartnerEarningSummary()
const { initVerifyKyc, initVerifyAddress } = useVerifyPartnerKyc()
const { initUpdateSettlementAccount } = useUpdateSettlementAccount()
const { configs, getPartnerConfigs, loading: fetching_configs } = usePartnerConfigs()

const id = useRoute().params.id as string
const account_sid = useRoute().params.accountSid as string
const verifingAddress = ref(false)
const address_status = ref('failed')

const partnerInformation = computed(() => {
	if (!Object.keys(selectedPartner.value).length) return []
	return [
		{ name: 'NAME', value: `${selectedPartner?.value?.owner?.fname} ${selectedPartner?.value?.owner?.lname}`, class: '' },
		{ name: 'PHONE NUMBER', value: selectedPartner?.value?.owner?.phone ?? 'N/A', class: '' },
		{ name: 'EMAIL ADDRESS', value: selectedPartner?.value?.owner?.email ?? 'N/A', class: '' },
		{ name: 'AVATAR', value: selectedPartner?.value?.fname, class: '' },
		{ name: 'COMPANY', value: selectedPartner?.value?.company_name ?? 'N/A', class: '' },
		{ name: 'DATE CREATED', value: selectedPartner?.value?.created_at ?? 'N/A', class: '' },
		{ name: 'STATUS', value: selectedPartner?.value?.status === 'active' ? 'active' : 'suspended', class: selectedPartner?.value?.status === 'active' ? 'text-green' : 'text-red' }
	]
})

const kycIdentityInformation = computed(() => {
	return [
		{ name: 'MEANS OF IDENTIFICATION', value: partnersKycInformation?.value?.identity?.document_type.toUpperCase() ?? 'N/A', class: '' },
		{ name: 'DOCUMENT NUMBER', value: partnersKycInformation?.value?.identity?.document_id ?? 'N/A', class: '' },
		// { name: 'DATE OF BIRTH', value: selectedPartner.value?.owner?.dob ? moment(selectedPartner.value?.owner?.dob).format('LL') : 'N/A', class: '' },
		{ name: 'DATE OF BIRTH', value: partnersKycInformation?.value?.identity?.dob ? moment(partnersKycInformation?.value?.identity?.dob).format('LL') : 'N/A', class: '' },
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

getPartnerById(id)
getPartnerKyc(account_sid)
// getPartnerEarning(account_sid)

watch(() => selectedPartner.value?.account_sid, () => {
	const sid = selectedPartner.value?.account_sid
	if (sid) {
		getPartnerEarning(sid)
		getPartnerConfigs(sid)
	}
})

definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})
</script>

<style scoped>

</style>
