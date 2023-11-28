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
					<input id="First" v-model="form.amount" type="number" class="input-field" required>
				</div>

				<div class="field relative">
					<label for="exployeesToInclude">Which employees do you want to apply the credit to?</label>
					<select id="exployeesToInclude" v-model="form.option" class="input-field py-3">
						<option v-for="(itm, idx) in reasonForCreditLine" :key="idx" :value="itm.value">
							{{ itm.name }}
						</option>
					</select>
				</div>
				<div v-if="showEmployeeList" class="field relative">
					<label for="Last">Select the Employees to include</label>
					<select v-model="form.employee" class="input-field py-3">
						<option v-for="(itm, idx) in employeeList" :key="idx" :value="itm?.value">
							{{ itm?.name }}
						</option>
					</select>
				</div>
				<div>
					<label for="applyCreditLineOption" class="text-sm">
						<input id="applyCreditLineOption" v-model="form.applyCreditLineImmediatly" type="checkbox">
						Apply credit line to staff immediately
					</label>
				</div>
			</div>
			<div>
				<button type="submit" class="btn-primary ml-auto mt-12" :disabled="createLoading">
					<span v-if="!createLoading">Activate Credit Line</span>
					<Spinner v-else />
				</button>
			</div>
		</form>
	</main>
</template>

<script lang="ts" setup>
definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})
const form = reactive({
    amount: '',
    applyCreditLineImmediatly: true,
    option: '',
    employee: ''
})
const employeeList = ref([])
const createLoading = ref(false)
const reasonForCreditLine = ref([
    {
        name: 'All Employees',
        value: 'all_employees'
    },
    {
        name: 'All Employees except some',
        value: 'all_employees_except_some'
    },
    {
        name: 'Only some select employees',
        value: 'only_some_select_employees'
    }
])

const createCreditLine = () => {}

const showEmployeeList = computed(() => {
    return !!(form.option === 'all_employees_except_some' || form.option === 'only_some_select_employees')
})
</script>
