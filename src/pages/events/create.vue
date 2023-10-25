<template>
	<main>
		<ButtonGoBack class="mb-6" />
		<form class="bg-white rounded-md border w-11/12 lg:w-[800px] p-8 flex flex-col gap-6" @submit.prevent="createEvent">
			<header class="flex flex-col gap-2 mb-3">
				<h1 class="text-2xl font-bold">
					Event Go
				</h1>
				<p class="text-gray-600">
					Kindly input the correct informations
				</p>
			</header>

			<div class="grid grid-cols-1 gap-5 md:grid-cols-2">
				<div class="grid w-full place-items-start">
					<label for="eventName" class="label">
						Name of event
					</label>
					<input
						id="eventName"
						v-model="credentials.title"
						type="text"
						name="eventName"
						class="input-field"
					>
				</div>
				<div class="grid w-full place-items-start">
					<div class="field relative">
						<label for="amount" class="label">Event type</label>
						<select v-model="credentials.type" class="input-field">
							<option v-for="(item, index) in eventOptions" :key="index" :value="item.name">
								{{ item?.name }}
							</option>
						</select>
					</div>
				</div>
			</div>
			<div>
				<p class="mb-2 text-xs font-medium text-gray-500 text-start">
					Description
				</p>
				<CustomTextEditor v-model="credentials.description" content-type="html" @description-length="setDescriptionLength" />
				<p v-if="descriptionLength > 300" class="text-[10px] text-red font-medium px-2 py-px">
					You have exceeded max number of characters. Please enter not more than 300 characters.
				</p>
			</div>
			<div class="grid grid-cols-1 gap-5 md:grid-cols-2">
				<div class="grid w-full place-items-start">
					<label for="eventLocation" class="mb-2 text-xs font-medium text-gray-500">
						Location of event
					</label>
					<LocationInput
						id="eventLocation"
						v-model="credentials.location"
						type="text"
						name="eventLocation"
						class="input-field"
						placeholder=""
					/>
				</div>
				<div class="grid w-full date-range place-items-start">
					<label for="eventDate" class="mb-2 text-xs font-medium text-gray-500">
						Date of event
					</label>
					<InputDateInput v-model="credentials.dateRange" :range="true" format="DD MMMM, YYYY" :disabled-date="(date:any) => date < new Date().setHours(0, 0, 0, 0)" />
				</div>
			</div>
			<div class="grid grid-cols-1 gap-5 md:grid-cols-2">
				<div class="grid w-full place-items-start">
					<label for="attendees" class="mb-2 text-xs font-medium text-gray-500">
						Estimated number of atendees
					</label>
					<input
						id="attendees"
						v-model="credentials.attendees"
						type="number"
						name="attendees"
						min="0"
						class="input-field"
					>
				</div>
			</div>
			<div class="flex items-center justify-between w-full gap-x-5">
				<span class="w-5/6 text-xs font-medium text-neut9">
					Would you like us to take the attendees to and fro?
				</span>
				<ToggleButton v-model="credentials.returnTrip" label="" name="return_trip" class="w-14" />
			</div>
			<div class="flex items-center justify-between w-full gap-x-5">
				<span class="w-5/6 text-xs font-medium text-neut9">
					You agree that the attendees will be in full control of paying the transportation costs to the event
				</span>

				<ToggleButton v-model="credentials.payment" label="" name="payment" class="w-14" />
			</div>
			<div>
				<CustomImageFileInput
					v-model="credentials.banner"
					:label="'Event banner'"
					:value="bannerURL"
					@update:value="setBannerUrl"
					@reset="resetFileInput"
					@file-selected="setCropperImage"
				/>
			</div>
			<button
				id="create-event"
				:disabled="disabled || loadingCreateEvent"
				class="btn-primary"
				type="button"
				@click="createEvent"
			>
				<span v-if="!loadingCreateEvent" class="flex justify-center items-center gap-2.5">Submit request
				</span>
				<Spinner v-else />
			</button>
		</form>
	</main>
</template>

<script lang="ts" setup>
import { usePageHeader } from '@/composables/utils/header'
import { use_image_upload } from '@/composables/core/upload'
import { useCreateEvent } from '@/composables/modules/events/create'

const { disabled, credentials, descriptionLength, eventOptions, createEvent, loadingCreateEvent } = useCreateEvent()
const { uploadProgress, bannerURL, bannerBase64 } = use_image_upload()

const setCropperImage = (image: string) => {
	bannerBase64.value = image
}
const setBannerUrl = (value: any) => {
	bannerURL.value = value
}
const resetFileInput = () => {
	setBannerUrl('')
	uploadProgress.value = 0
}
const setDescriptionLength = (value: any) => {
	descriptionLength.value = value
}
const handleSelectUpdate = (value: any) => {
	credentials.type = value
}

bannerURL.value = ''
credentials.title = ''
credentials.type = ''
credentials.description = ''
credentials.location = []
credentials.attendees = null
credentials.returnTrip = true
credentials.banner = ''
credentials.dateRange = []
credentials.payment = true

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})
usePageHeader().setPageHeader({
	title: 'Create Event',
	preTitle: 'Events'
})
</script>

<style scoped></style>
