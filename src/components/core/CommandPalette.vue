<template>
	<div
		v-if="isOpen"
		:class="[
			'bg-modal',
			'transition-all modal-background',
		]"
		@click.self="close($el)"
	>
		<transition name="modal" appear>
			<div class="relative z-10 w-full" role="dialog" aria-modal="true">
				<div class="mx-auto max-w-2xl w-full transform divide-y divide-gray-500 divide-opacity-10 overflow-hidden rounded-xl bg-white  shadow-2xl ring-1 ring-black ring-opacity-5 backdrop-blur backdrop-filter transition-all">
					<div class="relative">
						<svg class="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-900 text-opacity-40" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
							<path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd" />
						</svg>
						<input v-model="search" type="text" class="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 focus:ring-0 outline-none sm:text-sm" placeholder="Search...">
					</div>

					<!-- Default state, show/hide based on command palette state. -->
					<ul class="max-h-80 scroll-py-2 divide-y divide-gray-500 divide-opacity-10 overflow-y-auto">
						<li class="p-2">
							<h2 class="mb-2 mt-4 px-3 text-xs font-semibold text-gray-900">
								Quick Navigation
							</h2>
							<ul class="flex flex-col gap-2">
								<li v-for="route in searchResult" :key="route?.id" class="group flex cursor-default select-none items-center rounded-md p-4 shadow border hover:shadow-none hover:border-dark transite">
									<nuxt-link class="flex flex-col w-full " :to="route.path">
										<span class="text-lg ">{{ route.name }}</span>
										<span class="  text-xs font-bold">{{ route.readablePath }}</span>
									</nuxt-link>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</transition>
	</div>
</template>

<script lang="ts" setup>
import { useMagicKeys } from '@vueuse/core'
import { useCommandPalette } from '@/utils/command_palette'

const { searchResult, search } = useCommandPalette()

const isOpen = ref(false)

const { meta, k } = useMagicKeys()

watch(() => useRoute().path, (from, to) => {
	isOpen.value = false
})

watchEffect(() => {
	if (meta.value && k.value) {
	isOpen.value = true
  }
})

const props = defineProps({

	autoClose: {
		default: true,
		type: Boolean,
		required: false
	},

	noCloseBtn: {
		default: false,
		type: Boolean,
		required: false
	}

})

const close = (e: any) => {
	if (
		typeof e.className === 'string' &&
		e.className.includes('modal-background')
	) {
        isOpen.value = false
	}
}

</script>

<style scoped lang="scss">
.bg-modal {
	@apply fixed top-0 left-0 w-screen max-w-[100vw] min-h-full z-50 flex justify-center items-start pt-40;
	backdrop-filter: blur(1.5px);
	background-color: rgba(0, 0, 0, 0.5);
}

.modal-enter-active,
.modal-leave-active {
	transition: all 0.23s linear;
}
.modal-enter-from,
.modal-leave-to {
	opacity: 0;
	@media screen and (max-width: 640px) {
		transform: translateY(500px);
	}
}
.slide-enter-active,
.slide-leave-active {
	transition: all 0.25s ease;
}
.slide-enter-from,
.slide-leave-to {
	transform: translateX(-500px);
}

</style>
