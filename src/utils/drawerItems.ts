
import { DrawerItem, UserRole } from '@/types/common';
import { USER_ROLE } from '@/constants/role';

import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import HomeIcon from '@mui/icons-material/Home';

export const drawerItems = (role: UserRole): DrawerItem[] => {
   const roleMenus: DrawerItem[] = [];


   switch (role) {
      case USER_ROLE.ADMIN:
         roleMenus.push(
            {
               title: 'Home',
               path: `/`,
               icon: HomeIcon,
            },
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

      default:
         break;
   }

   return [...roleMenus];
};