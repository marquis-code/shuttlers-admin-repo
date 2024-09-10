import { GATEWAY_ENDPOINT_WITH_AUTH, GATEWAY_ENDPOINT_WITH_AUTH_FORM_DATA } from '@/api_factory/axios.config'

export const uploadProgress = ref(0)

export const image_upload_api = {
    $_upload_api: (credential: any) => {
        const url = '/files'
        uploadProgress.value = 0
        return GATEWAY_ENDPOINT_WITH_AUTH.post(url, credential, {
            onUploadProgress: (progressEvent: any) => {
                uploadProgress.value = Math.round(
                    (progressEvent.loaded / progressEvent.total) * 100
                )
            }
        })
    },
    $_upload_image: (formData:any) => {
        const url = '/upload/identity/files'
        return GATEWAY_ENDPOINT_WITH_AUTH_FORM_DATA.post(url, formData)
    }
}
