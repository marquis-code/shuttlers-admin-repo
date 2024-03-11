import homeIcon from '@/assets/icons/src/home.vue'
import routeIcon from '@/assets/icons/src/compass.vue'

import userIcon from '@/assets/icons/src/users.vue'
import partnerIcon from '@/assets/icons/src/vehicle_partner.vue'
import eventIcon from '@/assets/icons/src/fleet management.vue'
import transactionIcon from '@/assets/icons/src/payment.vue'
import charterIcon from '@/assets/icons/src/charter.vue'
import referralIcon from '@/assets/icons/src/referral.vue'
import promoIcon from '@/assets/icons/src/promo.vue'
import tagIcon from '@/assets/icons/src/tag.vue'
import campaignsIcon from '@/assets/icons/src/campaigns.vue'
import adminIcon from '@/assets/icons/src/admin.vue'
import configureIcon from '@/assets/icons/src/configure.vue'

import corporate_route from '@/utils/sidebar/corporate'
import users_route from '@/utils/sidebar/users'
import commute_route from '@/utils/sidebar/commute'
import agents_route from '@/utils/sidebar/agents'
import vehicle_route from '@/utils/sidebar/vehicle'

const isProd = computed(() => {
	return location.host === 'v3.admin.shuttlers.africa'
})

export const TOP_LEVEL_SIDEBAR_MENUS = [
	{
		title: 'Dashboard',
		routePath: '/dashboard',
		oldPath: '/dashboard',
		description: '',
		iconComponent: shallowRef(homeIcon),
		children: null,
		shouldRedirect: false,
		modulePermission: [
			'ROUTES',
			'CORPORATES',
			'USERS',
			'TRIPS',
			'PARTNERS',
			'DRIVERS',
			'EVENTS',
			'TRANSACTIONS',
			'VEHICLES',
			'REFERRALS',
			'PROMOTIONS',
			'ADMINCONFIG',
			'STAFF'
		]
	},
	{
		title: 'Route Search',
		routePath: '/route-searches',
		oldPath: '/route-searches/traffic-flow',
		description: '',
		iconComponent: shallowRef(routeIcon),
		rootPath: '/route-searches',
		children: null,
		shouldRedirect: false,
		modulePermission: 'ROUTES'
	}
]

export const OPS_AND_MANAGEMENT_SIDEBAR_MENUS = [
	users_route,
	corporate_route,
	commute_route,
    agents_route,
    vehicle_route,
	{
		title: 'Drivers',
		routePath: null,
		description: '',
		rootPath: '/drivers',
		iconComponent: shallowRef(userIcon),
		shouldRedirect: true,
		modulePermission: 'DRIVERS',
		children: [
			{
				title: 'Manage ',
				routePath: '/drivers',
				oldPath: '/drivers/list',
				shouldRedirect: true,
				description: 'Manage Drivers'
			}
		]
	},
	{
		title: 'Events',
		routePath: '/events',
		oldPath: '/events/list',
		description: '',
		iconComponent: shallowRef(eventIcon),
		rootPath: '/events',
		shouldRedirect: true,
		children: null,
		modulePermission: 'EVENTS'
	},
	{
		title: 'Transactions',
		routePath: '/transactions',
		oldPath: '/transactions',
		shouldRedirect: true,
		description: '',
		iconComponent: shallowRef(transactionIcon),
		children: null,
		modulePermission: 'TRANSACTIONS'
	},
	{
		title: 'Fleet',
		routePath: '/fleet',
		rootPath: '/fleet',
		oldPath: '/fleet/list/vehicle',
		description: '',
		iconComponent: shallowRef(charterIcon),
		children: null,
		modulePermission: 'VEHICLES'
	},
	{
		title: 'Referral Codes',
		routePath: '/referral',
		oldPath: '/referral-codes',
		description: '',
		iconComponent: shallowRef(referralIcon),
		children: null,
		shouldRedirect: true,
		modulePermission: 'PROMOTIONS'
	},
	{
		title: 'Promo Codes',
		routePath: '/promotion',
		oldPath: '/promo-codes',
		description: '',
		iconComponent: shallowRef(promoIcon),
		shouldRedirect: true,
		modulePermission: 'PROMOTIONS',
		children: null
	},
	{
		title: 'Campaigns',
		routePath: null,
		description: '',
		iconComponent: shallowRef(campaignsIcon),
		rootPath: '/campaigns',
		shouldRedirect: true,
		modulePermission: 'CAMPAIGNS',
		children: [
			{
				title: 'Valentine',
				routePath: '/campaigns/valentine',
				oldPath: '/games&campaigns/valentine',
				shouldRedirect: true,
				description: 'Valentine management'
			},
			{
				title: 'Rewards',
				routePath: '/campaigns/rewards',
				description: 'Campaign Rewards'
			},
			{
				title: 'CMS Banners',
				routePath: '/campaigns/promotions/banner',
				oldPath: '/games&campaigns/banner',
				shouldRedirect: true,
				description: 'CMS promotional banner'
			}
		]
	}
].filter((i) => !!i)

