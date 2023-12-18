<template>
	<div>
		<div class="overflow-x-auto">
			<table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
				<thead class="ltr:text-left rtl:text-right">
					<tr class="flex items-center justify-between">
						<th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
							Fields
						</th>
						<th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
							Compulsory
						</th>
						<th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
							Visibility
						</th>
					</tr>
				</thead>

				<tbody v-if="!loading" class="divide-y divide-gray-200">
					<tr
						v-for="(field, index) in corporateSettings"
						:key="index"
						class="flex"
					>
						<td
							class="whitespace-nowrap py-4 font-medium text-gray-900 w-4/12 mx-auto"
						>
							{{ field.label }}
						</td>
						<td class="whitespace-nowrap py-4 text-gray-700 w-4/12 mx-auto">
							<div class="flex justify-center items-center">
								<input
									v-model="field.is_compulsory"
									type="checkbox"
									@change="handleCheckboxChange(field, 'compulsory')"
								>
							</div>
						</td>
						<td class="whitespace-nowrap py-4 text-gray-700 w-4/12 mx-auto">
							<div class="flex justify-center items-center">
								<input
									v-model="field.is_visible"
									type="checkbox"
									@change="handleCheckboxChange(field, 'visibility')"
								>
							</div>
						</td>
					</tr>
				</tbody>
				<Skeleton v-else height="100px" />
			</table>
		</div>
	</div>
</template>

  <script lang="ts" setup>
import { useCorporateWorkShifts } from '@/composables/modules/corporates/shift'
import { useCorporateBranches } from '@/composables/modules/corporates/branch'
import { useGroup } from '@/composables/modules/corporates/corporateGroup'
import { useAlert } from '@/composables/core/notification'
const { shifts, getShifts } = useCorporateWorkShifts()
const { branches, getBranches } = useCorporateBranches()
const { groups, fetchGroup } = useGroup()
const route = useRoute()
const corporateId = Number(route.params.id)
getShifts(corporateId)
getBranches(corporateId)
fetchGroup(corporateId)
const props = defineProps({
  corporateSettings: {
    type: Array,
    required: true,
    default: () => []
  },
  loading: {
    type: Boolean,
    required: true,
    default: false
  }
})

const handleBranch = (obj, key) => {
  if (!branches.value.length) {
    useAlert().openAlert({
      type: 'ERROR',
      msg: 'This company has not created any office branch'
    })
    setTimeout(() => {
      obj[key] = false
    }, 500)
    return
  }
  if (key === 'is_compulsory') obj.is_visible = true
}

const handleShift = (obj, key) => {
  if (!shifts.value.length) {
    useAlert().openAlert({
      type: 'ERROR',
      msg: 'This company has not created any work shift'
    })
    setTimeout(() => {
      obj[key] = false
    }, 500)
    return
  }
  if (key === 'is_compulsory') obj.is_visible = true
}

const handleGroup = (obj, key) => {
  if (!groups.value.length) {
    useAlert().openAlert({
      type: 'ERROR',
      msg: 'This company has not created any group'
    })
    setTimeout(() => {
      obj[key] = false
    }, 500)
    return
  }
  if (key === 'is_compulsory') obj.is_visible = true
}

const handleCheckboxChange = (field: any, type: any) => {
  const toCheck = [
    'corporate_office_branch_id',
    'group_id',
    'corporate_workshift_id'
  ]
  if (!toCheck.includes(field.field_name) && field.is_compulsory === true) {
    field.is_visible = true
  }
  if (toCheck.includes(field.field_name)) {
    if (field.is_compulsory === true) {
      if (field.field_name === 'corporate_office_branch_id')
        handleBranch(field, 'is_compulsory')
      if (field.field_name === 'corporate_workshift_id')
        handleShift(field, 'is_compulsory')
      if (field.field_name === 'group_id') handleGroup(field, 'is_compulsory')
    }

	if (field.is_visible === true) {
      if (field.field_name === 'corporate_office_branch_id')
        handleBranch(field, 'is_visible')
      if (field.field_name === 'corporate_workshift_id')
        handleShift(field, 'is_visible')
      if (field.field_name === 'group_id') handleGroup(field, 'is_visible')
    }
  }
}
</script>
