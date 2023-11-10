<template>
	<main class="space-y-16">
		<section>
			<ModulesConfigureAmenitiesCreateAmenities />
			<!-- <div class="rounded-md  bg-white  border w-6/12">
				<div class="border-b border-gray-200">
					<h1 class="px-6 py-3 font-medium text-gray-700">
						New Amenities
					</h1>
				</div>
				<div class="space-y-6 p-6">
					<div>
						<label>Name</label>
						<input v-model="form.name" type="text" class="w-full py-2 rounded-md outline-none border px-3" placeholder="Enter name">
					</div>
					<div>
						<label>Short Name</label>
						<input v-model="form.short_name" type="text" class="w-full py-2 rounded-md outline-none border px-3" placeholder="Eg. AC">
					</div>
					<div v-if="!previewUrl" class="space-y-3">
						<label>Upload Image</label>
						<label class="w-full tracking-wide  cursor-pointer">
							<p class="flex justify-center items-center gap-x-2"><img src="@/assets/icons/source/previewUrl.svg" alt="preview icon">Images to be uploaded must have a dimension of 24x24 px</p>
							<input class="hidden" type="file" accept="image/*" @click="handleFileUpload">
						</label>
					</div>
					<div v-else>
						<img :src="previewUrl" alt="previewAmenity" class="h-16 w-16 rounded-full object-cover">
					</div>
					<button :disabled="!isFormComplete" :class="[!isFormComplete ? 'cursor-not-allowed opacity-25' : null]" class="bg-gray-600 text-white rounded-md py-2.5 px-6 text-sm">
						Add amenity
					</button>
				</div>
			</div> -->
		</section>
		<section>
			<ModulesConfigureAmenitiesTableSection />
		</section>
		<!-- <Table :loading="loadingAmenities" :headers="tableFields" :table-data="amenitiesList" :has-options="true" :option="onRowClicked">
			<template #header>
				<h1 class="border bg-white px-6 py-2.5 border-b-0 rounded-md">
					Amenities List
				</h1>
			</template>
			<template #item="{ item }">
				<span v-if="item.image" class="flex items-center gap-x-2">
					<img :src="item.data.image" alt="amenity image" class="h-10 w-10 rounded-full object-cover"> {{ item.data.short_name }}{{ item.data.image.substr(item.data.image.length - 5) }}
				</span>
				<span v-if="item.created_at">
					{{ useDateFormat(item.data.created_at, "MMMM d, YYYY").value }}
				</span>
				<span v-if="item.id">
					<img src="@/assets/icons/source/red-trash.svg" alt="red trash">
				</span>
			</template>

			<template #footer>
				<TablePaginator :current-page="page" :total-pages="total" :loading="loadingAmenities" @move-to="moveTo($event)" @next="next" @prev="prev" />
			</template>
		</Table> -->
	</main>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

</script>
