import partnerIcon from '@/assets/icons/src/vehicle_partner.vue'

export default 	{
		title: 'Vehicle Partners',
		routePath: null,
		description: '',
		iconComponent: shallowRef(partnerIcon),
		rootPath: '/partners',
		modulePermission: 'PARTNERS',
		children: [
			{
				title: 'Partners List',
				routePath: '/partners',
				oldPath: '/partners/list',
				shouldRedirect: true,
				description: 'Vehicles Partners List'
			},
			{
				title: 'Payout',
				routePath: '/partners/payouts',
				oldPath: '/partners/payout/pending',
				shouldRedirect: true,
				description: 'Vehicles Partners payout'
			},
			{
				title: 'Notify',
				routePath: '/partners/notify',
				shouldRedirect: true,
				description: 'Notify Vehicles Partners'
			}
		]
	}
