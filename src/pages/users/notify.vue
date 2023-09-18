<template>
	<div class="justify-between space-y-10 lg:flex lg:space-y-0">
		<div class="p-6 space-y-6 lg:w-6/12">
			<div class="w-full">
				<input v-model="notification.title" type="text" placeholder="Enter notification title" class="input-field">
			</div>
			<div class="w-full bg-white rounded-lg">
				<div class="flex items-center justify-between py-3 pr-6 border-b">
					<div>
						<input v-model="search" type="text" placeholder="Add users" class="pl-4 bg-white outline-none">
					</div>
					<p v-if="notificationType === 'regular'" class="bg-gray-200 rounded-full px-3 py-2.5 text-xs font-medium">
						{{ selectedUsers.length }} user{{ selectedUsers.length > 0 ? 's' : '' }} selected
					</p>
				</div>
				<div class="p-1">
					<div v-if="notificationType === 'regular' && selectedUsers.length > 0" class="grid grid-cols-3 gap-4">
						<div
							v-for="user in selectedUsers"
							:key="user.id"
							class="border rounded-lg text-xs flex justify-center gap-x-1 items-center py-2.5"
						>
							<p class="text-white rounded-full bg-green-500 text-[10px] px-1 py-1"
							>
								{{ user?.fname?.slice?.(0, 1).toUpperCase() }}{{ user?.lname?.slice?.(0, 1).toUpperCase() }}
							</p>

							<p class="pl-3 text-xs">
								{{ user?.fname }}{{ user?.lname }}
							</p>
							<div class="flex justify-center items-center bg-white shadow-sm rounded-full border p-1 px-1.5">
								<span class="cursor-pointer text-xs text-center" @click="removeSelectedUser(user)">X</span>
							</div>
						</div>
					</div>
				</div>
				<div class="p-6">
					<ClientOnly>
						<QuillEditor v-model:content="notification.description" content-type="html" theme="snow" placeholder="Enter notification description" />
					</ClientOnly>
				</div>
				<div class="flex items-center justify-between px-6 pb-6">
					<div class="flex items-center gap-x-4">
						<label for="Toggle2" class="inline-flex items-center space-x-4 cursor-pointer dark:text-gray-100">
							<span class="relative">
								<input id="Toggle2" v-model="checked" type="checkbox" class="hidden peer" @change="toggleStory">
								<div class="w-10 h-4 rounded-full shadow dark:bg-gray-600 peer-checked:dark:bg-violet-400" />
								<div class="absolute left-0 w-6 h-6 rounded-full shadow -inset-y-1 peer-checked:right-0 peer-checked:left-auto dark:bg-violet-400" />
							</span>
						</label>

						<span class="pb-2 text-sm font-medium">
							Enable sms notification
						</span>
					</div>
					<div>
						<button :disabled="!isFormEmpty" :class="[!isFormEmpty ? 'opacity-25 cursor-not-allowed' : '']" class="btn-primary-sm"
							@click.prevent="notifyUsers">
							{{ creatingNotification ? 'Processing...' : 'Notify users' }}
						</button>
					</div>
				</div>
			</div>
		</div>
		<div class="p-6 space-y-6 lg:w-6/12">
			<div class="relative w-full">
				<div class="w-full">
					<input
						v-model.trim="search" type="text" placeholder="Search users" class="w-full px-3 py-3 placeholder-gray-400 bg-white border rounded-md outline-none " @keyup.enter.prevent="getUsersList()">
				</div>
				<div class="absolute top-1.5 right-3">
					<div class="flex w-full">
						<span class="text-xs">
							Filter by:
						</span>
						<select v-model="itemSelected" class="px-3 py-2 border text-xs rounded-lg outline-none w-full">
							<option value="all" class="text-xs">
								All
							</option>
							<option value="company" class="text-xs">
								Company
							</option>
						</select>
					</div>
				</div>
			</div>
			<div class="bg-white rounded-lg">
				<div v-if="itemSelected === 'all'" class="flex items-center justify-end pt-6 pb-6 pr-6 border-b gap-x-3">
					<p class="text-sm text-green-500">
						select all users
					</p>
					<input id="notify-all" v-model="notification.notifyAll" type="checkbox" class="form-checkbox rounded-full text-green7" @change="handleAllUsersSelection($event)">
				</div>
				<div v-if="itemSelected === 'company'" class="flex items-center justify-between  pt-6 pb-6 px-10 border-b gap-x-3 w-full">
					<div class="w-4/12">
						<label for="corporates" class="block mb-2 text-sm">Select Company</label>
					</div>
					<div class="w-8/12">
						{{ corporateId }}
						<select id="countries" v-model="corporateId" class="outline-none bg-gray-50 w-full border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  placeholder-gray-400 text-gray-900">
							<option v-for="(item, index) in corporatesList" :key="index" :value="item.id">
								{{ item.corporate_name }}
							</option>
						</select>
					</div>
				</div>
				<div v-if="!loading" class="px-10 pb-10 h-96 overflow-y-auto">
					<div v-for="(item, index) in updatedUsersList" :key="index" class="flex items-center justify-between py-6 border-b">
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
							<input type="checkbox" class="form-checkbox rounded-full text-green7" :checked="selectedUsers.find((user) => user.id === item.id) || notification.notifyAll" @change="selectUser($event, item)">
						</div>
					</div>
				</div>
				<Skeleton v-else height="119px" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { nextTick } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { useAlert } from '@/composables/core/notification'
