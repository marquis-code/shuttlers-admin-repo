import { useUser } from '@/composables/auth/user'

export default function isAuthenticated(route:any) {
	if (!useUser().isLoggedIn.value) {
		if (!route.fullPath.startsWith('/auth/'))
			useUser().redirect.value = route.fullPath
			return navigateTo('/auth/login')
	}
}
