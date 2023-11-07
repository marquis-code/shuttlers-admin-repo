import { ref } from 'vue'
import { useModal } from './modal'
import Logout from '@/components/modals/modules/auth/Logout.vue'
import UserRefund from '@/components/modals/modules/users/Refund.vue'
import RefundLogger from '@/components/modals/modules/users/RefundLogger.vue'
import Confirm from '@/components/modals/modules/core/Confirmation.vue'
import PasswordConfirm from '@/components/modals/modules/core/PasswordConfirmation.vue'
import ConfigurePoints from '@/components/modals/modules/campaigns/ConfigurePoints.vue'
import CreateReward from '@/components/modals/modules/campaigns/CreateReward.vue'
import SosNotifier from '@/components/modals/modules/commute/SosNotifier.vue'
import ChangePassword from '@/components/modals/modules/admins/ChangePassword.vue'

type AuthTypes = 'Logout'
type UserTypes = 'UserRefund' | 'RefundLogger'
type CoreTypes = 'Confirm' | 'PasswordConfirm'
type CampaignTypes = 'ConfigurePoints' | 'CreateReward'
type CommuteTypes = 'SosNotifier'
type AdminTypes = 'ChangePassword'

const AuthModals = { Logout } as Record<AuthTypes, any>
const UserModals = { UserRefund, RefundLogger } as Record<UserTypes, any>
const CoreModals = { Confirm, PasswordConfirm } as Record<CoreTypes, any>
const CampaignModals = { ConfigurePoints, CreateReward } as Record<CampaignTypes, any>
const CommuteModals = { SosNotifier } as Record<CommuteTypes, any>
const AdminModals = { ChangePassword } as Record<AdminTypes, any>

export const modal = useModal(ref([] as any))

const authModal = modal.register('Auth', AuthModals)
const userModal = modal.register('User', UserModals)
const coreModal = modal.register('Core', CoreModals)
const campaignModal = modal.register('Campaign', CampaignModals)
const commuteModal = modal.register('Commute', CommuteModals)
const adminModal = modal.register('Admins', AdminModals)

export const useAuthModal = () => authModal
export const useUserModal = () => userModal
export const useCoreModal = () => coreModal
export const useCampaignModal = () => campaignModal
export const useCommuteModal = () => commuteModal
export const useAdminModal = () => adminModal
