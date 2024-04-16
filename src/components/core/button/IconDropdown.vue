<template>
	<div class="relative">
		<Popover v-slot="{ open }" class="relative">
			<PopoverButton
				class=" flex outline-none items-center px-3 py-2.5 font-normal"
				@click="getPosition"
			>
				<h1>{{ buttonText }}</h1>
				<EllipsisVerticalIcon
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
				<PopoverPanel class="fixed z-10 mt-1" :style="{ left: positionStyle.left + 'px', top: positionStyle.top + 'px' }">
					<div
						class=" end-0 z-10 mt-2  rounded-md border border-gray-100 bg-white shadow-lg"
						:class="[className, index > 1 ? 'bottom-8' : '']" role="menu"
					>
						<div class="p-2 w-full">
							<div class="p-2 flex flex-col items-start w-full">
								<!-- eslint-disable-next-line vue/no-v-for-template-key -->
								<template v-for="item in (children as Record<string, any>[])" :key="item.name">
									<button v-if="!item.hide" class="item" role="menuitem" :class="item.class" @click.stop="item.func(data)">
										{{ item.name }}
									</button>
								</template>
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
import { EllipsisVerticalIcon } from '@heroicons/vue/20/solid'

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
    className: {
        type: String,
        default: 'w-52'
    },
    children: {
        type: Array,
        default: () => []
    },
	index: {
		type: Number,
		default: 0,
		required: false
	},
	buttonText: {
		type: String,
		default: '',
		required: false
	}
})
const x = ref(0)
const y = ref(0)

const getPosition = (event:any) => {
	x.value = event.clientX
    y.value = event.clientY
}

const positionStyle = computed(() => {
	const { innerWidth, innerHeight } = window
	const elementWidth = 200
	const elementHeight = 250
	const maxX = innerWidth - elementWidth
	const maxY = innerHeight - elementHeight

	let left = x.value
	let top = y.value

	// Check if the element is too close to the right edge
	if (left > maxX) {
	left = maxX
	}

	// Check if the element is too close to the bottom edge
	if (top > maxY) {
	top = maxY
	}

	// return {
	// left: `${left}px`,
	// top: `${top}px`
	// }
	return { left, top }
})
</script>

<style scoped>
.item{
    @apply block rounded-lg px-1 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 w-full text-start whitespace-nowrap
}
</style>
