<template>
	<div class="flex flex-col gap-3 border rounded-md">
		<h3 class="text-base text-dark font-medium px-2 pt-2">
			Active charges
		</h3>
		<Table
			:loading="loading"
			:has-index="true"
			:headers="tableFields"
			:table-data="charges"
			:page="metaObject.page.value"
		>
			<template #item="{ item }">
				<p v-if="item.type" class="text-sm text-[#737876] whitespace-nowrap">
					<span class="text-[#101211] uppercase">
						{{ item.data?.charges_type?.short_name + ' ' || '' }}
					</span>
					<span>
						({{ item.data.charges_type?.name || '' }})
					</span>
				</p>
				<p v-if="item.fees" class="text-sm text-[#737876] whitespace-nowrap">
					<template v-if="item.data?.additional_charge?.charge_type === 'flat'">
						₦{{ item.data?.additional_charge?.charge_value }}
					</template>
					<template v-else>
						{{ item.data?.additional_charge?.charge_value }}%
					</template>
				</p>
				<p v-if="item.compulsory" class="text-sm font-medium whitespace-nowrap"
					:class="item.data?.additional_charge?.is_compulsory ? 'text-[orange]' : 'text-[#0DAC5C]'"
				>
					{{ item.data?.additional_charge?.is_compulsory ? 'Compulsory' : 'Optional' }}
				</p>
			</template>

			<!-- <template #footer>
                <TablePaginator
                    :current-page="metaObject.page.value"
                    :total-pages="metaObject.total.value"
                    :loading="loading"
                    @move-to="moveTo($event)"
                    @next="next"
                    @prev="prev"
                />
            </template> -->
		</Table>
	</div>
</template>

<script setup lang="ts">
import { charges_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'

const charges = ref({}) as Ref<Record<string, any>[]>
const loading = ref(false)
const { prev, metaObject, next, moveTo, setFunction } = usePagination()

const tableFields = ref([
	{ value: 'type', text: 'Charges type' },
	{ value: 'fees', text: 'Fees' },
	{ value: 'compulsory', text: 'Type' }
])

const getCharges = async () => {
    const routeId = useRoute().params.id as string
    loading.value = true
    const res = await charges_api.$_get_all_charges_for_a_route(routeId) as CustomAxiosResponse
    if (res.type !== 'ERROR') {
        charges.value = res.data?.length ? res.data : []
        // metaObject.total.value = res.data.metadata.total_pages
    }
    loading.value = false
}

getCharges()
</script>