export const ADMIN_SIDEBAR_MENUS = computed(() => {
	return [
		{
			title: 'Admins',
			routePath: '/admin',
			description: '',
			iconComponent: shallowRef(adminIcon),
			children: null,
			rootPath: '/admin',
			oldPath: '/admin/list',
			shouldRedirect: true,
			modulePermission: 'STAFF',
			requiredAdmin: true
		},
		{
			title: 'Configure',
			routePath: null,
			description: '',
			iconComponent: shallowRef(configureIcon),
			rootPath: '/configuration/trip-rating-settings',
			shouldRedirect: true,
			modulePermission: ['ADMINCONFIG', 'ADDITIONALCHARGES'],
			children: [
				{
					title: 'Trip Rating Settings',
					routePath: '/configuration/trip-rating-settings',
					oldPath: '/configuration/customer-app/trip-rating-settings',
					shouldRedirect: true,
					description: 'Configure and manage trip rating parameters'
				},
				{
					title: 'Vehicle Categories',
					routePath: '/configuration/vehicle-category-management',
					oldPath: '/configuration/vehicle/category-management',
					shouldRedirect: true,
					description: 'Manage vehicle categories'
				},
				{
					title: 'Amenities',
					routePath: '/configuration/vehicle-amenities',
					oldPath:
						'/configuration/vehicle-amenities/vehicle-amenities-settings',
					shouldRedirect: true,
					description: 'Manage vehicle amenities'
				},
				{
					title: 'Route Price Control',
					routePath: isProd.value
						? '/configuration/pricing/payment-option'
						: '/configuration/pricing/pricing-control',
					oldPath: '/configuration/pricing-controls/',
					shouldRedirect: true,
					description: 'Manage route pricing centrally'
				}
			],
			requiredAdmin: false
		}
	]
})

export function getSidebarMenus(menus, permissionsModules, userRole) {
	return (
		menus
			// eslint-disable-next-line array-callback-return
			.filter((menu) => {
				if (Array.isArray(permissionsModules)) {
					if (menu.title === 'Dashboard' || menu.title === 'Events')
						return true
					const whiteListRoles = ['admin', 'super_admin']
					if (whiteListRoles.includes(userRole)) return true

					if (userRole === 'user' && menu?.requiredAdmin === true) return false
					for (const permission of permissionsModules) {
						if (whiteListRoles.includes(userRole)) {
							return true
						}

						if (permission === menu.modulePermission) {
							return true
						}

						if (Array.isArray(menu.modulePermission)) {
							if (menu.modulePermission.includes(permission)) {
								return true
							}
						}
					}
				} else {
					return true
				}
			})
			.map((menu) => {
				menu.isOpen = false
				return menu
			})
	)
}
