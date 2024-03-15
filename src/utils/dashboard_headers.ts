import GenericHeader from '@/components/headers/GenericHeader.vue'
import ShuttleRequests from '@/components/headers/modules/Companies/shuttleRequests.vue'
import Fleets from '@/components/headers/modules/Fleets/index.vue'
import AddFleets from '@/components/headers/modules/Fleets/AddFleets.vue'
import Dashboard from '@/components/headers/modules/Dashboard.vue'
import RouteSearches from '@/components/headers/modules/routeSearches.vue'
import Admin from '@/components/headers/modules/Admin/index.vue'
import CreateAdmin from '@/components/headers/modules/Admin/add-admin.vue'
import Drivers from '@/components/headers/modules/Drivers/index.vue'
import DriverDetails from '@/components/headers/modules/Drivers/driver-details.vue'
import Events from '@/components/headers/modules/Events/index.vue'
import EventDetails from '@/components/headers/modules/Events/event-details.vue'
import Transactions from '@/components/headers/modules/Transactions/index.vue'
import Transactions_id from '@/components/headers/modules/Transactions/id.vue'
import Referral from '@/components/headers/modules/Referral.vue'
import Promotion from '@/components/headers/modules/Promotion.vue'
import Partners from '@/components/headers/modules/Partners/index.vue'
import Companies from '@/components/headers/modules/Companies/index.vue'
import Company_insight from '@/components/headers/modules/Companies/insight.vue'
import Users from '@/components/headers/modules/Users/index.vue'
import NotifyUsers from '@/components/headers/modules/Users/notify.vue'
import UsersInsights from '@/components/headers/modules/Users/insights.vue'
import BatchRefund from '@/components/headers/modules/Users/batch-refund.vue'
import BatchBooking from '@/components/headers/modules/Users/BatchBooking/index.vue'
import CreateBatchBooking from '@/components/headers/modules/Users/BatchBooking/create-batch-booking.vue'
import sos from '@/components/headers/modules/commute/sos.vue'
import UserDetails from '@/components/headers/modules/Users/user-details.vue'
import CompanyDetails from '@/components/headers/modules/Companies/company-details.vue'
import AddCompany from '@/components/headers/modules/Companies/add-company.vue'
import EditCompany from '@/components/headers/modules/Companies/edit-company.vue'
import BatchBookingDetails from '@/components/headers/modules/Users/BatchBooking/batch-booking-details.vue'
import PartnerDetails from '@/components/headers/modules/Partners/partner-details.vue'
import PartnerPayout from '@/components/headers/modules/Partners/partner-payout.vue'
import PayoutDetails from '@/components/headers/modules/Partners/payout_details.vue'
import Trips from '@/components/headers/modules/Trips/index.vue'
import Rental from '@/components/headers/modules/Trips/rentals.vue'
import Routes from '@/components/headers/modules/Routes/index.vue'
import CreateRoute from '@/components/headers/modules/Routes/create-route.vue'
import Waitlist from '@/components/headers/modules/Waitlist/index.vue'
import WaitlistDetails from '@/components/headers/modules/Waitlist/waitlist-details.vue'
import SuggestedRoutes from '@/components/headers/modules/Routes/suggested-routes.vue'
import Charter from '@/components/headers/modules/Charter/index.vue'
import TripDetails from '@/components/headers/modules/Trips/trip-details.vue'
import CampaignRewards from '@/components/headers/modules/Rewards/index.vue'
import RewardHistory from '@/components/headers/modules/Rewards/reward-history.vue'
import PromotionalCampaigns from '@/components/headers/modules/Campaigns/Promotions/index.vue'
import ValentineCampaign from '@/components/headers/modules/Campaigns/Valentine/index.vue'
import ValentineCampaignDetails from '@/components/headers/modules/Campaigns/Valentine/campaign-details.vue'
import RoutePriceControl from '@/components/headers/modules/Configure/PricingControls/index.vue'
import Amenities from '@/components/headers/modules/Configure/Amenities/index.vue'
import VehicleConfiguration from '@/components/headers/modules/Configure/Vehicles/index.vue'
import TripRatingSettings from '@/components/headers/modules/Configure/TripRatings/index.vue'
import RouteDetails from '@/components/headers/modules/Routes/route-details.vue'
import FleetDetails from '@/components/headers/modules/Fleets/fleet-details.vue'
import AdminInfo from '@/components/headers/modules/Admin/admin-details.vue'
import AddDrivers from '@/components/headers/modules/Drivers/add-driver.vue'
import TripRatingSettingsDetails from '@/components/headers/modules/Configure/TripRatings/trip-rating-details.vue'
import TripIssues from '@/components/headers/modules/Trip-issues/index.vue'
import CreateCreditLineUsage from '@/components/headers/modules/Companies/create-credit-line.vue'
import ShuttleRequestDetails from '@/components/headers/modules/Companies/shuttle-request-details.vue'
import CorporateGroupDetails from '@/components/headers/modules/Companies/company-group-details.vue'
import SalesAgent from '@/components/headers/modules/Agents/index.vue'
import AgentDetails from '@/components/headers/modules/Agents/agent-details.vue'
import PastPayouts from '@/components/headers/modules/Pastpayouts/index.vue'
import TicketBookingDetails from '@/components/headers/modules/Users/booking-details.vue'

