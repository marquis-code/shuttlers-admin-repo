<template>
	<div class="relative">
		<div class="inline-flex cursor-pointer py-2 text-white items-center overflow-hidden rounded-md border bg-black"
			@click="handleDropdown"
		>
			<span
				class="px-4 py-2 text-sm/none text-white"
			>
				Options
			</span>

			<button
				class="h-full pr-2"
			>
				<img src="@/assets/icons/source/more.svg" alt="">
			</button>
		</div>

		<div v-if="showDropdown"
			class="absolute end-0 z-10 mt-2 w-56 rounded-md border border-gray-100 bg-white shadow-lg"
			role="menu"
		>
			<div class="p-2">
				<button v-for="(itm, idx) in headerOptions" :key="idx"
					class="block rounded-lg px-4 py-2 text-sm"
					role="menuitem"
					@click="itm?.func"
				>
					{{ itm?.name }}
				</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const props = defineProps({
    headerOptions: {
        type: Array,
        required: true
    }
})
const handleDropdown = () => {
	showDropdown.value = !showDropdown.value
}
const showDropdown = ref(false)

</script>
