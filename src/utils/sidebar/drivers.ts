import driverIcon from '@/assets/icons/src/driver.vue'
export default {
    title: 'Drivers',
    routePath: null,
    description: '',
    rootPath: '/drivers',
    iconComponent: shallowRef(driverIcon),
    shouldRedirect: true,
    modulePermission: 'DRIVERS'
    // children: [
    //   {
    //     title: 'Manage ',
    //     routePath: '/drivers',
    //     oldPath: '/drivers/list',
    //     shouldRedirect: true,
    //     description: 'Manage Drivers'
    //   }
    // ]
  }