export const headerComponentRouteArray = [
    { routes: ['dashboard'], component: Dashboard },
    { routes: ['route-searches', 'route-searches-top-destination', 'route-searches-top-origin'], component: RouteSearches },
    { routes: ['companies', 'companies-demo-requests', 'companies-wallet-notification'], component: Companies },
    { routes: ['companies-add-company'], component: AddCompany },
    { routes: ['companies-id-edit'], component: EditCompany },
    { routes: ['companies-id-status-credit-line-create'], component: CreateCreditLineUsage },
    { routes: ['companies-id-status-company-info', 'companies-id-status-stats', 'companies-id-status-staff', 'companies-id-status-wallet', 'companies-id-status-trip-report', 'companies-id-status-company-groups', 'companies-id-status-credit-line', 'companies-id-status-routes', 'companies-id-status-requests', 'companies-id-status-corporate-pay', 'companies-id-status-staff-settings', 'companies-id-status-capacity-configuration'], component: CompanyDetails },
    { routes: ['companies-insights'], component: Company_insight },
    { routes: ['companies-shuttle-requests'], component: ShuttleRequests },
    { routes: ['companies-id-status-company-groups-group_id'], component: CorporateGroupDetails },
    { routes: ['companies-shuttle-requests-id-info', 'companies-shuttle-requests-id-staff-list'], component: ShuttleRequestDetails },
    { routes: ['users'], component: Users },
    { routes: ['users-batch-refund', 'users-batch-refund-create'], component: BatchRefund },
    { routes: ['users-notify'], component: NotifyUsers },
    { routes: ['users-insights'], component: UsersInsights },
    { routes: ['users-bookings'], component: BatchBooking },
    { routes: ['users-id-active-bookings', 'users-id-cancelled-trips', 'users-id-credit-line-usage', 'users-id-past-bookings', 'users-id-rides', 'users-id-transactions', 'users-id-user-info'], component: UserDetails },
    { routes: ['users-bookings-create-batch-booking'], component: CreateBatchBooking },
    { routes: ['users-bookings-id-booking-info'], component: BatchBookingDetails },
    { routes: ['users-id-booking-ticket-ticket_id', 'users-id-cancelled-trips-b_id'], component: TicketBookingDetails },
    { routes: ['partners', 'partners-new-partners', 'partners-interested-partners', 'partners-create'], component: Partners },
    { routes: ['partners-payouts', 'partners-payouts-completed', 'partners-payouts-failed'], component: PartnerPayout },
    { routes: ['partners-id-accountSid-partner-info', 'partners-id-accountSid-vehicles', 'partners-id-accountSid-drivers', 'partners-id-accountSid-completed-trips', 'partners-id-accountSid-accounts'], component: PartnerDetails },
    { routes: ['partners-payouts-id-earningId'], component: PayoutDetails },
    { routes: ['pastpayouts-id-accountSid'], component: PastPayouts },
    { routes: ['drivers'], component: Drivers },
    { routes: ['drivers-add', 'drivers-notify', 'drivers-edit-id'], component: AddDrivers },
    { routes: ['drivers-id-driver-info', 'drivers-id-customer-rating'], component: DriverDetails },
    { routes: ['events', 'events-upcoming'], component: Events },
    { routes: ['events-id-event-info'], component: EventDetails },
    { routes: ['transactions'], component: Transactions },
    { routes: ['transactions-id'], component: Transactions_id },
    { routes: ['fleet', 'fleet-inspection-days'], component: Fleets },
    { routes: ['fleet-add'], component: AddFleets },
    { routes: ['fleet-id-vehicle-info', 'fleet-id-vehicle-documents', 'fleet-id-trips', 'fleet-id-customer-ratings'], component: FleetDetails },
    { routes: ['referral', 'referral-id', 'referral-new'], component: Referral },
    { routes: ['promotion', 'promotion-id', 'promotion-new'], component: Promotion },
    { routes: ['admin', 'admin-audit-trail'], component: Admin },
    { routes: ['admin-add'], component: CreateAdmin },
    { routes: ['configuration'], component: null },
    { routes: ['campaigns-rewards-id-reward-history'], component: RewardHistory },
    { routes: ['campaigns-rewards', 'campaigns-rewards-pilot-rewards', 'campaigns-rewards-customer-points', 'campaigns-rewards-customer-rewards'], component: CampaignRewards },
    { routes: ['trips-sos'], component: sos },
    { routes: ['trips-type-active', 'trips-type-upcoming', 'trips-type-completed', 'trips-type-cancelled', 'trips-type-bus-captains'], component: Trips },
    { routes: ['trips-routes', 'trips-routes-suspended', 'trips-routes-auctions', 'trips-routes-auctions-auction-details'], component: Routes },
    { routes: ['trips-routes-suggested-routes'], component: SuggestedRoutes },
    { routes: ['trips-routes-create'], component: CreateRoute },
    { routes: ['trips-waitlist'], component: Waitlist },
    { routes: ['trips-waitlist-id-details'], component: WaitlistDetails },
    { routes: ['trips-charter'], component: Charter },
    { routes: ['trips-rental', 'trips-rental-upcoming', 'trips-rental-create'], component: Rental },
    {
        routes: ['trips-type-upcoming-id-trip-details', 'trips-type-upcoming-id-passengers', 'trips-type-upcoming-id-ratings', 'trips-type-upcoming-id-issues',
            'trips-type-active-id-trip-details', 'trips-type-active-id-passengers', 'trips-type-active-id-ratings', 'trips-type-active-id-issues',
            'trips-type-completed-id-trip-details', 'trips-type-completed-id-passengers', 'trips-type-completed-id-ratings', 'trips-type-completed-id-financials', 'trips-type-completed-id-issues',
            'trips-type-cancelled-id-trip-details', 'trips-type-cancelled-id-passengers'], component: TripDetails
    },
    { routes: ['users-id-past-bookings-b_id', 'users-add', 'users-add-id', 'trips-sos-id', 'trips-replay', 'events-create', 'trips-rental-id', 'partners-notify', 'trips-vehicle'], component: GenericHeader },
    { routes: ['campaigns-promotions-banner', 'campaigns-promotions-carousel'], component: PromotionalCampaigns },
    { routes: ['campaigns-valentine'], component: ValentineCampaign },
    { routes: ['campaigns-valentine-id'], component: ValentineCampaignDetails },
    { routes: ['configuration-pricing-pricing-control', 'configuration-pricing-payment-option', 'configuration-pricing-charges', 'configuration-pricing-charges-types', 'configuration-pricing-charges-configurations-id'], component: RoutePriceControl },
    { routes: ['configuration-vehicle-amenities'], component: Amenities },
    { routes: ['configuration-vehicle-category-management', 'configuration-vehicle-category-management-inspection-sites'], component: VehicleConfiguration },
    { routes: ['configuration-trip-rating-settings'], component: TripRatingSettings },
    { routes: ['configuration-trip-rating-settings-id'], component: TripRatingSettingsDetails },
    { routes: ['trips-routes-id-details', 'trips-routes-id-bus-stops', 'trips-routes-id-itineraries', 'trips-routes-id-itineraries-iti_id', 'trips-routes-id-itineraries-iti_id-new-auction', 'trips-routes-id-itineraries-iti_id-auction-details', 'trips-routes-id-trips', 'trips-routes-id-edit'], component: RouteDetails },
    { routes: ['admin-id-info', 'admin-id-permissions'], component: AdminInfo },
    { routes: ['trips-trip-issues', 'trips-trip-issues-resolved'], component: TripIssues },
    { routes: ['agents'], component: SalesAgent },
    { routes: ['agents-create'], component: GenericHeader },
    { routes: ['agents-id-agent-info', 'agents-id-Passengers', 'agents-id-agent-routes'], component: AgentDetails }
]
