<template>
	<aside class="relative">
		<Popover class="relative">
			<PopoverButton
				class="btn flex outline-none items-center  font-normal"

			>
				<img src="@/assets/icons/source/unfold.svg" alt="" class="h-7 px-0 ml-2 hover:bg-gray-100 cursor-pointer w-10 mb-3 rounded-md">
			</PopoverButton>

			<transition
				enter-active-class="transition duration-200 ease-out"
				enter-from-class="translate-y-1 opacity-0"
				enter-to-class="translate-y-0 opacity-100"
				leave-active-class="transition duration-150 ease-in"
				leave-from-class="translate-y-0 opacity-100"
				leave-to-class="translate-y-1 opacity-0"
			>
				<PopoverPanel
					class="absolute left-0 z-[500] mt-1"
				>
					<div
						class="absolute start-0 z-10 mt-2 w-80 rounded-md border border-gray-100 bg-white shadow-lg"
						role="menu"
					>
						<div class="p-2 flex flex-col gap-5">
							<form class="flex flex-col gap-2" @submit.prevent="">
								<select id="" v-model="tripTypeInput" name="" class="input-field">
									<option value="active">
										active
									</option>
									<option value="upcoming">
										upcoming
									</option>
									<option value="completed">
										completed
									</option>
								</select>
								<div class="flex gap-2">
									<input v-model="searchValue" type="search" :placeholder="`search ${tripTypeInput} trips`" class="input-field">
									<button class="btn-primary">
										Apply
									</button>
								</div>
							</form>
							<section class="flex flex-col">
								<Skeleton height="120px" radius="5px" />
							</section>
						</div>
					</div>
				</PopoverPanel>
			</transition>
		</Popover>
	</aside>
</template>

<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'

const searchValue = ref('')
const props = defineProps({
    tripType: {
        type: String,
        required: true
    }
})

const tripTypeInput = computed(() => {
	return props.tripType
})
</script>

<style scoped>

</style>
