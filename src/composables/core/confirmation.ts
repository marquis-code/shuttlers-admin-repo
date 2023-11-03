import { useCoreModal } from './modals'

const confirmationState = {
	description: ref(''),
    title: ref(''),
    type: ref('Alert'),
    call_function: ref(() => { }),
    loading: ref(false)
}

const passwordConfirmationState = {
	description: ref(''),
    title: ref(''),
    type: ref('Alert'),
    call_function: ref(() => { }),
    loading: ref(false),
    password: ref('')
}

interface AlertTypes {
	type: 'DANGER' | 'NORMAL' | 'SUCCESS'
	desc: string
    title: string
    call_function: () => void
    loading: Ref<boolean>,
    password?: Ref<string>
}

export const useConfirmationModal = () => {
    const { openConfirm, closeConfirm } = useCoreModal()
    const openAlert = ({ type, desc, call_function, title, loading }: AlertTypes) => {
		confirmationState.type.value = type
        confirmationState.description.value = desc
        confirmationState.title.value = title
        confirmationState.call_function.value = call_function
        confirmationState.loading = loading

        openConfirm()
	}
	const closeAlert = () => {
        confirmationState.description.value = ''
        confirmationState.title.value = ''
        confirmationState.call_function.value = () => { }
        closeConfirm()
	}

	return { ...confirmationState, openAlert, closeAlert }
}
export const usePasswordConfirmationModal = () => {
    const { openPasswordConfirm, closePasswordConfirm } = useCoreModal()
    const openAlert = ({ type, desc, call_function, title, loading, password = ref('') }: AlertTypes) => {
		passwordConfirmationState.type.value = type
        passwordConfirmationState.description.value = desc
        passwordConfirmationState.title.value = title
        passwordConfirmationState.call_function.value = call_function
        passwordConfirmationState.loading = loading
        passwordConfirmationState.password = password

        openPasswordConfirm()
	}
	const closeAlert = () => {
        passwordConfirmationState.description.value = ''
        passwordConfirmationState.title.value = ''
        passwordConfirmationState.call_function.value = () => { }
        passwordConfirmationState.password.value = ''

        closePasswordConfirm()
	}

	return { ...passwordConfirmationState, openAlert, closeAlert }
}
