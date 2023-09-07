<template>
	<div class="justify-between space-y-10 lg:flex lg:space-y-0">
		<div class="p-6 space-y-6 lg:w-6/12">
			<div class="w-full">
				<input type="text" placeholder="Enter notification title" class="w-full px-4 py-3 placeholder-gray-400 bg-white border rounded-md outline-none ">
			</div>
			<div class="w-full bg-white rounded-lg">
				<div class="flex items-center justify-between py-3 pr-6 border-b">
					<div>
						<input type="text" placeholder="Add users" class="pl-4 bg-white outline-none">
					</div>
					<p class="bg-gray-200 rounded-full px-3 py-2.5 text-xs font-medium">
						{{ selectedUserList.length }} user{{ selectedUserList.length > 0 ? 's' : '' }} selected
					</p>
				</div>
				<div class="grid grid-cols-3">
					<div v-for="(item, index) in selectedUserList" :key="index">
						<p class="rounded-md px-3 py-3 text-xs ">{{ item?.fname }} {{ item?.lname }}</p>
					</div>
				</div>
				<div class="p-6">
					<ModulesUsersTextEditor />
				</div>
				<div class="flex items-center justify-between px-6 pb-6">
					<div class="flex items-center gap-x-4">
						<div class="">
							<label for="AcceptConditions" class="relative h-8 cursor-pointer w-14">
								<input id="AcceptConditions" type="checkbox" class="sr-only peer">

								<span
									class="absolute inset-0 transition bg-gray-300 rounded-full peer-checked:bg-green-500"
								/>

								<span
									class="absolute inset-y-0 w-6 h-6 m-1 transition-all bg-white rounded-full start-0 peer-checked:start-6"
								/>
							</label>
						</div>
						<span class="pb-2 text-sm font-medium">
							Enable sms notification
						</span>
					</div>
					<div>
						<button class="text-white bg-gray-700 text-xs rounded-md px-6 py-2.5">
							Notify users
						</button>
					</div>
				</div>
			</div>
		</div>
		<div class="p-6 space-y-6 lg:w-6/12">
			<div class="relative w-full">
				<div class="w-full">
					<input type="text" placeholder="Search users" class="w-full px-3 py-3 placeholder-gray-400 bg-white border rounded-md outline-none ">
				</div>
				<div class="absolute top-1.5 right-3">
					<div class="flex items-center gap-x-3">
						<p class="text-sm">
							Filter by:
						</p>
						<select class="px-3 py-2 text-sm border rounded-full outline-none">
							<option class="text-xs" value="all">
								All
							</option>
							<option class="text-xs" value="company">
								Company
							</option>
						</select>
					</div>
				</div>
			</div>
			<div class="bg-white rounded-lg">
				<div class="flex items-center justify-end pt-6 pb-6 pr-6 border-b gap-x-3">
					<p class="text-sm text-green-500">
						select all users
					</p>
					<input type="checkbox">
				</div>
				<div class="px-10 pb-10">
					<div v-for="(item, index) in usersList" :key="index" class="flex items-center justify-between py-6 border-b">
						<div class="flex items-center gap-x-3">
							<Avatar :name="item.fname" bg="#B1C2D9" />
							<div>
								<p class="text-sm font-medium">
									{{ item.email }}
								</p>
								<p class="text-sm">
									{{ item.phone }}
								</p>
							</div>
						</div>
						<div>
							<input type="checkbox" @change="handleSelectedUser(item)">
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useGetUsersList } from '@/composables/modules/users/fetch'
const { getUsersList, loading, usersList } = useGetUsersList()
getUsersList()
definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})

const users = ref([
	{
		name: 'LN',
		phone: '08087868642',
		email: 'lnlk2lknl@kl.com'
	},
	{
		name: 'LN',
		phone: '08087868642',
		email: 'lnlk2lknl@kl.com'
	},
	{
		name: 'LN',
		phone: '08087868642',
		email: 'lnlk2lknl@kl.com'
	},
	{
		name: 'LN',
		phone: '08087868642',
		email: 'lnlk2lknl@kl.com'
	},
	{
		name: 'LN',
		phone: '08087868642',
		email: 'lnlk2lknl@kl.com'
	}
])
const checked = ref(false)
const notification = ref({
	isSms: false
})

const toggleStory = () => {
      if (checked.value) {
       notification.value.isSms = true
      } else {
      notification.value.isSms = false
      }
    }

const selectedUserList = ref([])

const handleSelectedUser = (item: any) => {
	selectedUserList.value.push(item)
//   [...selectedUserList.value, item]
}
</script>

<style>
input[type=checkbox][disabled]{
  outline:1px solid black;
  background-color: black;
  cursor: not-allowed;
}
</style>
<style lang="scss" scoped>
.selected-users {
  height: 100%;
  .card-header {
    max-height: 3.75rem;
  }

  .notificationArea {
    resize: none;
  }
  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: '';
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: #2196f3;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
}
</style>
