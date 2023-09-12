<template>
	<div class="relative overflow-hidden  w-full  shadow-xl  p-4 py-5 rounded-md box border  bg-light">
		<div :style="`width:${BORDER_WIDTH}%`" :class="[`${BG} h-1  absolute  bottom-0 left-0 transite transition-all !duration-[80ms]`]" />
		<span @click="$emit('closeAlert', id)">
			<Icon
				name="close"
				class="text-dark w-5 absolute  right-2 top-2 cursor-pointer  "
			/>

		</span>

		<div class="flex items-center pr-12 gap-3">
			<Icon :name="ICON" :class="[`${TEXT} w-10 text-dark`]" />

			<div>
				<p class="text-semibold text-dark">
					{{ message }}
				</p>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>

const emit = defineEmits(['closeAlert'])

const props = defineProps({
    id: {
        type: String,
        required: true,
        default: ''
    },
    message: {
        type: String,
        required: true,
        default: ''
    },
    type: {
        type: String,
        required: true,
        default: 'Alert'
    },
    duration: {
        type: Number,
        required: false,
        default: 5000
    }
})

const BORDER_WIDTH = ref(100)

onMounted(() => {
		BORDER_WIDTH.value = 100
		const intervalSequence = setInterval(() => {
		const substractedValue	= Number((100 / (props.duration / 100)).toFixed(1))
            BORDER_WIDTH.value -= substractedValue
		}, 100)

    setTimeout(() => {
        clearInterval(intervalSequence)
        emit('closeAlert', props.id)
    }, props.duration)
})

const ICON = computed({
	get: () => {
		switch (props.type) {
			case 'ERROR':
				return 'info'
			case 'SUCCESS':
				return 'check'
			default:
				return 'info'
		}
	},
	set: () => {}
})

const BG = computed({
		get: () => {
			switch (props.type) {
				case 'ERROR':
					return 'bg-red'
				case 'SUCCESS':
					return 'bg-green-700'
				default:
					return 'bg-dark'
			}
		},
		set: () => {}
})

const TEXT = computed({
	get: () => {
		switch (props.type) {
			case 'ERROR':
				return 'text-red'
			case 'SUCCESS':
				return 'text-green-700'
			default:
				return 'text-dark'
		}
	},
	set: () => {}
})
</script>
