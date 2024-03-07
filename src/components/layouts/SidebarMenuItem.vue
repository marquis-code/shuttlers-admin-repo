<template>
	<li v-if="!hasSubMenus(menu) && menu.shouldRedirect && !is_dev && !shouldNotRedirectToExternalUrl" class="nav-menu transite">
		<a href="#" @click="openAsExternalUrl(menu.oldPath)">
			<div class="nav-title">
				<span class="flex items-center">
					<component :is="menu.iconComponent" class="img" />
					<span class="text-sm">{{ menu.title }}</span>
				</span>
			</div>
		</a>
	</li>
	<nuxt-link v-else :to="menu.routePath ? { path: menu?.routePath } : { path: menu?.rootPath }" :custom="!!hasSubMenus(menu)">
		<template #default="{ isActive, href }">
			<li class="nav-menu transite"
				:class="{ 'nav-menu--open': menu.isOpen, 'nav-menu--expandable': hasSubMenus(menu), 'nav-menu--active': isActive || pathContainsRoot(menu?.rootPath) }">
				<template v-if="hasSubMenus(menu)">
					<div class="nav-title" @click="setChildrenElement(menu)">
						<span class="flex items-center">
							<component :is="menu.iconComponent" class="img" />
							<span class="text-sm">{{ menu.title }}</span>
						</span>
						<component :is="downIcon" class="float-right ml-auto w-4 transite -rotate-90"
							:class="[menu.isOpen ? 'rotate-180' : '']" />
					</div>
				</template>
				<template v-else>
					<a :href="href">
						<div class="nav-title">
							<span class="flex items-center">
								<component :is="menu.iconComponent" class="img" />
								<span class="text-sm">{{ menu.title }}</span>
							</span>
						</div>
					</a>
				</template>
			</li>
		</template>
	</nuxt-link>
</template>

<script setup>
import downIcon from '@/assets/icons/src/down.vue'
import { openAsExternalUrl, is_dev, shouldNotRedirectToExternalUrl } from '@/composables/utils/system'
import { setChildrenElement } from '@/utils/sidebar_controls'

const props = defineProps({
  menu: {
    type: Object,
    required: true
  },
  route: {
    type: Object,
    required: true
  }
})
const currentRoute = ref(props.route)

watch(() => props.route, (value) => {
  currentRoute.value = value
})

const hasSubMenus = (menu) => {
  return menu?.children?.length
}
const pathContainsRoot = (rootPath) => {
  if (rootPath === '/users') {
    return currentRoute.value.path.startsWith(rootPath) || currentRoute.value.path.startsWith('/bookings')
  }
  if (rootPath === '/routes') {
    return currentRoute.value.path.includes(rootPath) || currentRoute.value.path.startsWith('/trips') ||
      currentRoute.value.path.startsWith('/waitlist')
  }
  return currentRoute.value.path.includes(rootPath)
}
const excludedPathsIgnored = (submenu) => {
  if (submenu.excludedPaths && submenu.excludedPaths?.length) {
    return !Array.from(submenu.excludedPaths).includes(currentRoute.value.path)
  }
  return true
}

</script>

<style lang="scss">
$sh-neutral-600 : #737876;
$sh-green-500 : #20E682;

.nav-menu {
  color: $sh-neutral-600;
  padding: 0.625rem 1rem;
  border-radius: 0.5rem;
  position: relative;

  .nav-title {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    color: $sh-neutral-600;

    .img {
      $icon-dimension: 1.25rem;
      height: $icon-dimension;
      width: $icon-dimension;
      margin-right: .5rem;

      &.fe {
        font-size: $icon-dimension;

        &:before {
          margin-top: -0.25rem;
          display: block;
        }
      }
    }
  }

  .nav-submenus {
    transition: height .35s ease;
    padding-left: 2rem;
    max-height: 0;
    overflow: hidden;
  }

  .nav-submenu {
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 1.125rem;
    margin: 0.625rem 0;
    cursor: pointer;
    list-style-type: none;
    display: flex;
    width: 100%;
    position: relative;

    &::marker {
      font-weight: 700;
      font-size: 1rem;
    }

    a {
      // Overrides the default color on a tags for the router link
      color: var(--grey5);
      width: 100%;
    }

    &:hover,
    &--active {
      a {
        color: $sh-green-500;
      }
    }

    &--active {
      &:after {
        top: 0.05rem;
        bottom: 0.05rem;
        right: 0;
        left: auto;
        position: absolute;
        border-radius: 10px;
        border-right: 4px solid $sh-green-500;
        border-bottom: 0;
        content: "";
      }

    }
  }

  &:not(&--open):not(&--active):hover {
    & .nav-title {
      color: var(--grey5);
    }
  }

  &--open,
  &--active {
    .nav-title {
      color: var(--green);
    }
  }

  &--active {

    &:not(.nav-menu--open) {
      color: var(--green);

      &+.nav-menu--open {
        margin-top: 0.5rem;
      }

    }

  }

  &--open {
    color: var(--green);

    &:not(:last-of-type) {
      margin-bottom: .5rem;
    }

    .nav-title {
      font-weight: bold;
    }

    .nav-submenus {
      display: block;
      max-height: 20rem;
    }
  }

  &--open.nav-menu--expandable {
    padding-right: 0;

    & .nav-title,
    .nav-submenu {
      padding-right: 1rem;
    }
  }
}
</style>
