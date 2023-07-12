import { useUser } from '@/composables/user'
const excludedPaths = [
	'/events/join-waitlist',
	'/events/book-event',
	'/auth/business'
	// '/events/create'
]

export default function isNotAuthenticated(route: any) {
	if (useUser().isLoggedIn.value) {
		return navigateTo('/dashboard')
	}
}
