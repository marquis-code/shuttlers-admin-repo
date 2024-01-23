<template>
	<div class="rounded-md  bg-white  border w-6/12">
		<div class="border-b border-gray-200">
			<h1 class="px-6 py-3 font-medium text-gray-700">
				New Amenities
			</h1>
		</div>
		<form class="space-y-6 p-6" @submit.prevent="createAmenity">
			<div>
				<label for="name">Name</label>
				<input id="name" v-model="amenitiesForm.name.value" type="text" class="w-full py-2 rounded-md outline-none border px-3" placeholder="Enter name">
			</div>
			<div>
				<label for="short_name">Short Name</label>
				<input id="short_name" v-model="amenitiesForm.short_name.value" type="text" class="w-full py-2 rounded-md outline-none border px-3" placeholder="Eg. AC">
			</div>
			<div v-if="!previewUrl" class="space-y-3">
				<label for="image">Upload Image</label>
				<label class="w-full tracking-wide  cursor-pointer">
					<p class="flex justify-center items-center gap-x-2"><img src="@/assets/icons/source/previewUrl.svg" alt="preview icon">Images to be uploaded must have a dimension of 24x24 px</p>
					<input id="image" class="hidden" type="file" accept="image/*" @change="onFileSelected">
				</label>
			</div>
			<div v-else>
				<img :src="previewUrl" alt="previewAmenity" class="h-16 w-16 rounded-full object-cover">
			</div>
			<button type="submit" :disabled="!isFormComplete" class="bg-black disabled:opacity-25 disabled:cursor-not-allowed text-white rounded-md py-2.5 px-6 text-sm">
				{{ loading ? 'processing..' : 'Add amenity' }}
			</button>
		</form>
	</div>
</template>

<script setup lang="ts">
import { useCreateAmentiites } from '@/composables/modules/configure/create'
const { amenitiesForm, loading, isRequestSuccessful, handleCreateAmenity } = useCreateAmentiites()
const previewUrl = ref()

const onFileSelected = (e) => {
	const file = e.target.files[0]
	if (file) {
		const fileReader = new FileReader()

		fileReader.onload = (e) => {
			amenitiesForm.image.value = e?.target?.result
      }
      previewUrl.value = URL.createObjectURL(e.target.files[0])
      fileReader.readAsDataURL(file)
	 }
    }

const isFormComplete = computed(() => {
	return !!(amenitiesForm.name.value && amenitiesForm.short_name.value && amenitiesForm.image.value)
})

const createAmenity = () => {
    handleCreateAmenity()
	if (isRequestSuccessful) {
		previewUrl.value = ''
	}
}
</script>

<style>

</style>
