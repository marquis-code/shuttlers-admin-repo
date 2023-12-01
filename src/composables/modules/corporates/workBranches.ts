import { corporates_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { convertObjWithRefToObj } from '@/composables/utils/formatter'
import { useCorporateIdDetails } from '@/composables/modules/corporates/id'
const { selectedCorporate } = useCorporateIdDetails()
const createWorkBranchForm = {
  name: ref(''),
  address: ref(''),
  location: ref(''),
  description: ref('')
}

const isEditBranch = ref(false)

export const useCreateWorkBranch = () => {
  const loading = ref(false)

  const createWorkBranch = async () => {
    loading.value = true
    const res = (await corporates_api.$_create_work_branch(
      selectedCorporate.value.id,
      convertObjWithRefToObj(createWorkBranchForm)
    )) as CustomAxiosResponse
    if (res.type !== 'ERROR') {
      useRouter().push('/companies')
      useAlert().openAlert({
        type: 'SUCCESS',
        msg: 'New work branch created successfully'
      })
    }
    loading.value = false
  }

  const updateWorkBranch = async (id: number) => {
    loading.value = true
    const res = (await corporates_api.$_update_work_branch(
      selectedCorporate.value.id,
      convertObjWithRefToObj(createWorkBranchForm),
      id
    )) as CustomAxiosResponse
    if (res.type !== 'ERROR') {
      useRouter().push('/companies')
      useAlert().openAlert({
        type: 'SUCCESS',
        msg: 'Work branch updated successfully'
      })
    }
    loading.value = false
  }

  const deleteWorkBranch = async (id: number) => {
    loading.value = true
    const res = (await corporates_api.$_delete_work_branch(
      selectedCorporate.value.id,
      id
    )) as CustomAxiosResponse
    if (res.type !== 'ERROR') {
      useRouter().push('/companies')
      useAlert().openAlert({
        type: 'SUCCESS',
        msg: 'Work branch was deleted successfully'
      })
    }
    loading.value = false
  }

  const populateWorkBranch = (data: any) => {
    createWorkBranchForm.name.value = data.name
    createWorkBranchForm.address.value = data.address
    createWorkBranchForm.location.value = data.location
    createWorkBranchForm.description.value = data.description
  }

  return {
    createWorkBranchForm,
    loading,
    createWorkBranch,
    populateWorkBranch,
    deleteWorkBranch,
    updateWorkBranch,
    isEditBranch
  }
}

export const useWorkBranches = () => {
  const loading = ref(false)
  const workBranches = ref([] as any)
  const fetchWorkBranches = async (id) => {
    loading.value = true
    const res = await corporates_api.$_get_work_branches(id) as CustomAxiosResponse
    if (res.type !== 'ERROR') {
        workBranches.value = res.data.data
    }
    loading.value = false
  }
  return { fetchWorkBranches, loading, workBranches }
}
