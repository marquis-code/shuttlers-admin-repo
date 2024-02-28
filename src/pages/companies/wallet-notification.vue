<template>
	<main class="flex flex-col gap-4">
		<p class="text-base text-dark font-medium">
			Notify all companies when their wallet balance reaches a particular amount.
		</p>
		<button class="text-sm text-dark font-medium border rounded-md border-dark w-fit py-2.5 px-3" @click="useCompaniesModal().openWalletNotification()">
			Add New Notification
		</button>

		<div class="flex flex-col gap-3 w-full max-w-[300px] mt-8">
			<template v-if="loading">
				<Skeleton v-for="n in 3" :key="n" height="40px" radius="10px" />
			</template>
			<template v-else>
				<div v-for="n in notifications" :key="n.id" class="flex items-center gap-4 justify-between">
					<p>
						{{ convertToCurrency(n.general_wallet_threshold) }}
						<span class="font-medium" :class="[n.status === 'active' ? 'text-primary' : 'text-red']">
							({{ n.status }})
						</span>
					</p>
					<div class="flex items-center gap-3">
						<button class="text-sm text-dark font-medium" @click="initUpdate(n)">
							Edit
						</button>
						<button class="text-sm text-red font-medium" @click="initDelete(n)">
							Delete
						</button>
					</div>
				</div>
			</template>
		</div>
	</main>
</template>

<script setup lang="ts">
import {
    useFetchCompaniesWalletNotification,
    useCompaniesWalletNotification,
    useDeleteCompaniesWalletNotification
} from '@/composables/modules/corporates/wallet-notification'
import { useCompaniesModal } from '@/composables/core/modals'
import { convertToCurrency } from '@/composables/utils/formatter'

const { loading, getNotifications, notifications } = useFetchCompaniesWalletNotification()
const { initUpdate } = useCompaniesWalletNotification()
const { initDelete } = useDeleteCompaniesWalletNotification()
getNotifications()

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

</script>

<style scoped></style>
