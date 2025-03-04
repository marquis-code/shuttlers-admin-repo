<template>
	<section class="flex iten-center justify-between px-4 fixed top h-[80px]  inset-x-0 md:hidden">
		<Icon class="w-12 cursor-pointer" name="menu" @click="showSidebarOnMobile = true" />
		<router-link class="flex items-center" :to="`/admin/${currentUser.id}/info`" title="View your profile">
			<div class="w-10 h-10 flex-1 ">
				<img v-if="currentUser.avatar" :src="currentUser.avatar" alt="Avatar" class="avatar-img rounded-full">
				<div v-else class="avatar-title rounded-full w-10 h-10 !bg-purp02 !text-black">
					{{ getInitials(currentUser.fname, currentUser.lname) }}
				</div>
			</div>
		</router-link>
	</section>
	<transition name="fade" appear>
		<section v-if="showSidebarOnMobile || largerThanMd">
			<div class="bg-black bg-opacity-30 fixed inset-0 z-[50] md:hidden" @click="showSidebarOnMobile = false" />
			<transition name="sidebar" appear>
				<aside v-if="showPrimaryMenuRef" id="sidebar_main" class="sidebar overflow-auto h-full min-h-screen md:block fixed  z-[50]" aria-label="Sidebar">
					<div class="sidebar-header">
						<router-link to="/">
							<component :is="data.logoIcon" class="img" />
						</router-link>
						<button ref="menuToggle" type="button" class="md:hidden">
							<Icon class="w-7 cursor-pointer" name="closed" @click="showSidebarOnMobile = false" />
						</button>
					</div>

					<div class="sidebar-menus">
						<ul class="nav">
							<li v-for="main in data.menuList" :key="main.menus">
								<label v-if="main.title" class="navbar-label">{{
									main.title
								}}</label>
								<!-- eslint-disable-next-line vue/no-v-for-template-key -->
								<template v-for="(menu, index) in main.menus.value" :key="`${index}_system`">
									<sidebar-menu :menu="menu" :route="route" />
								</template>
							</li>
						</ul>
					</div>
					<layouts-sidebar-footer
						:current-user="currentUser"
						:sign-out-function="signOutFunction"
					/>
				</aside>

				<aside v-else class="sidebar h-full flex flex-col md:block fixed z-[50]" aria-label="Sidebar">
					<button
						class="sidebar-header flex gap-1 items-center !justify-normal"
						@click="showPrimaryMenuRef = true"
					>
						<icon name="down" class="w-6 rotate-90" />
						<span class="font-bold text-xl">{{
							currentRouteObject?.parentName || currentRouteObject?.title
						}}</span>
					</button>
					<ul class="nav-menu">
						<span
							v-for="(menu, submenuIndex) in parentOfTheCurrentRouteChildren"
							:key="submenuIndex"
						>
							<li class="nav-menu transite">
								<nuxt-link :to="menu.routePath">
									<div class="nav-title">
										<span class="flex items-center">
											<component :is="menu.iconComponent ?? routeIcon" class="img" />
											<span class="text-sm">{{ menu.title }}</span>
										</span>
									</div>
								</nuxt-link>
							</li>
						</span>
					</ul>
					<layouts-sidebar-footer
						:current-user="currentUser"
						:sign-out-function="signOutFunction"
					/>
				</aside>
			</transition>
		</section>
	</transition>
</template>

<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import SidebarMenu from './SidebarMenuItem.vue'
import routeIcon from '@/assets/icons/src/compass.vue'
import { currentRouteObject, showPrimaryMenuRef, showSidebarOnMobile, parentOfTheCurrentRouteChildren } from '@/utils/sidebar_controls'

const breakpoints = useBreakpoints(breakpointsTailwind)
const largerThanMd = breakpoints.greater('md')

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
	(value) => {
		resetMenus()
	}
)

const pathContainsRoot = (rootPath) => {
	if (rootPath === '/users') {
		return (
			props.route.path.startsWith(rootPath) ||
			props.route.path.startsWith('/bookings')
		)
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
	return (
		props.route.matched.findIndex((opt) => opt.name === menu.routePath) > -1
	)
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

const getInitials = (string1, string2) => {
    if (!string1 || !string2) {
        return ''
    }
    const initials = string1[0] + string2[0]
    return initials.toUpperCase()
}
</script>

<style lang="scss">
$sh-neutral-400: #acafae;
$sh-gray-9: #e5e9f2;
$sh-green-900: #006633;
$sh-gray-3: #444854;
$sidebar-width: 14rem;
$content-area-width: calc(100vw - 14rem);

.sidebar-enter-active,
.sidebar-leave-active {
	transition: all 0.5s ease;
}
.sidebar-enter-from,
.sidebar-leave-to {
	transform: translateX(-172px);
	opacity: 0;
}

.avatar {
	position: relative;
	display: inline-block;
	width: 3rem;
	height: 3rem;
	font-size: 1rem;
}

.router-link-active.router-link-exact-active > * {
	color: var(--green) !important;
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
}

.sidebar {
	@apply border-r-2 md:border-0 shadow-md md:shadow-none w-9/12;
	background-color: var(--grey11);
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
		padding: 1rem 0.5rem;

		.user-box {
			border-top: 1px solid #e5e9f2;
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
		// border-right: 1px solid $sh-gray-9;
		border-bottom: none;
		* {
			scrollbar-color: var(--light_primary);
		}

		.sidebar-header {
			padding: 1.5rem 1.25rem;
		}

		.sidebar-menus {
			display: flex !important;
		}
	}
}

</style>

<style scoped>
	.sidebar::-webkit-scrollbar {
		width: 0px;
	}
</style>
