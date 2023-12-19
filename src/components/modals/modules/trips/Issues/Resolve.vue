<template>
	<Modal
		modal="$atts.modal"
		title="Resolve issue"
	>
		<form class="flex flex-col gap-4 w-full" @submit.prevent="resolveIssue()">
			<div class="flex flex-col gap-4 p-4 bg-[#FAFAFA] rounded-lg">
				<div class="flex items-center gap-4 justify-between text-sm">
					<p class="text-grey5">
						Route code
					</p>
					<p class="text-neut9 font-medium">
						{{ route_code }}
					</p>
				</div>
				<div class="flex items-center gap-4 justify-between text-sm">
					<p class="text-grey5">
						Start time
					</p>
					<p class="text-neut9 font-medium">
						{{ start_time }}
					</p>
				</div>
				<div class="flex items-center gap-4 justify-between text-sm">
					<p class="text-grey5">
						Incident
					</p>
					<p class="text-neut9 font-medium">
						{{ incident }}
					</p>
				</div>

				<div class="w-full border" />

				<div class="flex flex-col gap-2 text-sm">
					<p class="text-grey5">
						Description
					</p>
					<p class="text-neut9 font-medium">
						{{ desc }}
					</p>
				</div>
			</div>
			<div class="flex flex-col gap-2">
				<label class="label">Resolution</label>
				<Skeleton v-if="fetching_resolution" height="45px" />
				<select v-else v-model="resolution" required class="input-field">
					<option v-for="n in resolution_types" :key="n.id" :value="n.name">
						{{ n.name }}
					</option>
					<!-- ['Buffer', 'Pilot warned', 'Others'] -->
					<option v-for="n in ['Others']" :key="n" :value="n">
						{{ n }}
					</option>
				</select>
			</div>
			<div v-if="resolution === 'Others'" class="flex flex-col gap-2">
				<textarea v-model.trim="resolution_desc" required placeholder="Write was the resolution?"
					class="input-field max-h-[80px]" cols="30" rows="10"
				/>
			</div>
			<button type="submit" :disabled="loading || !enableButton" class="text-sm bg-black p-[16px] text-white text-center w-full mt-2 rounded disabled:cursor-not-allowed disabled:bg-[#E0E6ED]">
				{{ loading ? 'processing...' : 'Resolve issue' }}
			</button>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useResolveIssues } from '@/composables/modules/trips/issues'
import { useFetchResolutionTypes } from '@/composables/modules/trips/issues/types/resulution_types'

const { route_code, start_time, desc, incident, loading, resolveIssue, clearObj, resolution_desc, resolution } = useResolveIssues()
const { fetchResolutionTypes, resolution_types, loading: fetching_resolution } = useFetchResolutionTypes()

const enableButton = computed(() => {
	return !!(resolution.value.length || (resolution.value === 'Others' && resolution_desc.value.length))
})
watch(resolution, () => {
	if (resolution.value === 'Others') resolution_desc.value = ''
})

fetchResolutionTypes()
onBeforeUnmount(() => clearObj())
</script>

<style scoped>
label{
	margin: 0;
}
</style>
