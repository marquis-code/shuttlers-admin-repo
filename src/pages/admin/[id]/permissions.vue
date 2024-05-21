<template>
	<ButtonGoBack url="/admin" class="mb-6" />
	<section v-if="!accessModuleLoading && !loadingStaffPermission" class="flex w-full pb-12">
		<main v-if="staffData.role === 'user'" class="flex flex-col gap-8 w-full">
			<div v-for="(permissionModule, index) in accessModules" :key="index">
				<header class="flex justify-between items-center mb-4">
					<p class="font-bold text-grey5">
						{{ permissionModule.name }}
					</p>
					<Spinner v-if="handleCheck(permissionModule.name)" />
				</header>

				<div v-if="permissionModule.permissions.length">
					<section class="card grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						<span v-for="(eachPermission, index) in permissionModule.permissions" :key="index" class="grid" style="color: #09090f">
							<div class="flex gap-3 items-center">
								<input :id="eachPermission.code" class="m-0 p-0" type="checkbox" :checked="checkIfPermissionExistForModule(eachPermission.id)" @change="selectedPermission($event,eachPermission)">
								<label :for="eachPermission.code" class="cursor-pointer m-0 p-0">{{ eachPermission.description }} </label>
								<div class="w-5 h-5">
									<Spinner v-if="handleLoader(eachPermission.id)" class="pl-2" :light="false" />
								</div>

							</div>
						</span>
					</section>
				</div>

				<div v-else class="text-muted">
					{{ permissionModule.name }} permissions not available.
				</div>
			</div>

			<footer class="card flex items-start justify-between w-full border-red bg-[#fcedee] mt-12">
				<div class="flex flex-col">
					<h1 class="text-dark font-bold text-lg">
						Remove all modules/permissions
					</h1>
					<p class="text-grey4 text-sm">
						Are you sure you want to remove all modules and permissions from this user?
					</p>
				</div>

				<button class="btn-primary bg-red" @click="deleteAllStaffPermission">
					Clear all permissions
				</button>
			</footer>
		</main>
		<p v-else class="text-gray-500 text-sm">
			All Super admins and Admins have all permissions by default
		</p>
	</section>
	<section v-else>
		<Skeleton height="500px" radius="4px" />
	</section>
</template>

<script setup lang="ts">
import { useGetUserAccessModule, useStaffPermission } from '@/composables/modules/staffs/permissions'

const activeSpinners = ref([] as any[])

const { getStaffPermission, loadingStaffPermission, staffData, staffPermission, currentLoader, selectedPermission, deleteAllStaffPermission } = useStaffPermission()
const { accessModules, accessModuleLoading, getUserAccessModule } = useGetUserAccessModule()
const id = useRoute().params.id as string

getStaffPermission(id)
getUserAccessModule()

const handleCheck = (moduleName) => { return activeSpinners.value.find((e:any) => e.moduleName === moduleName) }
const handleLoader = (id: any) => { return !!currentLoader.value.includes(id) }
const checkIfPermissionExistForModule = (modulePermissionId) => { return !!staffPermission.value.find((permission) => permission.id === modulePermissionId) }

definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})
</script>

<style scoped>

</style>
