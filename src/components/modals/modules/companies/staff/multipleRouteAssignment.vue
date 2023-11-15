<template>
	<Modal modal="$atts.modal" title="Assign Staff">
		<form class="flex flex-col gap-4">
			<p class="text-sm text-[#313533] font-medium">
				({{ selectedStaffs.length }}) of {{ totalStaffs }} selected
			</p>
			<div class="flex flex-col gap-2">
				<label class="text-xs text-[#6E717C] font-medium">Select route</label>
				<select required class="input-field">
					<option v-for="n in ['hello', 'hy']" :key="n" :value="n">
						{{ n }}
					</option>
				</select>
			</div>
			<div class="flex flex-col gap-2">
				<label class="text-xs text-[#6E717C] font-medium">Assign Itinerary</label>
				<select required class="input-field">
					<option v-for="n in ['hello', 'hy']" :key="n" :value="n">
						{{ n }}
					</option>
				</select>
			</div>
			<div class="flex flex-col gap-2">
				<label class="text-xs text-[#6E717C] font-medium">
					Work days (Selecting multiple days is allowed)
				</label>
				<VueMultiselect v-model="sel_days" placeholder="Search..." :searchable="true"
					:options="days" :multiple="true" :taggable="true"
				/>
			</div>
			<div class="grid grid-cols-2 gap-4">
				<div class="flex flex-col gap-2">
					<label class="text-xs text-[#6E717C] font-medium">Work branch</label>
					<select required class="input-field">
						<option v-for="n in branches" :key="n.id" :value="n.id">
							{{ n.name }}
						</option>
					</select>
				</div>
				<div class="flex flex-col gap-2">
					<label class="text-xs text-[#6E717C] font-medium">Work shift</label>
					<select required class="input-field">
						<option v-for="n in shifts" :key="n.id" :value="n.id">
							{{ n.description }}
						</option>
					</select>
				</div>
			</div>

			<button type="submit" :disabled="false" class="text-sm bg-black p-[16px] text-white text-center w-full mt-2 rounded disabled:cursor-not-allowed disabled:bg-[#E0E6ED]">
				{{ false ? 'processing...' : 'Assign' }}
			</button>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import VueMultiselect from 'vue-multiselect'
import { useCorporateBranches } from '@/composables/modules/corporates/branch'
import { useCorporateWorkShifts } from '@/composables/modules/corporates/shift'
import { useCorporateStaff, useSelectedStaff } from '@/composables/modules/corporates/staff/index'

const { totalStaffs } = useCorporateStaff()
const { selectedStaffs } = useSelectedStaff()
const { loading: loading_branches, getBranches, branches } = useCorporateBranches()
const { loading: loading_shifts, getShifts, shifts } = useCorporateWorkShifts()
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const sel_days = ref([])

onBeforeUnmount(() => {})
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style scoped>
label{
	margin: 0;
}
</style>