import { useGetUsersList, useGetUserByCorporateId } from '@/composables/modules/users/fetch'
import { useQueryUsers } from '@/composables/modules/users/query'
import { useCreateNotification } from '@/composables/modules/users/notification'
import { useGetCorporateList } from '@/composables/modules/corporates/fetch'
const { getUsersList, loading, usersList } = useGetUsersList()
const { queryUsers, loadingQueriedUsers, queriedUsers } = useQueryUsers()
const { createNotifications, creatingNotification, message } = useCreateNotification()
const { getCorporatesList, loading: loadingCorporateList, corporatesList } = useGetCorporateList()
getCorporatesList()
definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated']
})
const corporateId = ref('')
useCreateNotification()

const updatedUsersList = computed(() => {
	return search.value.length ? queriedUsers.value : usersList.value
})
const router = useRouter()

const notificationType = ref('regular')
const itemSelected = ref('all')
let selectedUsers = reactive([])
const users = ref([])
const search = ref('')
const checked = ref('')
const notification = ref({
	isSms: false,
	title: '',
    notifyAll: false,
    description: ''
})
getUsersList()

      const processing = ref(false)
      const processingAll = ref(false)
      const errorProcessing = ref(false)

const isFormEmpty = computed(() => {
	return !!(notification.value.title && notification.value.description && (selectedUsers.length || users.value.length))
})
const toggleStory = () => {
      if (checked.value) {
        notification.value.isSms = true
      } else {
        notification.value.isSms = false
      }
    }

	watch(search, (olvVal, newVal) => {
		queryUsers(search.value)
	})

	const removeSelectedUser = (selectedUser) => {
      const index = selectedUsers.findIndex((user) => user.id === selectedUser.id)
      selectedUsers.splice(index, 1)
    }

	const selectUser = (e, item) => {
		if (e.target.checked) {
		 selectedUsers.push(item)
		}

		if (!e.target.checked) {
			const index = selectedUsers.findIndex((user) => user.id === item.id)
		if (index !== -1) {
			selectedUsers.splice(index, 1)
		}
		}
    }
	const isTitleEmpty = ref(false)

	const handleAllUsersSelection = (e) => {
      nextTick(() => {
        if (e.target.checked) {
          notificationType.value = 'all'
          selectedUsers = users.value
        } else {
          notificationType.value = 'regular'
          selectedUsers = []
		  users.value = []
        }
      })
    }

	const notifyUsers = () => {
      if (notification.value.description === '') {
		useAlert().openAlert({ type: 'ERROR', msg: 'Please enter notification message' })
        return
      }

      if (notification.value.title === '') {
        isTitleEmpty.value = true
		useAlert().openAlert({ type: 'ERROR', msg: 'Please enter notification title' })
      }
	  const payload = {
            body: `<html>${notification.value.description}</html>`,
            title: notification.value.title,
            sms: notification.value.isSms
          }

	  if (notificationType.value === 'all') {
		payload.user_ids = users.value.map((user:any) => user?.id)
        processingAll.value = true
      } else {
		payload.user_ids = selectedUsers.map((user:any) => user?.id)
        processing.value = true
      }

	  createNotifications(payload)
	 if (message) {
		useAlert().openAlert({ type: 'SUCCESS', msg: 'Notification was sent successfully.' })
		notification.value.title = ''
		notification.value.description = ''
	 } else {
		useAlert().openAlert({ type: 'ERROR', msg: 'Something went wrong while sending notification.' })
	 }
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

:deep(.ql-editor) {
	min-height: 200px;
  }
  :deep(.ql-toolbar.ql-snow) {
	border-top-left-radius: 5px;
	border-top-right-radius: 5px;
  }
  :deep(.ql-container.ql-snow) {
	border-bottom-left-radius: 5px;
	border-bottom-right-radius: 5px;
  }
</style>
