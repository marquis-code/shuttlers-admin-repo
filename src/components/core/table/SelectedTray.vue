<template>
	<transition name="slide">
		<section v-if="selected.length" class="bg-light rounded-lg border">
			<transition-group
				appear
				tag="div"
				class="p-5 flex flex-wrap items-center gap-4 min-h-[6rem]"
				name="list"
			>
				<span v-for="item in (selected as any[])" :key="item.id" class="badge">
					{{ computed_name_function(item) }}
					<Icon name="closed" class="w-4 cursor-pointer" @click="removeItem(item)" />
				</span>
			</transition-group>
			<footer class="px-6 py-4 flex justify-between items-center border-t border-neut1">
				<p class="flex gap-2">
					<span class="text-dark">({{ selected.length }})</span>
					Selected
				</p>
				<button class="btn-primary text-dark" :disabled="loading" @click="call_function()">
					<span v-if="!loading" class="flex justify-center items-center gap-2.5">
						Refund
					</span>
					<Spinner v-else />
				</button>
			</footer>
		</section>
	</transition>
</template>

<script setup lang="ts">
const emit = defineEmits(['update'])

const props = defineProps({
    loading: {
        type: Boolean,
        default: false
    },
    selected: {
        type: Array,
        default: () => []
    },
    call_function: {
        type: Function,
        default: () => { }
    },
    computed_name_function: {
        type: Function,
        default: (data) => data
    }
})

const removeItem = (item) => {
    const filtered = props.selected.filter((i: any) => i.id !== item.id)
    emit('update', filtered)
}
</script>

<style scoped lang="scss">
.badge{
    @apply flex items-center gap-2 border bg-gray-500 border-gray-900 rounded p-1 px-3
}
.slide-enter-active,
.slide-leave-active {
	transition: all 0.25s linear;
}
.slide-enter-from,
.slide-leave-to {
	opacity: 0;
	transform: translateY(-100px);
}
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
