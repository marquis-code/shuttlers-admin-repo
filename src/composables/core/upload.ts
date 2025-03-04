import { useAlert } from '@/composables/core/notification'
import { uploadProgress, image_upload_api } from '@/api_factory/core/upload'

const bannerURL = ref('')
const bannerObject = ref({})
const bannerBase64 = ref('')

export const use_image_upload = () => {
    const uploadApi = async () => {
        try {
            const res = await image_upload_api.$_upload_api({
                mimetype: 'image/png',
                prefix: 'admin',
                filesB64: [bannerBase64.value.split(',')[1]]
            })
            if (res) {
                bannerURL.value = res.data.files[0].Location
            }
        } catch (e) {
            useAlert().openAlert({ type: 'ERROR', msg: 'Something went wrong, please try again' })
        }
    }

    return { uploadProgress, bannerURL, bannerObject, bannerBase64, uploadApi }
}

export const use_file_upload = () => {
    const upload = async (base64: string) => {
        try {
            const res = await image_upload_api.$_upload_api({
                mimetype: 'image/png',
                prefix: 'admin',
                filesB64: [base64.split(',')[1]]
            })
            if (res) {
                return res.data.files[0].Location
            }
        } catch (e) {
            useAlert().openAlert({ type: 'ERROR', msg: 'Something went wrong, please try again' })
        }
    }

    return { uploadProgress, upload }
}
