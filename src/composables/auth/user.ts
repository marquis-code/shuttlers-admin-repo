import { ref, computed } from '@vue/reactivity'
import { useStorage } from '@vueuse/core'

const runtimeData = {
	auth: ref(),
	user: ref({} as any),
	token: ref(''),
	redirect: ref()
}
const localstorageDate = {
	auth: ref(),
	user: useStorage('user', {} as any),
	token: useStorage('token', ''),
	redirect: useStorage('redirect', '')
}
watch(runtimeData.user, (val) => {
	Object.keys(val).forEach((key) => {
		localstorageDate.user.value[key] = val[key]
	})
}, { deep: true });

(() => {
	runtimeData.auth.value = localstorageDate.auth.value
	runtimeData.user.value = localstorageDate.user.value
	runtimeData.token.value = localstorageDate.token.value
	runtimeData.redirect.value = localstorageDate.redirect.value
})()

export const REDIRECT_URL = import.meta.env.VITE_REDIRECT_URL as string

export const useUser = () => {
	const id = computed({
		get: () => runtimeData?.auth?.value?.id ?? '', set: () => { }
	})

	const isLoggedIn = computed({
		get: () => {
			if (!runtimeData.token?.value) return false
			return runtimeData?.user?.value != null || undefined || {}
		},
		set: () => { }
	})
	const logOut = () => {
		localStorage.clear()
		runtimeData.user.value = null
		location.href = '/auth/login'
	}
	const setToken = (token: string) => {
		runtimeData.token.value = token
		localstorageDate.token.value = token
	}
	const createUser = (user: any) => {
		runtimeData.user.value = user
		localstorageDate.token.value = user?.token?.token
		runtimeData.token.value = user?.token?.token
	}
	const updateUser = (user: any) => {
		runtimeData.user.value = user
		localstorageDate.user.value = user
	}
		const setRedirect = (redirect: string) => {
		runtimeData.redirect.value = redirect
		localstorageDate.redirect.value = redirect
	}

	return { id, isLoggedIn, createUser, ...runtimeData, logOut, updateUser, setToken, setRedirect }
}
