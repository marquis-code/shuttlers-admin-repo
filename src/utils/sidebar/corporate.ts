import corporateIcon from '@/assets/icons/src/companies.vue'

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
        oldPath: '/companies/insights',
        shouldRedirect: false,
        description: 'Insights into company requests'
      },
      {
        title: 'Companies',
        routePath: '/companies',
        oldPath: '/companies/active',
          shouldRedirect: false,
        description: ''
      },
      {
        title: 'Shuttle request',
        routePath: '/companies/shuttle-requests',
        oldPath: '/request',
          shouldRedirect: false,
        description: ''
      }
    ]
  }
