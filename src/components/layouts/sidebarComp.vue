<template>
	<aside class="sidebar">
		<div class="sidebar-header">
			<router-link to="/">
				<component :is="data.logoIcon" class="img" />
			</router-link>
			<button ref="menuToggle" type="button" class="hidden">
				<component :is="data.menuIcon" class="img w-8" />
			</button>
		</div>
		<label for="redirect" class="ml-5">
			<input id="redirect" v-model="shouldNotRedirectToExternalUrl" type="checkbox" class="form-checkbox">
			<span>Shouldn't Redirect</span>
		</label>
		<div class="sidebar-menus">
			<ul class="nav">
				<li v-for="main in data.menuList" :key="main.menus">
					<label v-if="main.title" class="navbar-label">{{ main.title }}</label>
					<!-- eslint-disable-next-line vue/no-v-for-template-key -->
					<template v-for="(menu, index) in main.menus.value" :key="`${index}_system`">
						<sidebar-menu :menu="menu" :route="route" />
					</template>
				</li>
			</ul>
		</div>
		<div class="sidebar-footer hidden md:block">
			<div v-if="currentUser" id="sidebarUser" class="user-box">
				<div class="avatar avatar-sm w-auto">
					<router-link class="flex items-center" to="/profile" title="View your profile">
						<div class="w-10 h-10 flex-1 ">
							<img v-if="currentUser.avatar" :src="currentUser.avatar" alt="Avatar" class="avatar-img rounded-full">
							<div v-else class="avatar-title rounded-full w-10 h-10">
								{{ getInitials(currentUser.fname, currentUser.lname) }}
							</div>
						</div>

						<span class="name ml-2">{{ currentUser.fname }}</span>
					</router-link>
				</div>
				<span class="icon" title="Logout" @click="signOutFunction()">
					<component :is="logoutIcon" class="img" />
				</span>
			</div>
		</div>
	</aside>
</template>

<script setup lang='ts'>
import { watch } from 'vue'
import SidebarMenu from './SidebarMenuItem.vue'
import logoutIcon from '@/assets/icons/src/logoutIcon.vue'
import { shouldNotRedirectToExternalUrl } from '@/composables/utils/system'

const getInitials = (string1, string2) => {
    if (!string1 || !string2) {
        return ''
    }
    const initials = string1[0] + string2[0]
    return initials.toUpperCase()
}

const props = defineProps({
    data: {
        type: Object,
        required: true
    },
    signOutFunction: {
        type: Function as PropType<() => void>,
        required: true
    },
    currentUser: {
        type: Object,
        required: true
    },
    route: {
        type: Object,
        required: true
    }
})
watch(
    () => props.route,
    (value) => { resetMenus() }
)

const pathContainsRoot = (rootPath) => {
    if (rootPath === '/users') {
        return props.route.path.startsWith(rootPath) || props.route.path.startsWith('/bookings')
    }
    if (rootPath === '/routes') {
        return (
            props.route.path.includes(rootPath) ||
            props.route.path.startsWith('/trips') ||
            props.route.path.startsWith('/waitlist')
        )
    }
    return props.route.path.includes(rootPath)
}
const isRouteActive = (menu) => {
    return props.route.matched.findIndex((opt) => opt.name === menu.routePath) > -1
}
const resetMenus = () => {
    props.data.menuList.forEach((main_menu) => {
        main_menu.menus.value.forEach((menu) => {
            if (menu.isOpen) {
                if (!isRouteActive(menu) && !pathContainsRoot(menu.rootPath)) {
                    menu.isOpen = false
                }
            }
        })
    })
}

</script>

<style lang="scss" scoped>
$sh-neutral-400 : #ACAFAE;
$sh-gray-9: #E5E9F2;
$sh-green-900 : #006633;
$sh-gray-3: #444854;
$sidebar-width: 14rem;
$content-area-width: calc(100vw - 14rem);

.avatar {
  position: relative;
  display: inline-block;
  width: 3rem;
  height: 3rem;
  font-size: 1rem;
}

.avatar-sm {
  width: 2.5rem;
  height: 2.5rem;
  font-size: 0.8333333333rem;
}
.avatar-img {
  width: 100%;
  height: 100%;
  -o-object-fit: cover;
     object-fit: cover;
}
.avatar-title {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #244166;
    color: #FFFFFF;
}

.sidebar {
    border-bottom: 1px solid $sh-neutral-400;

    .sidebar-header {
        padding: 1rem 1.25rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        //background-color: transparentize(colors.$sh-green-50, 0.6);
    }

    .sidebar-menus {
        padding: 1rem 1rem;
        margin: 0;

        &:before {
            display: none;
        }
    }

    .sidebar-footer {
        padding: 1rem;

        .user-box {
            background: transparentize($sh-green-900, 0.9);
            border-radius: 0.625rem;
            padding: 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .name {
                font-weight: 500;
                font-size: 14px;
                line-height: 20px;
                color: $sh-gray-3;
            }

            & .avatar-online::before {
                z-index: 1;
            }

            & .icon {
                cursor: pointer;
            }
        }
    }

    .nav {
        flex-direction: column;
        width: 100%;
    }

    .navbar-label {
        font-weight: 500;
        font-size: 0.6875rem;
        line-height: 1.25rem;
        letter-spacing: 0.04em;
        color: $sh-neutral-400;
        padding-left: 0.5rem;
        text-transform: uppercase;
        margin-bottom: 0;
        margin-top: 0.5rem;
    }

    @media screen and (min-width: 768px) {
        width: $sidebar-width;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        height: 100vh;
        overflow: auto;
        border-right: 1px solid $sh-gray-9;
        border-bottom: none;

        .sidebar-header {
            padding: 1.5rem 1.25rem;
        }

        .sidebar-menus {
            display: flex !important;
        }
    }
}
</style>
