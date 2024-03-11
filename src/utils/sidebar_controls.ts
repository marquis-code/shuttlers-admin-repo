import { computed } from 'vue'
import { ADMIN_SIDEBAR_MENUS, OPS_AND_MANAGEMENT_SIDEBAR_MENUS, TOP_LEVEL_SIDEBAR_MENUS } from '@/utils/sidebar'

const mergedMenu = computed(() => {
    return [...TOP_LEVEL_SIDEBAR_MENUS, ...ADMIN_SIDEBAR_MENUS.value, ...OPS_AND_MANAGEMENT_SIDEBAR_MENUS] as any[]
})

const subMenuChildren = ref([])
const subMenuObject = ref({})

const computedSidebarMenus = computed(() => {
      const processedArray = mergedMenu.value.flatMap((item) => {
    if (item.children && item.children.length > 0) {
      const childrenWithParentName = item.children.map((child) => ({
        ...child,
        isChild: true,
        parentName: item.title
      }))
      return [{ ...item, isChild: false, children: undefined }, ...childrenWithParentName]
    } else {
      return { ...item, isChild: false }
    }
      })
      return processedArray
})

export const showPrimaryMenuRef = ref(true)

export const isCurrentRouteAChild = computed(() => {
  const currentRouteUrl = useRoute().path
return computedSidebarMenus.value.some((item) => item.isChild && item.routePath === currentRouteUrl)
})

watch(() => useRoute().path, () => {
  if (isCurrentRouteAChild.value) {
    showPrimaryMenuRef.value = false
  } else {
    showPrimaryMenuRef.value = true
  }
}, { immediate: true })

export const currentRouteObject = computed(() => {
if (Object.keys(subMenuObject.value).length > 0) return subMenuObject.value
  return computedSidebarMenus.value.find((item) => item.routePath === useRoute().path)
})

export const parentOfTheCurrentRouteChildren = computed(() => {
  if (subMenuChildren.value.length > 0) return subMenuChildren.value
  if (!currentRouteObject.value) return []
  const res = mergedMenu.value.find((item) => item.title === currentRouteObject.value?.parentName)
  return res?.children
})

export const setChildrenElement = (menu) => {
  subMenuChildren.value = menu.children
  subMenuObject.value = menu
  showPrimaryMenuRef.value = false
}
