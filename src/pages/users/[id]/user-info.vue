<template>
	<main>
		<ButtonGoBack url="/users" class="mb-6" />
		<div class="lg:flex lg:gap-x-10 justify-center items-start space-y-10 lg:space-y-0">
			<div class="lg:w-7/12 bg-white rounded-md shadow-sm p-3">
				<ModulesUsersInformationDetails v-if="!loading" :selected-user="selectedUser" :bus-captains-routes="busCaptainRoutes" :bus-captains-loader="loadingBusCaptains" />
				<Skeleton v-else height="600px" />
			</div>
			<div class="lg:w-5/12">
				<ModulesUsersWallet v-if="!loading" :selected-user="selectedUser" :corporate-wallet-limit-usage-info="corporateWalletInfo" :corporate-wallet-details="corporateWalletDetails" />
				<Skeleton v-else height="300px" />
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
import { useUserIdDetails, useUserCorporateWalletLimitUsageInfo, useGetBusCaptainRoutes } from '@/composables/modules/users/id'
import { useCorporateWalletDetails } from '@/composables/modules/corporates/id'
const { busCaptainRoutes, loading: loadingBusCaptains, getBusCaptainRoutesById } = useGetBusCaptainRoutes()
const { getUserById, loading, selectedUser } = useUserIdDetails()
const { corporateWalletInfo, loading: loadingUserWallet, getUserCorporateWalletLimitUsageInfo } = useUserCorporateWalletLimitUsageInfo()
const { corporateWalletDetails, loading: loadingUserCorporateWalletInfo, getCorporateWalletObject } = useCorporateWalletDetails()
const id = Number(useRoute().params.id)

watch(selectedUser, (val) => {
	if (val) {
		console.log(val)
		const corporate_id = val.corporate_id
		getBusCaptainRoutesById(val.id)
		if (corporate_id) {
		getCorporateWalletObject(corporate_id)
        getUserCorporateWalletLimitUsageInfo(val.id)
	}
	}
}, { immediate: true })

definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})

const openDropdown = ref(false)
</script>

<style scoped>
</style>
