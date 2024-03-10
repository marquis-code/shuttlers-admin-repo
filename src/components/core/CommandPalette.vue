<template>
	<div
		:close="closeModal"
		:class="[
			'bg-modal',
			'transition-all modal-background',
		]"
		@click.self="autoClose ? close($el) : null"
	>
		<transition name="modal" appear>
			<div v-if="type == 'popup'" class="modal">
				<header class="modal-title flex justify-between w-full items-center">
					<span v-if="showTitle" class="text-center w-full">{{ title }}</span>
					<icon
						v-if="noCloseBtn"
						name="close"
						class="text-black w-7 cursor-pointer  "
						@click="closeModal()"
					/>
				</header>
				<div class="w-full relative">
					<slot />
				</div>
			</div>
		</transition>
	</div>
</template>

<script lang="ts" setup>
import gsap from 'gsap'
import { PropType } from 'vue'
import { modal } from '@/composables/core/modals'

watch(useRoute(), (from, to) => {
	closeModal()
})
type modalTypes = 'popup' | 'sidebar';
const props = defineProps({

	autoClose: {
		default: true,
		type: Boolean,
		required: false
	},
	propsModal: {
		type: String,
		required: false,
		default: 'modal'
	},
	title: {
		default: 'Default Title',
		type: String,
		required: false
	},
	showTitle: {
		default: true,
		type: Boolean,
		required: false
	},
	noCloseBtn: {
		default: false,
		type: Boolean,
		required: false
	},
	type: {
		default: 'popup',
		type: String as PropType<modalTypes>,
		required: false
	}

})

const close = (e: any) => {
	if (
		typeof e.className === 'string' &&
		e.className.includes('modal-background')
	) {
	return closeModal()
	}
}

const closeModal = () => {
	modal.close(props.propsModal)
}
</script>

<style scoped lang="scss">
.bg-modal {
	@apply fixed top-0 left-0 w-screen max-w-[100vw] min-h-full z-50 flex justify-center items-center;
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
.modal {
	@apply bg-white z-[10000] flex flex-col items-start gap-4 px-6 rounded-xl w-[90%] h-auto  max-w-[100%] max-h-screen overflow-y-auto  md:px-9 py-8 md:rounded-2xl md:w-[440px] md:max-h-[90vh];
}
.large_modal {
	@apply bg-white z-[10000] flex flex-col items-start gap-4 px-6 rounded-xl w-[90%] h-auto  max-w-[100%] max-h-screen overflow-y-auto  md:px-9 py-8 md:rounded-2xl md:max-h-[90vh];
}

.medium_modal {
	@apply bg-white z-[10000] flex flex-col items-start gap-4 px-6 rounded-xl w-[90%] h-auto  max-w-[100%] max-h-screen overflow-y-auto  md:px-9 py-8 md:rounded-2xl md:max-h-[90vh] md:w-[900px];
}
.modal-title {
	@apply font-bold text-lg text-center w-full text-black ;
}
</style>
