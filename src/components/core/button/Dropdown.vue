<template>
	<div class="relative">
		<Popover v-slot="{ open }" class="relative">
			<PopoverButton
				class="btn flex outline-none items-center px-3 py-2.5 font-normal"
				:style="`background-color: ${bgColor}; color: ${color}`"

			>
				<span>Actions</span>
				<ChevronDownIcon
					:class="open ? '' : 'text-opacity-70'"
					class="ml-2 h-5 w-5"
					aria-hidden="true"
				/>
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
					class="absolute right-0 z-30 mt-1"
				>
					<div
						class="absolute end-0 z-30 mt-2 w-56 rounded-md border border-gray-100 bg-white shadow-lg"
						role="menu"
					>
						<div class="p-2">
							<div class="p-2 flex flex-col items-start w-full">
								<button v-for="item in (children as Record<string, any>[])" :key="item.name" class="item" role="menuitem" :class="item.class" @click="item.func(data)">
									{{ item.name }}
								</button>
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
defineProps({
	data: {
		type: Object,
		default: () => ({})
	},
    bgColor: {
        type: String,
        default: 'var(--red)'
    },
    color: {
        type: String,
        default: 'var(--light)'
    },
    children: {
        type: Array,
        default: () => []
    }
})
</script>

<style scoped>
.item{
    @apply block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 w-full text-start
}
</style>
