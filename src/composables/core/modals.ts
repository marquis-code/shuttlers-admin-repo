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
import UpdateVehicle from '@/components/modals/modules/commute/UpdateVehicle.vue'
import ChangePassword from '@/components/modals/modules/admins/ChangePassword.vue'
import ChangeUserPassword from '@/components/modals/modules/users/ChangePassword.vue'
import WalletUpdate from '@/components/modals/modules/users/WalletUpdate.vue'
import ChangeProfile from '@/components/modals/modules/users/ChangeProfile.vue'
import BookTrip from '@/components/modals/modules/users/BookTrip.vue'
import MakeBusCaptain from '@/components/modals/modules/users/MakeBusCaptain.vue'
import CreateChargeTypes from '@/components/modals/modules/configurations/charges/types/index.vue'
import CreateChargeConfigurations from '@/components/modals/modules/configurations/charges/configure/index.vue'
import RemitCharge from '@/components/modals/modules/configurations/charges/configure/remitted.vue'
import AssignStaff from '@/components/modals/modules/companies/staff/multipleRouteAssignment.vue'

type AuthTypes = 'Logout'
type UserTypes = 'UserRefund' | 'RefundLogger' | 'ChangeUserPassword' | 'WalletUpdate' | 'ChangeProfile' | 'BookTrip' | 'MakeBusCaptain'
type CoreTypes = 'Confirm' | 'PasswordConfirm'
type CampaignTypes = 'ConfigurePoints' | 'CreateReward'
type CommuteTypes = 'SosNotifier' | 'UpdateVehicle'
type AdminTypes = 'ChangePassword'
type ChargeTypes = 'CreateChargeTypes' | 'CreateChargeConfigurations' | 'RemitCharge'
type CompaniesTypes = 'AssignStaff'

const AuthModals = { Logout } as Record<AuthTypes, any>
const UserModals = { UserRefund, RefundLogger, ChangeUserPassword, WalletUpdate, ChangeProfile, BookTrip, MakeBusCaptain } as Record<UserTypes, any>
const CoreModals = { Confirm, PasswordConfirm } as Record<CoreTypes, any>
const CampaignModals = { ConfigurePoints, CreateReward } as Record<CampaignTypes, any>
const CommuteModals = { SosNotifier, UpdateVehicle } as Record<CommuteTypes, any>
const AdminModals = { ChangePassword } as Record<AdminTypes, any>
const ChargeModals = { CreateChargeTypes, CreateChargeConfigurations, RemitCharge } as Record<ChargeTypes, any>
const CompaniesModals = { AssignStaff } as Record<CompaniesTypes, any>

export const modal = useModal(ref([] as any))

const authModal = modal.register('Auth', AuthModals)
const userModal = modal.register('User', UserModals)
const coreModal = modal.register('Core', CoreModals)
const campaignModal = modal.register('Campaign', CampaignModals)
const commuteModal = modal.register('Commute', CommuteModals)
const adminModal = modal.register('Admins', AdminModals)
const chargeModal = modal.register('Charges', ChargeModals)
const companiesModal = modal.register('Companies', CompaniesModals)

export const useAuthModal = () => authModal
export const useUserModal = () => userModal
export const useCoreModal = () => coreModal
export const useCampaignModal = () => campaignModal
export const useCommuteModal = () => commuteModal
export const useAdminModal = () => adminModal
export const useChargeModal = () => chargeModal
export const useCompaniesModal = () => companiesModal
