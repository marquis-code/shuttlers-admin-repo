import { useCoreModal } from './modals'

const confirmationState = {
	description: ref(''),
    title: ref(''),
    type: ref('Alert'),
    call_functuon: ref(() => { }),
    loading: ref(false)
}

const passwordConfirmationState = {
	description: ref(''),
    title: ref(''),
    type: ref('Alert'),
    call_functuon: ref(() => { }),
    loading: ref(false),
    password: ref('')
}

interface AlertTypes {
	type: 'DANGER' | 'NORMAL' | 'SUCCESS'
	desc: string
    title: string
    call_functuon: () => void
    loading: Ref<boolean>
}

export const useConfirmationModal = () => {
    const { openConfirm, closeConfirm } = useCoreModal()
    const openAlert = ({ type, desc, call_functuon, title, loading }: AlertTypes) => {
		confirmationState.type.value = type
        confirmationState.description.value = desc
        confirmationState.title.value = title
        confirmationState.call_functuon.value = call_functuon
        confirmationState.loading = loading

        openConfirm()
	}
	const closeAlert = () => {
        confirmationState.description.value = ''
        confirmationState.title.value = ''
        confirmationState.call_functuon.value = () => { }
        closeConfirm()
	}

	return { ...confirmationState, openAlert, closeAlert }
}
export const usePasswordConfirmationModal = () => {
    const { openPasswordConfirm, closePasswordConfirm } = useCoreModal()
    const openAlert = ({ type, desc, call_functuon, title, loading }: AlertTypes) => {
		passwordConfirmationState.type.value = type
        passwordConfirmationState.description.value = desc
        passwordConfirmationState.title.value = title
        passwordConfirmationState.call_functuon.value = call_functuon
        passwordConfirmationState.loading = loading

        openPasswordConfirm()
	}
	const closeAlert = () => {
        passwordConfirmationState.description.value = ''
        passwordConfirmationState.title.value = ''
        passwordConfirmationState.call_functuon.value = () => { }
        closePasswordConfirm()
	}

	return { ...passwordConfirmationState, openAlert, closeAlert }
}
