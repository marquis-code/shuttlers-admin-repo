<template>
	<div class="flex flex-col gap-[8px] w-full" @click="$emit('clicked')">
		<div class="flex p-[16px] items-center gap-[16px] justify-between rounded-lg cursor-pointer"
			:class="active ? 'bg-[#EDFDF5] border border-green-600' : 'border'"
		>
			<div class="gap-[8px] w-full flex items-center">
				<p class="text-sm text-gray-500 m-0">
					Allow an employee <span>{{ type == 'trip' ? 'book' : 'spend' }}</span>
				</p>
				<div class="relative  h-fit bg-white">
					<input type="number" class="px-[8px] py-[4px] h-[35px] border rounded-lg outline-none text-sm"
						:placeholder="type == 'trip' ? 'Enter number of trips' : ''"
						:class="type == 'amount' ? 'pl-[32px]' : ''"
						:value="active ? book_or_amount_limit : ''"
						inputmode="none"
						@click.stop="!active ? $emit('clicked') : null"
						@input="$emit('update:book_or_amount_limit', Number(($event.target).value))"
					>
					<span v-if="type == 'amount'" class="text-sm text-gray-500 absolute top-1/2 left-[8px] -translate-y-1/2">₦</span>
				</div>
				<div class="flex items-center justify-center gap-x-6 w-3/12">
					<p class="m-0 w-full">
						{{ type == 'trip' ? 'trips per' : 'per' }}
					</p>
					<div class="flex py-[4px] rounded-lg border h-[35px] bg-white w-full">
						<select :value="active ? select_period : ''" class="outline-none border-none text-sm px-3 w-full" @click.stop="!active ? $emit('clicked') : null"
							@change="$emit('update:select_period', ($event.target).value)"
						>
							<option value="">
								Select
							</option>
							<option value="per_day">
								Day
							</option>
							<option value="per_week">
								Week
							</option>
							<option value="per_month">
								Month
							</option>
							<option value="per_year">
								Year
							</option>
						</select>
					</div>
				</div>
			</div>
			<div class="w-[16px] h-[16px] rounded-full relative shrink-0" :class="active ? 'bg-green-600 border-0' : 'border'">
				<span v-if="active" class="text-white tiny-text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">&check;</span>
			</div>
		</div>
		<p v-if="show_example" class="text-xs text-[#313533] m-0">
			Example: Allow an employee {{ type == 'trip' ? 'book' : 'spend' }}
			<span class="text-[#0DAC5C] font-medium">{{ type == 'trip' ? '4 trips' : '₦30,000' }}</span> per
			<span class="text-[#0DAC5C] font-medium"> {{ type == 'trip' ? 'Week' : 'Day' }}</span>
		</p>
	</div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps(['type', 'active', 'book_or_amount_limit', 'select_period', 'show_example'])

</script>

<style scoped>
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
</style>
