<template>
	<div class="lg:flex justify-between space-y-10 lg:space-y-0">
		<div class="lg:w-6/12 p-6 space-y-6">
			<div class="w-full">
				<input type="text" placeholder="Enter notification title" class=" py-3 rounded-md px-4 bg-white placeholder-gray-400 outline-none border w-full">
			</div>
			<div class="w-full rounded-lg bg-white">
				<div class="flex justify-between items-center border-b pr-6 py-3">
					<div>
						<input type="text" placeholder="Add users" class="outline-none pl-4 bg-white">
					</div>
					<p class="bg-gray-200 rounded-full px-3 py-2.5 text-xs font-medium">
						0 user selected
					</p>
				</div>
				<div class="p-6">
					<ModulesUsersTextEditor />
				</div>
				<div class="flex justify-between items-center px-6 pb-6">
					<div class="flex items-center gap-x-4">
						<div class="">
							<label for="AcceptConditions" class="relative h-8 w-14 cursor-pointer">
								<input id="AcceptConditions" type="checkbox" class="peer sr-only">

								<span
									class="absolute inset-0 rounded-full bg-gray-300 transition peer-checked:bg-green-500"
								/>

								<span
									class="absolute inset-y-0 start-0 m-1 h-6 w-6 rounded-full bg-white transition-all peer-checked:start-6"
								/>
							</label>
						</div>
						<span class="font-medium text-sm pb-2">
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
		<div class="lg:w-6/12 p-6 space-y-6">
			<div class="w-full relative">
				<div class="w-full">
					<input type="text" placeholder="Search users" class=" py-3 rounded-md px-3 bg-white placeholder-gray-400 outline-none border w-full">
				</div>
				<div class="absolute top-1.5 right-3">
					<div class="flex items-center gap-x-3">
						<p class="text-sm">
							Filter by:
						</p>
						<select class="border outline-none px-3 py-2 text-sm rounded-full">
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
			<div class="rounded-lg bg-white">
				<div class="flex justify-end items-center gap-x-3 border-b pb-6 pr-6 pt-6">
					<p class="text-sm text-green-500">
						select all users
					</p>
					<input type="checkbox">
				</div>
				<div class="px-10 pb-10">
					<div v-for="({name, email, phone}, index) in users" :key="index" class="flex justify-between items-center border-b py-6">
						<div class="flex items-center gap-x-3">
							<div class="flex justify-center items-center bg-gray-300 text-center text-white rounded-full h-10 w-10">
								<span class="text-sm">{{ name }}</span>
							</div>
							<div>
								<p class="text-sm font-medium">
									{{ email }}
								</p>
								<p class="text-sm">
									{{ phone }}
								</p>
							</div>
						</div>
						<div>
							<input type="checkbox">
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
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
