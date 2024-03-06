<template>
	<main>
		<ButtonGoBack class="mb-6" />
		<section class="w-full flex flex-col">
			<div class="flex items-center justify-between mb-5">
				<ButtonGoBack />
				<div v-if="!loadingSosRequest" class="text-green7 bg-green05 p-4 rounded-xl text-sm font-medium">
					{{ useDateFormat(formattedSosList[0]?.created_at, "MMMM D, YYYY").value }}
				</div>
			</div>

			<section class="">
				<Table :loading="loadingSosRequest" :headers="tableFields" :table-data="formattedSosList" :has-index="true">
					<template #item="{ item }">
						<span v-if="item.created_at">
							{{ useDateFormat(item.data.created_at, "MMMM d, YYYY").value }}
						</span>
						<span v-else-if="item.status" class="flex">
							<StatusBadge :name="item.data.status" />
						</span>
					</template>
				</Table>
			</section>
		</section>
	</main>
</template>

<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { usePageHeader } from '@/composables/utils/header'
import { useSosRequestList } from '@/composables/modules/commute/sos/fetch'

const { getSosRequestList, loadingSosRequest, sosRequestList } = useSosRequestList()
const id = useRoute().params.id as string
getSosRequestList(id)

const formattedSosList = computed(() =>
     sosRequestList.value.map((i) => {
         return {
             ...i,
             name: `${i.initiator.fname} ${i.initiator.lname}`,
             phone: i.initiator.phone,
             vehicle: `${i.trip?.vehicle?.brand} ${i.trip?.vehicle?.name}  (${i.trip?.vehicle?.registration_number})`,
             time: useDateFormat(i.created_at, 'HH:mm:ss AA').value
         }
    })
)
const tableFields = ref([

    {
        text: 'USER  TYPE',
        value: 'initiator_type'
    },
    {
        text: 'NAME',
        value: 'name'
    },
    {
        text: 'PHONE NUMBER',
        value: 'phone'
    },
    {
        text: 'TIME',
        value: 'time'
    },
    {
        text: 'REASON',
        value: 'sos_reason'
    }

])

const computedTitle = computed(() => {
    if (sosRequestList.value[0]?.trip?.route?.pickup) {
        return sosRequestList.value[0]?.trip?.route?.pickup + ' - ' + sosRequestList.value[0]?.trip?.route?.destination + ' ● ' + sosRequestList.value[0]?.trip?.route?.route_code
    }
}) as any

watch(computedTitle, (val:string) => {
    if (val) {
        usePageHeader().setPageHeader({
            preTitle: 'OVERVIEW',
            title: val
        })
    }
})

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated']
})

</script>

<style scoped>

</style>
