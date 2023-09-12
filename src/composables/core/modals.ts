import { ref } from 'vue'
import { useModal } from './modal'
import Logout from '@/components/modals/modules/auth/Logout.vue'
import UserRefund from '@/components/modals/modules/users/Refund.vue'
import Confirm from '@/components/modals/modules/core/Confirmation.vue'

type AuthTypes = 'Logout'
type UserTypes = 'UserRefund'
type CoreTypes = 'Confirm'

const AuthModals = { Logout } as Record<AuthTypes, any>
const UserModals = { UserRefund } as Record<UserTypes, any>
const CoreModals = { Confirm } as Record<CoreTypes, any>

export const modal = useModal(ref([] as any))

const authModal = modal.register('Auth', AuthModals)
const userModal = modal.register('User', UserModals)
const coreModal = modal.register('Core', CoreModals)

export const useAuthModal = () => authModal
export const useUserModal = () => userModal
export const useCoreModal = () => coreModal
