<template>
	<Modal modal="$atts.modal" title="Settlement details">
		<form class="flex flex-col gap-4 w-full" @submit.prevent="updateSettlementAccount">
			<!-- <div class="flex flex-col gap-2">
				<label class="label">Default settlement account</label>
				<select v-model="acct_id" required class="input-field">
					<option disabled value="">
						Select Account
					</option>
					<option v-for="(bank, index) in settlement_accounts" :key="index" :value="bank">
						{{ bank.name }}
					</option>
				</select>
			</div> -->

			<div class="flex flex-col gap-2">
				<label class="label">Payout type</label>
				<div class="grid grid-cols-2 rounded-xl border">
					<button v-for="n, i in type" :key="i" type="button" class="flex items-center justify-center gap-2 py-2.5" :class="i === 0 ? 'border-r' : ''" @click="cycle = n">
						<div class="w-[18px] h-[18px] rounded-full flex items-center justify-center" :class="cycle === n ? 'bg-[#BDFDDC]' : 'border'">
							<div v-if="cycle === n" class="w-[12px] h-[12px] bg-green7 rounded-full" />
						</div>
						<p class="text-sm text-[#475467] font-medium capitalize">
							{{ n }}
						</p>
					</button>
				</div>
			</div>

			<button type="submit" :disabled="loading || !enableButton" class="text-sm bg-black p-4 text-white rounded-xl text-center w-full mt-8 disabled:cursor-not-allowed disabled:bg-[#E0E6ED]">
				{{ loading ? 'processing...' : 'Update' }}
			</button>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useUpdateSettlementAccount } from '@/composables/modules/partners'

const { loading, updateSettlementAccount, clearObj, cycle } = useUpdateSettlementAccount()
const type = ['weekly', 'monthly']

const enableButton = computed(() => {
    return !!(cycle.value)
})

onBeforeUnmount(() => clearObj())
</script>

<style scoped>
label {
    margin: 0;
}
</style>
