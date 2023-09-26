<template>
	<div ref="target" class="relative w-full mb-8">
		<div class=" relative ">
			<input type="text" class="input-field" :placeholder="loading ? 'Loading..' : placeholder" :disabled="loading || disabled" @input="handleInput" @focus="showSuggestions">
			<button class="absolute top-[6px] right-1 btn-secondary  h-8 px-2 mr-2" @click="hideSuggestions">
				<Icon name="down" class="w-5" />
			</button>
		</div>

		<div class="flex flex-wrap  gap-3 mt-3  items-center">
			<span v-for="(tag, i) in tags" :key="i" class="flex gap-2 bg-grey9 px-3 py-1 rounded-md text-sm text-dark">
				{{ tag[displayKey] }}
				<Icon class="w-5 cursor-pointer" name="close" @click="removeTag(tag, i)" />
			</span>
		</div>
		<ul v-if="showingSuggestions" class="absolute z-10 w-full mt-1 bg-light border border-dark rounded-md shadow-lg">
			<div v-if="filteredItems.length">
				<li v-for="item in (filteredItems as any)" :key="item.id" class="px-4 py-2 cursor-pointer text-dark hover:bg-dark hover:text-light rounded-md" @click="selectItem(item)">
					{{ item[displayKey] }}
				</li>
			</div>
			<div v-else>
				<slot name="empty">
					<li class="px-4 py-2 cursor-not-allowed  rounded-md">
						Empty list
					</li>
				</slot>
			</div>
		</ul>
	</div>
</template>

<script setup lang='ts'>
import { onClickOutside } from '@vueuse/core'
const target = ref(null)

const props = defineProps({
	modelValue: { type: Array, default: () => [] },
	displayKey: { type: String, default: 'name' },
	options: { type: Array, default: () => [] },
	placeholder: { type: String, default: 'placeholder text' },
	loading: { type: Boolean, default: false },
	disabled: { type: Boolean, default: false }
})
const emit = defineEmits(['update:modelValue'])

const tags = ref<any>(props.modelValue)
if (typeof props.modelValue === 'string') {
	tags.value = []
}
const typedText = ref('')
const showingSuggestions = ref(false)
const selectedItem = ref({} as any)

const onBlur = () => {
	if (!selectedItem?.value?.name) {
		typedText.value = ''
	} else {
		typedText.value = selectedItem.value.name
	}
	showingSuggestions.value = false
}
const removeTag = (tag: string, index: number) => {
	tags.value.splice(index, 1)
	emit('update:modelValue', tags.value)
}

onClickOutside(target, onBlur)

const filteredItems = computed(() => {
	const idSet2 = new Set(tags.value.map((obj: any) => obj.id))
	const selectedRemoved = props.options.filter((item: any) => !idSet2.has(item.id))
	//  selectedRemoved.filter((item:any) => item.name.includes(typedText.value))
	return selectedRemoved
})

const handleInput = (event) => {
	typedText.value = event.target.value
	showingSuggestions.value = true
}

const showSuggestions = () => {
		showingSuggestions.value = true
}
const hideSuggestions = () => {
		showingSuggestions.value = false
}

const selectItem = (item) => {
	console.log(item)
	tags.value.push(item)
	emit('update:modelValue', tags.value)
	showingSuggestions.value = false
}

</script>
