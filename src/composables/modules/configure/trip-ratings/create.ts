import { configure_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'

const categoryConfigFormInput = reactive({
    issues: ref([]),
    name: ref('')
})

const configureCategoryObj = {
	settings_id: ref(''),
	name: ref('')
}

export const useConfigureTripRatings = () => {
    const loading = ref(false)
    const resType = ref('') as any
	const configureTripRating = async () => {
		loading.value = true
		const res = await configure_api.$_create_trip_rating_catogory(configureCategoryObj) as CustomAxiosResponse
        resType.value = res?.type
        if (res.type !== 'ERROR') {
            const newlyCreatedCategory = res.data.data
             categoryConfigFormInput.issues.map(async (issue) => {
                const payload = {
                    name: issue,
                    settings_id: newlyCreatedCategory.settings_id,
                    category_id: newlyCreatedCategory.reference
                }
                await configure_api.$_create_trip_rating_options(payload) as CustomAxiosResponse
            })
			useAlert().openAlert({ type: 'SUCCESS', msg: 'Category has been created successfully' })
        }
		loading.value = false
	}

    const populateCategoryObject = (data: any) => {
        configureCategoryObj.name = data.name
        configureCategoryObj.settings_id = data.settings_id
    }

    const populateCategoryConfigFormInput = (data: any) => {
        categoryConfigFormInput.name = data.name
        categoryConfigFormInput.issues = data.issues
    }

	return { populateCategoryObject, resType, populateCategoryConfigFormInput, loading, configureTripRating, configureCategoryObj, categoryConfigFormInput }
}
