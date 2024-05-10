<template>
	<ButtonGoBack class="mb-6" />

	<main class="card p-0 max-w-3xl">
		<div class=" border-b px-6 py-3 space-y-3">
			<h1 class="font-bold">
				Activate employee credit line
			</h1>
			<p class="text-sm text-gray-700">
				Credit line allows employers make available a maximum amount of money that there employee can spend on transport within a month
			</p>
		</div>

		<form class="flex flex-col gap-4 px-6 py-6" @submit.prevent="createCreditLine">
			<div class=" space-y-6">
				<div class="field relative">
					<label for="First">How much credit line do you want to give each employee?</label>
					<input id="First" v-model="amount" type="number" class="input-field" required>
				</div>

				<div class="field relative">
					<label for="exployeesToInclude">Which employees do you want to apply the credit to?</label>
					<select id="exployeesToInclude" v-model="applicable_to" class="input-field py-3">
						<option v-for="(itm, idx) in reasonForCreditLine" :key="idx" :value="itm.value">
							{{ itm.name }}
						</option>
					</select>
				</div>
				<div v-if="applicable_to !== 'all'" class="field relative">
					<label for="Last">Select the Employees to {{ applicable_to === 'some' ? 'include' : 'exempt' }}</label>
					<InputMultiSelectCorporateUsers v-model="users" :multiple="true" :corporate-id="($route.params.id as string)" />
				</div>
				<div>
					<label for="applyCreditLineOption" class="text-sm">
						<input id="applyCreditLineOption" v-model="apply_immediately" type="checkbox">
						Apply credit line to staff immediately
					</label>
				</div>
			</div>
			<div>
				<button type="submit" class="btn-primary ml-auto mt-12" :disabled="processing || !enableButton">
					<span v-if="!processing">Activate Credit Line</span>
					<Spinner v-else />
				</button>
			</div>
		</form>
	</main>
</template>

<script lang="ts" setup>
import { useCreateCreditLine } from '@/composables/modules/corporates/creditLine'

const { processing, createCreditLine, users, apply_immediately, applicable_to, amount } = useCreateCreditLine()
definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})
const reasonForCreditLine = ref([
    {
        name: 'All Employees',
        value: 'all'
    },
    {
        name: 'All Employees except some',
        value: 'all_except'
    },
    {
        name: 'Only some select employees',
        value: 'some'
    }
])

const enableButton = computed(() => {
	if (applicable_to.value !== 'all' && !users.value.length) return false
	return !!(amount.value, applicable_to.value)
})

</script>
