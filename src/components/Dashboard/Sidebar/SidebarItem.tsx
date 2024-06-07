import Link from 'next/link';
import {
   ListItem,
   ListItemButton,
   ListItemIcon,
   ListItemText,
} from '@mui/material';

import { usePathname } from 'next/navigation';
import { DrawerItem } from '@/types/common';

type IProps = {
   item: DrawerItem;
};

const SidebarItem = ({ item }: IProps) => {
   const linkPath = `/dashboard/${item.path}`;
   const pathname = usePathname();

//    console.log({ pathname, linkPath });
   return (
      <Link href={linkPath}>
         <ListItem
            disablePadding
            sx={{
               ...(pathname === linkPath
                  ? {
                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                       '& svg': {
                          color: 'primary.main',
                       },
                    }
                  : {}),
               mb: 1,
            }}
         >
            <ListItemButton >
               <ListItemIcon sx={{ minWidth: 'auto', mr: 2 }}>{item.icon && <item.icon />}</ListItemIcon>
               <ListItemText primary={item.title} sx={{ ml: 0 }}  />
            </ListItemButton>
         </ListItem>
      </Link>
   );
};

export default SidebarItem;