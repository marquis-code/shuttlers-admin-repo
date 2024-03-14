import amenitiesIcon from '@/assets/icons/src/configure/amenities.vue'
import routePricingIcon from '@/assets/icons/src/configure/route-pricing-control.vue'
import tripRatingSettingsIcon from '@/assets/icons/src/configure/trip-rating-settings.vue'
import vehicleConfigIcon from '@/assets/icons/src/configure/vehicle.vue'
import configureIcon from '@/assets/icons/src/configure.vue'

const isProd = computed(() => {
  return location.host === 'v3.admin.shuttlers.africa'
})

export default {
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
      iconComponent: tripRatingSettingsIcon,
      description: 'Configure and manage trip rating parameters'
    },
    {
      title: 'Vehicle Categories',
      routePath: '/configuration/vehicle-category-management',
      oldPath: '/configuration/vehicle/category-management',
      shouldRedirect: true,
      iconComponent: vehicleConfigIcon,
      description: 'Manage vehicle categories'
    },
    {
      title: 'Amenities',
      routePath: '/configuration/vehicle-amenities',
      oldPath: '/configuration/vehicle-amenities/vehicle-amenities-settings',
      shouldRedirect: true,
      iconComponent: amenitiesIcon,
      description: 'Manage vehicle amenities'
    },
    {
      title: 'Route Price Control',
      routePath: isProd.value
        ? '/configuration/pricing/payment-option'
        : '/configuration/pricing/pricing-control',
      oldPath: '/configuration/pricing-controls/',
      shouldRedirect: true,
      iconComponent: routePricingIcon,
      description: 'Manage route pricing centrally'
    }
  ],
  requiredAdmin: false
}
