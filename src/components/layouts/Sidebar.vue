<template>
	<Sidebar :data="SidebarData" :sign-out-function="useAuthModal().openLogout" :current-user="user" :route="$route" />
</template>

<script setup lang="ts">
import Sidebar from './sidebarComp.vue'
import { ADMIN_SIDEBAR_MENUS, getSidebarMenus, OPS_AND_MANAGEMENT_SIDEBAR_MENUS, TOP_LEVEL_SIDEBAR_MENUS } from '@/utils/sidebar'
import { useUser } from '@/composables/auth/user'
import { currentUserPermission } from '@/composables/core/permission'
import logoIcon from '@/assets/icons/src/logo.vue'
import menuIcon from '@/assets/icons/src/menu.vue'
import { useAuthModal } from '@/composables/core/modals'
const { user } = useUser()

const permissionModules = currentUserPermission.value

const topLayerMenus = ref(getSidebarMenus(TOP_LEVEL_SIDEBAR_MENUS, permissionModules, (user.value.role || 'user')))
const featureMenus = ref(getSidebarMenus(OPS_AND_MANAGEMENT_SIDEBAR_MENUS, permissionModules, (user.value.role || 'user')))
const adminMenus = ref(getSidebarMenus(ADMIN_SIDEBAR_MENUS, permissionModules, (user.value.role || 'user')))

const SidebarData = {
  logoIcon,
  menuIcon,
  menuList: [
    {
      title: '',
      menus: topLayerMenus
    },
    {
      title: 'Manage',
      menus: featureMenus
    },
    {
      title: 'Admin',
      menus: adminMenus
    }
  ]
}
</script>

<style scoped>

</style>
