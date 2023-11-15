<template>
	<section class="stat-card">
		<h3 class="px-6 py-4 font-medium">
			Top 5 Recent Users
		</h3>
		<div class="relative flex flex-col w-full min-w-0 break-words">
			<div class="block w-full overflow-x-auto ">
				<Table :headers="signupHeaders" :table-data="signupList" :loading="loadingSignups">
					<template #item="{ item }">
						<NuxtLink v-if="item.fname" :to="`/users/${item.data.id}/user-info`" class="flex items-center gap-4 py-6 text-blue-600">
							<Avatar :name="item.data.fname" bg="#B1C2D9" />
							<span class="text-base">{{ item?.data?.fname }} {{ item?.data?.lname }}</span>
						</NuxtLink>
						<span v-if="item.email" class="flex items-center gap-4 py-6">
							<span class="text-base">{{ item?.data?.email ?? 'N/A' }}</span>
						</span>
						<span v-if="item.active" class="flex items-center gap-4 py-6">
							<span class="text-base">{{ item?.data?.active == '1' ? 'Active' : 'Inactive' }}</span>
						</span>
					</template>
				</Table>
			</div>
			<div v-if="!loadingSignups" class="flex items-end justify-end py-4 pr-3">
				<NuxtLink to="/users" class="flex items-center justify-center text-blue-500 gap-x-2">
					All Users<img class="inline" src="@/assets/icons/source/next.svg" alt="">
				</NuxtLink>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { useGetRecentSignupsList } from '@/composables/modules/users/fetch'
const { getSignupList, loadingSignups, signupList } = useGetRecentSignupsList()
getSignupList()

const signupHeaders = [
	{
		text: 'User',
		value: 'fname'
	},
	{
		text: 'Email',
		value: 'email'
	},
	{
		text: 'Status',
		value: 'active'
	}
]

</script>
