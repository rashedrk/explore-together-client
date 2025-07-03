"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {
  Avatar,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  ListItemIcon,
  Divider,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "next/link";

import SideBar from "../Sidebar/Sidebar";
import { getUserInfo, removeUser } from "@/services/auth.services";
import { clearAuthCookie } from "@/services/actions/logoutUser";
import { useRouter } from "next/navigation";
import { Home } from "@mui/icons-material";

const drawerWidth = 240;

export default function DashboardDrawer({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [userData, setUserData] = React.useState<any>(null);
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
    const user = getUserInfo();
    setUserData(user);
  }, []);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    // Clear localStorage
    removeUser();
    // Clear cookie
    await clearAuthCookie();
    // Update state
    setUserData(null);
    // Refresh the page
    router.refresh();
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 2px 20px rgba(0, 0, 0, 0.05)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <Toolbar sx={{ minHeight: "72px" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: { sm: "none" },
              color: "#1CA8CB",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "rgba(28, 168, 203, 0.1)",
                transform: "scale(1.1)",
              },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box>
              <Typography
                variant="h5"
                noWrap
                component="div"
                sx={{
                  color: "#113D48",
                  fontWeight: 700,
                  letterSpacing: "-0.5px",
                  background:
                    "linear-gradient(135deg, #113D48 0%, #1CA8CB 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Dashboard
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "rgba(17, 61, 72, 0.6)",
                  fontWeight: 400,
                  fontSize: "0.875rem",
                }}
              >
                Welcome back, {userData?.name || "User"}
              </Typography>
            </Box>
            <Stack direction="row" gap={2}>
              {isClient && userData ? (
                <>
                  <Tooltip title="Account settings">
                    <IconButton
                      onClick={handleOpenUserMenu}
                      sx={{
                        p: 0,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.1)",
                        },
                      }}
                    >
                      <Avatar
                        src={
                          userData?.profileImage ||
                          userData?.avatar ||
                          "/assets/default-avatar.png"
                        }
                        alt={userData?.name || "User"}
                        sx={{
                          bgcolor: "#1CA8CB",
                          width: 44,
                          height: 44,
                          fontSize: "1.1rem",
                          fontWeight: 600,
                          border: "2px solid rgba(28, 168, 203, 0.2)",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            border: "2px solid #1CA8CB",
                            boxShadow: "0 4px 20px rgba(28, 168, 203, 0.4)",
                          },
                        }}
                      >
                        {userData?.name?.charAt(0)?.toUpperCase() || "U"}
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{
                      mt: "45px",
                      "& .MuiPaper-root": {
                        borderRadius: "12px",
                        background: "rgba(255, 255, 255, 0.95)",
                        backdropFilter: "blur(20px)",
                        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        minWidth: "180px",
                      },
                    }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem
                      onClick={handleCloseUserMenu}
                      component={Link}
                      href="/"
                      sx={{
                        transition: "all 0.3s ease",
                        "&:hover": {
                          backgroundColor: "rgba(28, 168, 203, 0.1)",
                          transform: "translateX(4px)",
                        },
                      }}
                    >
                      <ListItemIcon>
                        <Home sx={{ color: "#1CA8CB" }} />
                      </ListItemIcon>
                      <Typography sx={{ color: "#113D48", fontWeight: 500 }}>
                        Home
                      </Typography>
                    </MenuItem>
                    <MenuItem
                      onClick={handleCloseUserMenu}
                      component={Link}
                      href="/profile"
                      sx={{
                        transition: "all 0.3s ease",
                        "&:hover": {
                          backgroundColor: "rgba(28, 168, 203, 0.1)",
                          transform: "translateX(4px)",
                        },
                      }}
                    >
                      <ListItemIcon>
                        <PersonIcon sx={{ color: "#1CA8CB" }} />
                      </ListItemIcon>
                      <Typography sx={{ color: "#113D48", fontWeight: 500 }}>
                        Profile
                      </Typography>
                    </MenuItem>
                    <Divider sx={{ my: 1 }} />
                    <MenuItem
                      onClick={() => {
                        handleCloseUserMenu();
                        handleLogout();
                      }}
                      sx={{
                        transition: "all 0.3s ease",
                        "&:hover": {
                          backgroundColor: "rgba(238, 90, 82, 0.1)",
                          transform: "translateX(4px)",
                        },
                      }}
                    >
                      <ListItemIcon>
                        <LogoutIcon sx={{ color: "#ee5a52" }} />
                      </ListItemIcon>
                      <Typography sx={{ color: "#ee5a52", fontWeight: 500 }}>
                        Logout
                      </Typography>
                    </MenuItem>
                  </Menu>
                </>
              ) : null}
            </Stack>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <SideBar />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          <SideBar />
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Box>{children}</Box>
      </Box>
    </Box>
  );
}
