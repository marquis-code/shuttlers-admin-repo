// import { ref } from 'vue'
// import { useModal } from './modal'
// import Logout from '@/components/modals/settings/logout.vue'
// import ChangePassword from '@/components/modals/settings/ChangePassword.vue'
// import FundWallet from '@/components/modals/wallet/FundWallet.vue'
// import SuggestRoute from '@/components/modals/settings/suggestRoute.vue'
// import CharterRequest from '@/components/modals/dashboard/CharterRequest.vue'
// import SocialShare from '@/components/modals/core/SocialShare.vue'
// import CompletedBooking from '@/components/modals/dashboard/Booking_Completed.vue'
// import CancelBooking from '@/components/modals/dashboard/Cancel_Booking.vue'
// import SelectPayment from '@/components/modals/wallet/SelectPayment.vue'
// import SelectPaymentDiscover from '@/components/modals/wallet/SelectPaymentDiscover.vue'
// import ViewDetails from '@/components/modals/wallet/ViewDetails.vue'
// import CreateEventSuccess from '@/components/modals/dashboard/CreateEventSuccess.vue'
// import ModifyEvent from '@/components/modals/dashboard/ModifyEvent.vue'
// import ModifyEventSuccess from '@/components/modals/dashboard/ModifyEventSuccess.vue'
// import CancelSubscription from '@/components/modals/bookings/CancelSubscription.vue'
// import BookAgain from '@/components/modals/bookings/BookAgain.vue'
// import GuestBooking from '@/components/modals/bookings/GuestBooking.vue'
// import JoinWaitlist from '@/components/modals/events/JoinWaitlist.vue'
// import BookingInfo from '@/components/modals/events/BookingInfo.vue'
// import PaymentMethod from '@/components/modals/events/PaymentMethod.vue'
// import ImageCropper from '@/components/modals/dashboard/ImageCropper.vue'

// type AuthTypes = 'Logout' | 'ChangePassword'
// type BookingTypes = 'CancelSubscription' | 'BookAgain' | 'GuestBooking'
// type WalletTypes = 'FundWallet' | 'SelectPayment' | 'ViewDetails' | 'SelectPaymentDiscover'
// type DashboardTypes = 'CharterRequest' | 'SuggestRoute' | 'CreateEventSuccess' | 'ModifyEvent' | 'ModifyEventSuccess' | 'ImageCropper'
// type RouteTypes = 'CompletedBooking' | 'CancelBooking'
// type CoreTypes = 'SocialShare'
// type EventTypes = 'JoinWaitlist' | 'BookingInfo' | 'PaymentMethod'

// const AuthModals = { Logout, ChangePassword } as Record<AuthTypes, any>
// const BookingModals = { CancelSubscription, BookAgain, GuestBooking } as Record<BookingTypes, any>
// const WalletModals = { FundWallet, SelectPayment, ViewDetails, SelectPaymentDiscover } as Record<WalletTypes, any>
// const DashboardModals = { CharterRequest, SuggestRoute, CreateEventSuccess, ModifyEvent, ModifyEventSuccess, ImageCropper } as Record<DashboardTypes, any>
// const RouteModals = { CompletedBooking, CancelBooking } as Record<RouteTypes, any>
// const CoreModals = { SocialShare } as Record<CoreTypes, any>
// const EventModals = { JoinWaitlist, BookingInfo, PaymentMethod } as Record<EventTypes, any>

// export const modal = useModal(ref([] as any))

// const authModal = modal.register('Auth', AuthModals)
// const bookingModal = modal.register('Booking', BookingModals)
// const walletModal = modal.register('Wallet', WalletModals)
// const dashboardModal = modal.register('Dashboard', DashboardModals)
// const routeModal = modal.register('Route', RouteModals)
// const coreModal = modal.register('Core', CoreModals)
// const eventModal = modal.register('Event', EventModals)

// export const useAuthModal = () => authModal
// export const useBookingModal = () => bookingModal
// export const useWalletModal = () => walletModal
// export const useDashboardModal = () => dashboardModal
// export const useRouteModal = () => routeModal
// export const useCoreModal = () => coreModal
// export const useEventModal = () => eventModal
