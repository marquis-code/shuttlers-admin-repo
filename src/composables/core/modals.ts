import { ref } from 'vue'
import { useModal } from './modal'
import Logout from '@/components/modals/modules/auth/Logout.vue'
import UserRefund from '@/components/modals/modules/users/Refund.vue'
import RefundLogger from '@/components/modals/modules/users/RefundLogger.vue'
import Confirm from '@/components/modals/modules/core/Confirmation.vue'
import PasswordConfirm from '@/components/modals/modules/core/PasswordConfirmation.vue'
import YesConfirm from '@/components/modals/modules/core/YesConfirmation.vue'
import ConfigurePoints from '@/components/modals/modules/campaigns/ConfigurePoints.vue'
import CreateReward from '@/components/modals/modules/campaigns/CreateReward.vue'
import CreateManualReward from '@/components/modals/modules/campaigns/CreateManualReward.vue'
import SosNotifier from '@/components/modals/modules/commute/SosNotifier.vue'
import RouteAvailabilityConfig from '@/components/modals/modules/commute/RouteAvailabilityConfig.vue'
import UpdateDriverAndVehicle from '@/components/modals/modules/commute/trips/UpdateDriverAndVehicle.vue'
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
import AssignStaffToRoute from '@/components/modals/modules/companies/staff/AssignStaffToRoute.vue'
import ViewStaffRoutesList from '@/components/modals/modules/companies/staff/ViewStaffRoutesList.vue'
import ConfigureInspectionSite from '@/components/modals/modules/configurations/vehicle/InspectionSite.vue'
import ConfigureVehicleCategory from '@/components/modals/modules/configurations/vehicle/vehicleCategory.vue'
import DeleteVehicleCategory from '@/components/modals/modules/configurations/vehicle/DeleteCategoryConfirmation.vue'
import DeductEarning from '@/components/modals/modules/trips/DeductEarning.vue'
import AddDriver from '@/components/modals/modules/Routes/Itineraries/AddDriver.vue'
import AssignDriver from '@/components/modals/modules/Routes/Itineraries/AssignDriverFromAuction.vue'
import RouteDuplicationModal from '@/components/modals/modules/Routes/Duplicate_Routes.vue'
import ConfigureAgentCommission from '@/components/modals/modules/Routes/ConfigureAgentCommission.vue'
import AddPassengersToTrips from '@/components/modals/modules/trips/AddPassengersToTrip.vue'
import TransferBooking from '@/components/modals/modules/trips/TransferBooking.vue'
import NotifyPassengers from '@/components/modals/modules/trips/NotifyPassengers.vue'
import AddWorkShift from '@/components/modals/modules/companies/AddWorkShift.vue'
import AddWorkBranch from '@/components/modals/modules/companies/AddOfficeBranch.vue'
import AddAccountManagers from '@/components/modals/modules/companies/AddAccountManager.vue'
import CorporateWalletOptions from '@/components/modals/modules/companies/CorporateWalletOptions.vue'
import CorporateManifestExport from '@/components/modals/modules/companies/CorporateManifestExport.vue'
import CorporateBookingCancellation from '@/components/modals/modules/companies/CorporateBookingCancellation.vue'
import CreateCorporateGroup from '@/components/modals/modules/companies/CreateCorporateGroup.vue'
import CorporateVehicleCapacityConfig from '@/components/modals/modules/companies/CorporateVehicleCapacityConfig.vue'
import AddItinerary from '@/components/modals/modules/Routes/Itineraries/AddItinerary.vue'
import ItineraryTransferBooking from '@/components/modals/modules/Routes/Itineraries/TransferBooking.vue'
import FundWallet from '@/components/modals/modules/companies/FundWallet.vue'
import ActivateWallet from '@/components/modals/modules/companies/ActivateWallet.vue'
import LogIssues from '@/components/modals/modules/trips/Issues/LogTripIssue.vue'
import CreateIssues from '@/components/modals/modules/trips/Issues/CreateIssue.vue'
import ResolveIssues from '@/components/modals/modules/trips/Issues/Resolve.vue'
import AssignBus from '@/components/modals/modules/driver/AssignBus.vue'
import EditBus from '@/components/modals/modules/driver/EditBus.vue'
import AssignRoute from '@/components/modals/modules/driver/AssignRoute.vue'
import ControlTrip from '@/components/modals/modules/driver/ControlTrip.vue'
import ChangeDriverPassword from '@/components/modals/modules/driver/ChangePassword.vue'
import ChangeDriverPicture from '@/components/modals/modules/driver/ChangePicture.vue'
import ScheduledCreditLine from '@/components/modals/modules/companies/ScheduledCreditLine.vue'
import ImageCropper from '@/components/modals/modules/core/ImageCropper.vue'
import UpdateVehicleTracking from '@/components/modals/modules/fleets/UpdateTrackingDetails.vue'
// import ChangeFleetDriver from 'src/components/modals/modules/fleets/ChangeFleetDriver.vue'
import EditVehicleBus from '@/components/modals/modules/fleets/EditBus.vue'
import EmployeeExemption from '@/components/modals/modules/companies/EmployeeExemption.vue'
import ChangeFleetDriver from '@/components/modals/modules/fleets/ChangeFleetDriver.vue'
import RejectShuttleRequest from '@/components/modals/modules/companies/RejectShuttleRequest.vue'
import DeductPayout from '@/components/modals/modules/partners/payouts/Deduct.vue'
import MarkMultipleAsPaid from '@/components/modals/modules/partners/payouts/Mark_multiple.vue'
import PairReturnTrip from '@/components/modals/modules/Routes/Itineraries/PairReturnTrip.vue'
import TransferTrip from '@/components/modals/modules/trips/TransferTrip.vue'
import CancelTrip from '@/components/modals/modules/trips/CancelTrip.vue'
import BatchAddCorporateGroupMembers from '@/components/modals/modules/companies/BatchAddCorporateGroupMembers.vue'
import UpdatePartnerInfo from '@/components/modals/modules/partners/UpdatePartnerInfo.vue'
import UpdatePartnerPassword from '@/components/modals/modules/partners/UpdatePartnerPassword.vue'
import CancelBooking from '@/components/modals/modules/users/CancelBooking.vue'
import WalletNotification from '@/components/modals/modules/companies/wallet-notification/WalletNotification.vue'
import LinkVehicle from '@/components/modals/modules/partners/LinkVehicle.vue'
import DeclineReason from '@/components/modals/modules/agents/DeclineReason.vue'

