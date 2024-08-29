import { useFetchGroup } from './fetch'
import { useCorporateGroupDetails } from './id'
import { corporates_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useCompaniesModal } from '@/composables/core/modals'
import { useAlert } from '@/composables/core/notification'

const loading = ref(false)
const credential = {
    name: ref(''),
    isEdit: ref(false),
    id: ref('')
}

const clearObj = () => {
    credential.name.value = ''
    credential.isEdit.value = false
}

export const useCreateGroup = () => {
    const createGroup = async () => {
        loading.value = true
        const corporate_id = useRoute().params.id as string
        const payload = {
            name: credential.name.value
        }
        const res = await corporates_api.$_create_corporate_group(Number(corporate_id), payload) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useAlert().openAlert({
                type: 'SUCCESS',
                msg: 'Corporate group was successfully created'
              })
            useCompaniesModal().closeCreateCorporateGroup()
            useFetchGroup().fetchGroup()
        }
        loading.value = false
    }

    const initEditGroup = (data:Record<string, any>) => {
        credential.name.value = data?.name
        credential.id.value = data?.id
        credential.isEdit.value = true
        useCompaniesModal().openCreateCorporateGroup()
    }

    const editGroup = async () => {
        loading.value = true
        const corporate_id = useRoute().params.id as string
        const payload = {
            name: credential.name.value
        }
        const res = await corporates_api.$_edit_corporate_group_by_id(corporate_id, credential.id.value, payload) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useAlert().openAlert({
                type: 'SUCCESS',
                msg: 'Corporate group was successfully updated'
              })
            useCompaniesModal().closeCreateCorporateGroup()
            useFetchGroup().fetchGroup()
            useCorporateGroupDetails().getGroupDetails()
        }
        loading.value = false
    }

    return { loading, ...credential, clearObj, createGroup, initEditGroup, editGroup }
}
