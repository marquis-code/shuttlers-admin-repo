import { ref } from 'vue'
import { useModal } from './modal'
import Logout from '@/components/modals/modules/auth/Logout.vue'
import UserRefund from '@/components/modals/modules/users/Refund.vue'
import Confirm from '@/components/modals/modules/core/Confirmation.vue'
import PasswordConfirm from '@/components/modals/modules/core/PasswordConfirmation.vue'
import ConfigurePoints from '@/components/modals/modules/campaigns/ConfigurePoints.vue'

type AuthTypes = 'Logout'
type UserTypes = 'UserRefund'
type CoreTypes = 'Confirm' | 'PasswordConfirm'
type CampaignTypes = 'ConfigurePoints'

const AuthModals = { Logout } as Record<AuthTypes, any>
const UserModals = { UserRefund } as Record<UserTypes, any>
const CoreModals = { Confirm, PasswordConfirm } as Record<CoreTypes, any>
const CampaignModals = { ConfigurePoints } as Record<CampaignTypes, any>

export const modal = useModal(ref([] as any))

const authModal = modal.register('Auth', AuthModals)
const userModal = modal.register('User', UserModals)
const coreModal = modal.register('Core', CoreModals)
const campaignModal = modal.register('Campaign', CampaignModals)

export const useAuthModal = () => authModal
export const useUserModal = () => userModal
export const useCoreModal = () => coreModal
export const useCampaignModal = () => campaignModal
