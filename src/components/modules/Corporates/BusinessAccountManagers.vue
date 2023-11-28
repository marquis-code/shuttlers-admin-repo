<template>
	<main>
		<Table :loading="loading" :headers="tableFields" :table-data="corporateAccountManagers" :has-options="true">
			<template #header>
				<TableFilter :filter-type="{showSearchBar:true}" />
				<div class="flex justify-end items-end bg-white border-x pr-4 py-2">
					<button class="bg-black text-white rounded-md px-3 py-2.5" @click="useCompaniesModal().openAddAccountManagers()">
						Add Account Manager
					</button>
				</div>
			</template>
			<template #item="{ item }">
				<div v-if="item.fname">
					<Avatar :name="item?.data?.fname" bg="#B1C2D9" />
				</div>
			</template>
		</Table>
	</main>
</template>

<script setup lang="ts">
import { useCorporateAccountManagers } from '@/composables/modules/corporates/id'
import { useCompaniesModal } from '@/composables/core/modals'
const { corporateAccountManagers, loading, getCorporateAccountManagers } = useCorporateAccountManagers()
const id = Number(useRoute().params.id)
getCorporateAccountManagers(id)
const tableFields = ref([
    {
        text: 'NAME',
        value: 'name'
    },
    {
        text: 'PHONE',
        value: 'phone'
    },
    {
        text: 'EMAIL',
        value: 'email'
    },
    {
        text: 'ACTION',
        value: 'action'
    }
])

</script>

<style>

</style>
