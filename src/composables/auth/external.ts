import { useUser, REDIRECT_URL } from '../auth/user'
import { useAlert } from '@/composables/core/useNotification'
import { auth_api } from '@/api_factory/modules/auth'

const { updateUser, setToken } = useUser()
const error = ref('')

export const useSignInUserExternally = () => {
    const sign_user_in = async (token: string, redirect = '/dashboard/events/manage/upcoming') => {
        error.value = ''
        if (!token) {
            error.value = 'Missing token'
            return
        }
        console.log(token)
        await setToken(token)

        const res = await auth_api.$_getUserProfile() as any

        if (res !== 'ERROR') {
            updateUser(res.data)
            useRouter().push(redirect)
        } else {
            error.value = 'Unable to fetch user profile'
        }
    }

    return { sign_user_in, error }
}

// {
//     "id": 17280,
//     "corporate_id": null,
//     "fname": "Anthony",
//     "lname": "Akpan",
//     "email": "akpananthony33@gmail.com",
//     "phone": "08146923944",
//     "active": "1",
//     "avatar": null,
//     "code": "375eb8d0-f083-11ed-b1d9-513d8193605d-17280",
//     "created_at": "2023-01-10 18:20:46",
//     "updated_at": "2023-06-27 08:47:41",
//     "gender": "male",
//     "dob": "2001-02-17 00:00:00.000",
//     "car_owner": "0",
//     "nfc_id": null,
//     "staff_id": null,
//     "client_id": null,
//     "location": null,
//     "verified_at": null,
//     "city_id": 25,
//     "login_remote_address": "172.20.40.20",
//     "login_date_time": "2023-06-27T00:00:00.000Z",
//     "login_is_successful": 1,
//     "blocked_reason": null,
//     "is_blocked": 0,
//     "blocked_at": null,
//     "sign_up_source": "web",
//     "country_code": "NG",
//     "phone_verified_at": null,
//     "deleted_at": null,
//     "delete_reason": null,
//     "is_email_notification_enabled": 1,
//     "token": {
//         "iat": 1688993625,
//         "exp": 1720529625,
//         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcyODAsImNvcnBvcmF0ZV9pZCI6bnVsbCwiZm5hbWUiOiJBbnRob255IiwibG5hbWUiOiJBa3BhbiIsImVtYWlsIjoiYWtwYW5hbnRob255MzNAZ21haWwuY29tIiwicGhvbmUiOiIwODE0NjkyMzk0NCIsImFjdGl2ZSI6IjEiLCJhdmF0YXIiOm51bGwsImNvZGUiOiIzNzVlYjhkMC1mMDgzLTExZWQtYjFkOS01MTNkODE5MzYwNWQtMTcyODAiLCJjcmVhdGVkX2F0IjoiMjAyMy0wMS0xMCAxODoyMDo0NiIsInVwZGF0ZWRfYXQiOiIyMDIzLTA2LTI3IDA4OjQ3OjQxIiwiZ2VuZGVyIjoibWFsZSIsImRvYiI6IjIwMDEtMDItMTcgMDA6MDA6MDAuMDAwIiwiY2FyX293bmVyIjoiMCIsIm5mY19pZCI6bnVsbCwic3RhZmZfaWQiOm51bGwsImNsaWVudF9pZCI6bnVsbCwibG9jYXRpb24iOm51bGwsInZlcmlmaWVkX2F0IjpudWxsLCJjaXR5X2lkIjoyNSwibG9naW5fcmVtb3RlX2FkZHJlc3MiOiIxNzIuMjAuNDAuMjAiLCJsb2dpbl9kYXRlX3RpbWUiOiIyMDIzLTA2LTI3VDAwOjAwOjAwLjAwMFoiLCJsb2dpbl9pc19zdWNjZXNzZnVsIjoxLCJibG9ja2VkX3JlYXNvbiI6bnVsbCwiaXNfYmxvY2tlZCI6MCwiYmxvY2tlZF9hdCI6bnVsbCwic2lnbl91cF9zb3VyY2UiOiJ3ZWIiLCJjb3VudHJ5X2NvZGUiOiJORyIsInBob25lX3ZlcmlmaWVkX2F0IjpudWxsLCJkZWxldGVkX2F0IjpudWxsLCJkZWxldGVfcmVhc29uIjpudWxsLCJpc19lbWFpbF9ub3RpZmljYXRpb25fZW5hYmxlZCI6MSwid2FsbGV0Ijp7ImlkIjo5MTQ2LCJ1c2VyX2lkIjoxNzI4MCwiYW1vdW50IjoiMzA3MTUiLCJjcmVhdGVkX2F0IjoiMjAyMy0wMS0xMCAxODoyMDo0NiIsInVwZGF0ZWRfYXQiOiIyMDIzLTA2LTIxIDEzOjU2OjA2IiwiY3JlZGl0X2Ftb3VudCI6IjAiLCJpc19taWdyYXRlZF90b19jcmVkaXRfc3lzdGVtIjowfSwiaXNHdWVzdCI6ZmFsc2UsImlhdCI6MTY4ODk5MzYyNSwiZXhwIjoxNzIwNTI5NjI1fQ.G-EL7NEeK8Gcyk0VwQPbeZefTv0z9ek3IfHoWcxxLz0"
//     },
//     "wallet": {
//         "id": 9146,
//         "user_id": 17280,
//         "amount": "30715",
//         "created_at": "2023-01-10 18:20:46",
//         "updated_at": "2023-06-21 13:56:06",
//         "credit_amount": "0",
//         "is_migrated_to_credit_system": 0
//     },
//     "isGuest": false
// }
