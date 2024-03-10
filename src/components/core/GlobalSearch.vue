<template>
	<div v-if="isVisible" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center"
		@click.self="closeSearch">
		<div class="w-full max-w-md mt-20">
			<input v-model="searchQuery" type="text" placeholder="Type and hit 'Enter' to search..." class="w-full p-2"
				@keydown.esc="closeSearch">
			<ul v-if="filteredItems.length" class="mt-1 bg-white shadow overflow-auto max-h-60">
				<li v-for="item in filteredItems" :key="item.routePath" class="p-2 hover:bg-gray-200 cursor-pointer"
					@click="navigateTo(item.routePath)">
					{{ item.title }}
				</li>
			</ul>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { TOP_LEVEL_SIDEBAR_MENUS, OPS_AND_MANAGEMENT_SIDEBAR_MENUS, ADMIN_SIDEBAR_MENUS } from '@/utils/sidebar'

const isVisible = ref(false)
const searchQuery = ref('')
const router = useRouter()

const allMenus = computed(() => [
    ...TOP_LEVEL_SIDEBAR_MENUS,
    ...OPS_AND_MANAGEMENT_SIDEBAR_MENUS,
    ...ADMIN_SIDEBAR_MENUS.value
])

const filteredItems = computed(() =>
    allMenus.value
        .flatMap((menu) => [menu, ...(menu.children || [])])
        .filter((item) => item.title.toLowerCase().includes(searchQuery.value.toLowerCase()))
)

const toggleVisibility = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        isVisible.value = true
    }
}

const closeSearch = () => {
    isVisible.value = false
    searchQuery.value = ''
}

const navigateTo = (path: string | null) => {
    if (path) {
        router.push(path)
    }
    closeSearch()
}

window.addEventListener('keydown', toggleVisibility)

</script>

<style scoped>
/* Your styles here */
</style>
