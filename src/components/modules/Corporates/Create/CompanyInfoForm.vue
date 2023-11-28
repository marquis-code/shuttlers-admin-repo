<template>
	<div class="space-y-6">
		<div>
			<p class="font-bold">
				Company Information
			</p>
			<p class="text-sm text-gray-600">
				Information about the organization.
			</p>
		</div>
		<form class="space-y-6">
			<div>
				<label for="company-name" class="text-sm text-gray-700">Company name</label>
				<input id="company-name" v-model="form.corporate_name" name="company-name" class="input-field">
			</div>
			<div>
				<label for="role" class="text-sm text-gray-700">Role</label>
				<input id="role" v-model="form.role" name="role" class="input-field">
			</div>
			<div>
				<label for="staff-strength" class="text-sm text-gray-700">Estimated staff strength</label>
				<select id="staff-strength" v-model="form.staff_strength" name="staff-strength"
					class="input-field">
					<option v-for="(itm, idx) in ['0-50', '50-100', '100-500', 'More than 500']" :key="idx"
						:value="itm">
						{{ itm }}
					</option>
				</select>
			</div>
			<div>
				<label for="start-date" class="text-sm text-gray-700">How soon do you want to start?</label>
				<InputDateInput id="start-date" v-model="form.start_date" name="start-date" class="font-light"
					placeholder="Filter by date" />
			</div>
			<div>
				<label for="preferred-package" class="text-sm text-gray-700">Preferred package</label>
				<select id="preferred-package" v-model="form.package_type" name="preferred-package"
					class="input-field">
					<option v-for="(itm, idx) in packageList" :key="idx" :value="itm.key">
						{{ itm.name }}
					</option>
				</select>
			</div>
		</form>
		<div class="flex justify-end items-end mt-6">
			<button :disabled="!isCompanyInfoFormEmpty"
				class="bg-black disabled:cursor-not-allowed disabled:opacity-25 text-white rounded-md text-sm w-3/12 py-3"
				@click="handleNext">
				Next
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
  const props = defineProps({
    form: {
        type: Object,
        required: true
    }
  })

  const packageList = reactive([
    {
        name: 'Pay per seat',
        key: 'pay_per_seat'
    },
    {
        name: 'Pay per vehicle',
        key: 'pay_per_vehicle'
    }
])

const isCompanyInfoFormEmpty = computed(() => {
    return !!(props.form.corporate_name && props.form.role && props.form.staff_strength && props.form.start_date && props.form.package_type)
})
const emits = defineEmits(['next'])
const handleNext = () => {
	emits('next')
}
</script>
