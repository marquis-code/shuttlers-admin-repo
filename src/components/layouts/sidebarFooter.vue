<template>
	<div class="sidebar-footer hidden md:block mt-auto">
		<div v-if="currentUser" id="sidebarUser" class="user-box">
			<div class="avatar avatar-sm w-auto">
				<router-link class="flex items-center" :to="`/admin/${currentUser.id}/info`" title="View your profile">
					<div class="w-10 h-10 flex-1 ">
						<img v-if="currentUser.avatar" :src="currentUser.avatar" alt="Avatar" class="avatar-img rounded-full">
						<div v-else class="avatar-title rounded-full w-10 h-10 !bg-purp02 !text-black">
							{{ getInitials(currentUser.fname, currentUser.lname) }}
						</div>
					</div>
					<div class="flex flex-col">
						<span class="name ml-2">{{ currentUser.fname }}</span>
						<span class="name ml-2 truncate w-24 text-grey5">{{ currentUser.email }}</span>
					</div>
				</router-link>
			</div>
			<span class="icon" title="Logout" @click="signOutFunction()">
				<component :is="logoutIcon" class="img" />
			</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import logoutIcon from '@/assets/icons/src/logoutIcon.vue'

const getInitials = (string1, string2) => {
    if (!string1 || !string2) {
        return ''
    }
    const initials = string1[0] + string2[0]
    return initials.toUpperCase()
}

const props = defineProps({

    signOutFunction: {
        type: Function as PropType<() => void>,
        required: true
    },
    currentUser: {
        type: Object,
        required: true
    }

})
</script>

<style scoped>

</style>
