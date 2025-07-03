import { Box, List, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

import logo from "@/assets/search.png";
import { UserRole } from "@/types/common";
import SidebarItem from "./SidebarItem";
import { drawerItems } from "@/utils/drawerItems";

const SideBar = ({role}:{role:string}) => {

  return (
    <Box>
      <Stack
        sx={{
          py: 1,
          mt: 1,
        }}
        direction="row"
        justifyContent="center"
        alignItems="center"
        gap={1}
        component={Link}
        href="/"
      >
        <Image src={logo} width={40} height={40} alt="logo" />
        <Typography
          variant="h6"
          component="h1"
          sx={{
            cursor: "pointer",
          }}
        >
          Explore{" "}
          <Box component="span" sx={{ color: "primary.main" }}>
            Together
          </Box>
        </Typography>
      </Stack>
      <List>
        {drawerItems(role as UserRole).map((item, index) => (
          <SidebarItem key={index} item={item} />
        ))}
      </List>
    </Box>
  );
};

export default SideBar;
