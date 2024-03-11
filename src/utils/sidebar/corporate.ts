import corporateIcon from '@/assets/icons/src/companies.vue'
import companiesInsightsIcon from '@/assets/icons/src/companiesInsights.vue'
import companiesListIcon from '@/assets/icons/src/companiesList.vue'
import companiesShuttleRequestIcon from '@/assets/icons/src/companiesShuttleRequest.vue'
export default {
  title: 'Corporates',
  routePath: null,
  description: '',
  iconComponent: shallowRef(corporateIcon),
  rootPath: '/companies',
  modulePermission: 'CORPORATES',
  children: [
    {
      title: 'Insights',
      routePath: '/companies/insights',
      iconComponent: shallowRef(companiesInsightsIcon),
      oldPath: '/companies/insights',
      shouldRedirect: false,
      description: 'Insights into company requests'
    },
    {
      title: 'Companies',
      routePath: '/companies',
      oldPath: '/companies/active',
      iconComponent: shallowRef(companiesListIcon),
      shouldRedirect: false,
      description: ''
    },
    {
      title: 'Shuttle request',
      routePath: '/companies/shuttle-requests',
      iconComponent: shallowRef(companiesShuttleRequestIcon),
      oldPath: '/request',
      shouldRedirect: false,
      description: ''
    }
  ]
}
