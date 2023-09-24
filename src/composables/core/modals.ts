import { ref } from 'vue'
import { useModal } from './modal'
import Logout from '@/components/modals/modules/auth/Logout.vue'
import UserRefund from '@/components/modals/modules/users/Refund.vue'
import RefundLogger from '@/components/modals/modules/users/RefundLogger.vue'
import Confirm from '@/components/modals/modules/core/Confirmation.vue'
import PasswordConfirm from '@/components/modals/modules/core/PasswordConfirmation.vue'

type AuthTypes = 'Logout'
type UserTypes = 'UserRefund' | 'RefundLogger'
type CoreTypes = 'Confirm' | 'PasswordConfirm'

const AuthModals = { Logout } as Record<AuthTypes, any>
const UserModals = { UserRefund, RefundLogger } as Record<UserTypes, any>
const CoreModals = { Confirm, PasswordConfirm } as Record<CoreTypes, any>

export const modal = useModal(ref([] as any))

const authModal = modal.register('Auth', AuthModals)
const userModal = modal.register('User', UserModals)
const coreModal = modal.register('Core', CoreModals)

export const useAuthModal = () => authModal
export const useUserModal = () => userModal
export const useCoreModal = () => coreModal
