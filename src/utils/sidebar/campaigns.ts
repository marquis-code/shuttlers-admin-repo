import valentineIcon from '@/assets/icons/src/campaigns/valentine.vue'
import rewardsIcon from '@/assets/icons/src/campaigns/rewards.vue'
import cmsBannerIcon from '@/assets/icons/src/campaigns/cms.vue'
import campaignsIcon from '@/assets/icons/src/campaigns.vue'
export default {
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
      description: 'Valentine management',
      iconComponent: valentineIcon
    },
    {
      title: 'Rewards',
      routePath: '/campaigns/rewards',
      description: 'Campaign Rewards',
      iconComponent: rewardsIcon
    },
    {
      title: 'CMS Banners',
      routePath: '/campaigns/promotions/banner',
      oldPath: '/games&campaigns/banner',
      shouldRedirect: true,
      description: 'CMS promotional banner',
      iconComponent: cmsBannerIcon
    }
  ]
}