type AuthTypes = 'Logout'
type UserTypes = 'UserRefund' | 'CancelBooking' | 'RefundLogger' | 'ChangeUserPassword' | 'WalletUpdate' | 'ChangeProfile' | 'BookTrip' | 'MakeBusCaptain'
type CoreTypes = 'Confirm' | 'PasswordConfirm' | 'YesConfirm' | 'ImageCropper'
type CampaignTypes = 'ConfigurePoints' | 'CreateReward' | 'CreateManualReward'
type CommuteTypes = 'SosNotifier' | 'UpdateVehicle' | 'UpdateDriverAndVehicle' | 'RouteAvailabilityConfig'
type AdminTypes = 'ChangePassword'
type ChargeTypes = 'CreateChargeTypes' | 'CreateChargeConfigurations' | 'RemitCharge'
type CompaniesTypes = 'AssignStaff' | 'WalletNotification' | 'ViewStaffRoutesList' | 'AddWorkShift' | 'AddWorkBranch' | 'AddAccountManagers' | 'CorporateWalletOptions' | 'CorporateBookingCancellation' | 'CorporateManifestExport' | 'CreateCorporateGroup' | 'CorporateVehicleCapacityConfig' | 'FundWallet' | 'ActivateWallet' | 'ScheduledCreditLine' | 'EmployeeExemption' | 'RejectShuttleRequest' | 'BatchAddCorporateGroupMembers' | 'AssignStaffToRoute'
type ConfigureVehicleTypes = 'ConfigureInspectionSite' | 'ConfigureVehicleCategory' | 'DeleteVehicleCategory'
type DriverTypes = 'AddDriver' | 'AssignDriver' | 'ItineraryTransferBooking' | 'AssignBus' | 'AssignRoute' | 'ControlTrip' | 'ChangeDriverPassword' | 'ChangeDriverPicture'
type TripsTypes = 'DeductEarning' | 'AddPassengersToTrips' | 'TransferBooking' | 'NotifyPassengers' | 'LogIssues' | 'ResolveIssues' | 'CreateIssues' | 'TransferTrip' | 'CancelTrip'
type RouteTypes = 'RouteDuplicationModal' | 'AddItinerary' | 'PairReturnTrip' | 'ConfigureAgentCommission' | 'DeclineReason'
type VehicleTypes = 'EditBus' | 'UpdateVehicleTracking' | 'ChangeFleetDriver' | 'EditVehicleBus'
type PayoutTypes = 'DeductPayout' | 'MarkMultipleAsPaid'
type PartnerTypes = 'UpdatePartnerInfo' | 'UpdatePartnerPassword' | 'LinkVehicle'

