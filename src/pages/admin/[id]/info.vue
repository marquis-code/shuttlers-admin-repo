<template>
	<div class="space-y-6">
		<BreadCrums class="text-sm" title="Vehicle" :content="breadcrum" />
		<ButtonGoBack class="mb-6" />
		<div v-if="!loading" class="lg:flex lg:gap-x-10 justify-center items-start space-y-10 lg:space-y-0">
			<div class="md:w-6/12 bg-white rounded-md shadow-sm p-3">
				<div class="flex justify-between items-center py-2.5 border-b pb-2 px-3">
					<div class="font-medium">
						Admin User Information
					</div>
					<ButtonDropdown :children="dropdownChildren" :data="selectedAdmin" />
				</div>
				<div class="flex justify-between items-center border-b py-4 px-3">
					<p class="text-gray-500 text-sm">
						NAME
					</p>
					<p class="text-sm">
						{{ `${selectedAdmin.fname} ${selectedAdmin.lname}` ?? 'N/A' }}
					</p>
				</div>
				<div class="flex justify-between items-center border-b py-4 px-3">
					<p class="text-gray-500 text-sm">
						Phone Number
					</p>
					<p>
						{{ `${selectedAdmin.phone}` ?? 'N/A' }}
					</p>
				</div>
				<div class="flex justify-between items-center border-b py-4 px-3">
					<p class="text-gray-500 text-sm">
						Email Address
					</p>
					<p>
						{{ `${selectedAdmin.email}` ?? 'N/A' }}
					</p>
				</div>
				<div class="flex justify-between items-center py-4 px-3">
					<p class="text-gray-500 text-sm">
						Status
					</p>
					<StatusBadge :name="selectedAdmin.active === 1 ? 'active' : 'inactive'" />
				</div>
			</div>
			<div class="md:w-6/12 bg-white rounded-md shadow-sm">
				<ModulesAdminsUpdateAdmin />
			</div>
		</div>
		<Skeleton v-else height="600px" />
	</div>
</template>

<script setup lang="ts">
// import { useGetStaffs } from '@/composables/modules/staffs/fetch'

// const { getStaffs, loading, staffsData } = useGetStaffs()
const id = useRoute().params.id as string
// getStaffs()

// const selectedAdmin = computed(() => {
// 	if (loading.value) return
// 	return staffsData.value.find((staff) => staff.id === id)
// })
const loading = ref(false)
const selectedAdmin = ref({
	id: 88,
    fname: 'Shalom',
    lname: 'iIewole-ojo',
    phone: '08171342535',
    email: 'shalom.irewoleojo@shuttlers.ng',
    active: 1
})
definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})

const dropdownChildren = computed(() => [
	{ name: 'Change Password', func: () => { } },
	{ name: 'Suspend Admin', func: () => { }, class: '!text-red' }
])

const breadcrum = computed(() => {
		return [
            {
                name: 'Admin',
                link: '#'
            },
            {
                name: `${selectedAdmin?.value?.fname} ${selectedAdmin?.value?.lname}`,
                link: '#'
            }
        ]
	})

const openDropdown = ref(false)
</script>

<style scoped>

</style>
