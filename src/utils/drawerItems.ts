

import { DrawerItem, UserRole } from '@/types/common';
import { USER_ROLE } from '@/constants/role';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { Add, History } from '@mui/icons-material';


export const drawerItems = (role: UserRole): DrawerItem[] => {
   const roleMenus: DrawerItem[] = [];

   // Common/Shared items for all users
   const sharedItems: DrawerItem[] = [
      {
         title: 'Dashboard',
         path: '',
         icon: DashboardIcon,
      },
      {
         title: 'Post Trip',          
         path: 'post_trip',
         icon: Add,
      }
   ];

   switch (role) {
      case USER_ROLE.ADMIN:
         roleMenus.push(
            ...sharedItems,
            {
               title: 'User management',
               path: `${role}/user_management`,
               icon: PeopleOutlineIcon,
            },
            {
               title: 'Trip Management',
               path: `${role}/trip_management`,
               icon: TravelExploreIcon,
            },
         );
         break;
      case USER_ROLE.USER:
         roleMenus.push(
            ...sharedItems,
            {
               title: 'Travel Posts',
               path: `${role}/travel_post`,
               icon: TravelExploreIcon,
            },
            {
               title: 'Request History',
               path: `${role}/request_history`,
               icon: History,
            },
         );
         break;

      default:
         break;
   }

   return [...roleMenus];
};