const AuthModals = { Logout } as Record<AuthTypes, any>
const UserModals = { UserRefund, CancelBooking, RefundLogger, ChangeUserPassword, WalletUpdate, ChangeProfile, BookTrip, MakeBusCaptain } as Record<UserTypes, any>
const CoreModals = { Confirm, PasswordConfirm, YesConfirm, ImageCropper } as Record<CoreTypes, any>
const CampaignModals = { ConfigurePoints, CreateReward, CreateManualReward } as Record<CampaignTypes, any>
const CommuteModals = { SosNotifier, UpdateVehicle, RouteAvailabilityConfig, UpdateDriverAndVehicle } as Record<CommuteTypes, any>
const AdminModals = { ChangePassword } as Record<AdminTypes, any>
const ChargeModals = { CreateChargeTypes, CreateChargeConfigurations, RemitCharge } as Record<ChargeTypes, any>
const CompaniesModals = { AssignStaff, WalletNotification, ViewStaffRoutesList, AddWorkShift, AddWorkBranch, AddAccountManagers, CorporateWalletOptions, CorporateManifestExport, CorporateBookingCancellation, CreateCorporateGroup, CorporateVehicleCapacityConfig, FundWallet, ActivateWallet, ScheduledCreditLine, EmployeeExemption, RejectShuttleRequest, BatchAddCorporateGroupMembers, AssignStaffToRoute } as Record<CompaniesTypes, any>
const VehicleConfigurationModals = { ConfigureInspectionSite, ConfigureVehicleCategory, DeleteVehicleCategory } as Record<ConfigureVehicleTypes, any>
const DriverModals = { AddDriver, AssignDriver, ItineraryTransferBooking, AssignBus, AssignRoute, ControlTrip, ChangeDriverPassword, ChangeDriverPicture } as Record<DriverTypes, any>
const TripsModals = { DeductEarning, AddPassengersToTrips, TransferBooking, NotifyPassengers, LogIssues, ResolveIssues, CreateIssues, TransferTrip, CancelTrip } as Record<TripsTypes, any>
const RoutesModal = { RouteDuplicationModal, AddItinerary, PairReturnTrip, ConfigureAgentCommission, DeclineReason } as Record<RouteTypes, any>
const VehicleModals = { EditBus, UpdateVehicleTracking, ChangeFleetDriver, EditVehicleBus } as Record<VehicleTypes, any>
const PayoutModals = { DeductPayout, MarkMultipleAsPaid } as Record<PayoutTypes, any>
const PartnerModals = { UpdatePartnerInfo, UpdatePartnerPassword, LinkVehicle } as Record<PartnerTypes, any>

export const modal = useModal(ref([] as any))

const authModal = modal.register('Auth', AuthModals)
const userModal = modal.register('User', UserModals)
const coreModal = modal.register('Core', CoreModals)
const campaignModal = modal.register('Campaign', CampaignModals)
const commuteModal = modal.register('Commute', CommuteModals)
const adminModal = modal.register('Admins', AdminModals)
const chargeModal = modal.register('Charges', ChargeModals)
const companiesModal = modal.register('Companies', CompaniesModals)
const vehicleConfigurationModal = modal.register('VehicleConfiguration', VehicleConfigurationModals)
const tripsModal = modal.register('Trips', TripsModals)
const driverModal = modal.register('Driver', DriverModals)
const routeModal = modal.register('Routes', RoutesModal)
const vehicleModal = modal.register('Vehicles', VehicleModals)
const payoutModal = modal.register('Payout', PayoutModals)
const partnerModal = modal.register('Partner', PartnerModals)

export const useAuthModal = () => authModal
export const useUserModal = () => userModal
export const useCoreModal = () => coreModal
export const useCampaignModal = () => campaignModal
export const useCommuteModal = () => commuteModal
export const useAdminModal = () => adminModal
export const useChargeModal = () => chargeModal
export const useCompaniesModal = () => companiesModal
export const useVehicleConfigurationModal = () => vehicleConfigurationModal
export const useTripsModal = () => tripsModal
export const useDriverModal = () => driverModal
export const useRouteModal = () => routeModal
export const useVehicleModal = () => vehicleModal
export const usePayoutModal = () => payoutModal
export const usePartnerModal = () => partnerModal
