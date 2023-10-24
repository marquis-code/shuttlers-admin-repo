<template>
	<div class="relative">
		<Popover v-slot="{ open }" class="relative">
			<PopoverButton class="btn flex font-medium outline-none items-center px-3 py-2.5 shadow-sm border border-[#D0D5DD] bg-light rounded-lg text-sm">
				<span v-if="title" class="text-grey5">{{ title }}</span>
				<span class="text-dark ml-2">{{ truncateString(computedSelectedString, 8) }}</span>
				<ChevronDownIcon :class="open ? '' : 'text-opacity-70'" class="ml-3 h-5 w-5" aria-hidden="true" />
			</PopoverButton>

			<transition cla enter-active-class="transition duration-0 ease-out" enter-from-class="translate-y-1 opacity-0" enter-to-class="translate-y-0 opacity-100" leave-active-class="transition duration-150 ease-in" leave-from-class="translate-y-0 opacity-100"
				leave-to-class="translate-y-1 opacity-0">
				<PopoverPanel class=" right-0 z-50">
					<div class="absolute start-0 z-10 mt-2 w-full rounded-md border card p-0 max-h-56 overflow-y-auto" role="menu">
						<div class="p-2">
							<div class="p-2 flex flex-col items-start w-full">
								<label v-for="item in (children as Record<string, any>[])" :key="item.name" :for="item.name">
									<input :id="item.name" v-model="selected" type="checkbox" :value="item" class="form-checkbox rounded !outline-none none text-shuttlersGreen !ring-0" @change="$emit('update:modelValue', selected)">
									<span>{{ item.name }}</span>
								</label>
							</div>
						</div>
					</div>
				</PopoverPanel>
			</transition>
		</Popover>
	</div>
</template>

<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import { truncateString } from '@/composables/utils/formatter'

const selected = ref([] as string[])
const computedSelectedString = computed(() => {
	if (selected.value.length === 0) return 'All'
	if (selected.value.length === props.children.length) return 'All'
	return selected.value.map((i: any) => i.name).join(', ')
})
const props = defineProps({
	title: {
		type: String,
		default: 'Title'
	},
	data: {
		type: Object,
		default: () => ({})
	},
	children: {
		type: Array,
		default: () => []
	},
	modelValue: {
		type: Array,
		required: true,
		default: () => []
	}
})
const emit = defineEmits(['update:modelValue'])
watch(() => props.modelValue, (val: any[]) => {
	if (val) {
		selected.value = val
	} else {
		selected.value = []
	}
}, { immediate: true })
</script>

<style scoped>
.item {
	@apply block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 w-full text-start
}
</style>
