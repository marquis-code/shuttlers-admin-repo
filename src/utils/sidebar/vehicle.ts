import partnerIcon from '@/assets/icons/src/vehicle_partner.vue'
import partnerListIcon from '@/assets/icons/src/partners/list.vue'
import partnerPayoutIcon from '@/assets/icons/src/partners/payouts.vue'
import partnerNotifyIcon from '@/assets/icons/src/partners/notify.vue'
export default {
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
      iconComponent: partnerListIcon,
      description: 'Vehicles Partners List'
    },
    {
      title: 'Payout',
      routePath: '/partners/payouts',
      oldPath: '/partners/payout/pending',
      shouldRedirect: true,
      iconComponent: partnerPayoutIcon,
      description: 'Vehicles Partners payout'
    },
    {
      title: 'Notify',
      routePath: '/partners/notify',
      shouldRedirect: true,
      iconComponent: partnerNotifyIcon,
      description: 'Notify Vehicles Partners'
    }
  ]
}
