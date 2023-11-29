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
					<tr v-for="(field, index) in corporateSettings" :key="index" class="flex">
						<td class="whitespace-nowrap py-4 font-medium text-gray-900 w-4/12 mx-auto">
							{{ field.label }}
						</td>
						<td class="whitespace-nowrap py-4 text-gray-700 w-4/12 mx-auto">
							<div class="flex justify-center items-center">
								<input v-model="field.is_compulsory" type="checkbox" @change="handleCheckboxChange(field, 'compulsory')">
							</div>
						</td>
						<td class="whitespace-nowrap py-4 text-gray-700 w-4/12 mx-auto">
							<div class="flex justify-center items-center">
								<input v-model="field.is_visible" type="checkbox" @change="handleCheckboxChange(field, 'visibility')">
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

  const simulateAPICall = (message) => {
        // Replace this with your actual API call logic
      }

  const handleCheckboxChange = (field, type) => {
        // Simulate API call
        if (type === 'compulsory' && field.compulsory) {
          simulateAPICall(`Compulsory field ${field.name} checked`)
        } else if (type === 'visibility' && field.visibility) {
          simulateAPICall(`Visibility for field ${field.name} checked`)
        }
      }
  </script>
