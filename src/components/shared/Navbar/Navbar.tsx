"use client";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import Image from "next/image";
import logo from "@/assets/logo.png";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getUserInfo, removeUser } from "@/services/auth.services";
import { useRouter, usePathname } from "next/navigation";
import { clearAuthCookie } from "@/services/actions/logoutUser";

// const pages = ["Home", "About Us", "My Profile"];

function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [userData, setUserData] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const user = getUserInfo();
    setUserData(user);
  }, []);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const pages = [
    {
      name: "Home",
      route: "/",
    },
    {
      name: "All Tours",
      route: "/travel",
    },
    {
      name: "About Us",
      route: "/about",
    },
    ...(isClient && userData
      ? [
          {
            name: "My Profile",
            route: "/profile",
          },
        ]
      : []),
  ];

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

  const isActivePage = (route: string) => {
    // Handle empty or invalid routes
    if (!route || route === "") {
      return false;
    }

    if (route === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(route);
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: "transparent",
        backdropFilter: "none",
        borderBottom: "none",
        boxShadow: "none",
        transition: "all 0.3s ease-in-out",
        zIndex: 9999,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {/* Desktop logo and name  */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              flexGrow: 0.8,
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          >
            <Link href="/" style={{ display: "flex", alignItems: "center" }}>
              <Image
                height={80}
                width={80}
                src={logo}
                alt="logo"
                style={{
                  borderRadius: "8px",
                  transition: "all 0.3s ease",
                }}
              />
            </Link>
          </Box>

          {/* mobile screen hamburger menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{
                color: "#113D48",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "rgba(28, 168, 203, 0.1)",
                  transform: "rotate(90deg)",
                  color: "#1CA8CB",
                },
              }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
                "& .MuiPaper-root": {
                  borderRadius: "12px",
                  background: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(20px)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  mt: 1,
                },
              }}
            >
              {pages.map((page, index) => {
                const isActive = isActivePage(page.route);
                return (
                  <MenuItem
                    key={index}
                    onClick={handleCloseNavMenu}
                    component={Link}
                    href={page.route}
                    sx={{
                      backgroundColor: isActive
                        ? "rgba(28, 168, 203, 0.1)"
                        : "transparent",
                      borderLeft: isActive
                        ? "3px solid #1CA8CB"
                        : "3px solid transparent",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "rgba(28, 168, 203, 0.1)",
                        transform: "translateX(8px)",
                        borderLeft: "3px solid #1CA8CB",
                      },
                    }}
                  >
                    <Typography
                      textAlign="center"
                      sx={{
                        fontWeight: isActive ? 600 : 500,
                        color: isActive ? "#1CA8CB" : "#113D48",
                      }}
                    >
                      {page.name}
                    </Typography>
                  </MenuItem>
                );
              })}
            </Menu>
          </Box>

          {/* Mobile screen logo and name  */}
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              mr: 1,
              flexGrow: 1,
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          >
            <Link href="/" style={{ display: "flex", alignItems: "center" }}>
              <Image
                height={70}
                width={70}
                src={logo}
                alt="logo"
                style={{
                  borderRadius: "8px",
                  transition: "all 0.3s ease",
                }}
              />
            </Link>
          </Box>

          {/* Desktop Nav items  */}
          <Box
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, gap: 1 }}
          >
            {pages.map((page, index) => {
              const isActive = isActivePage(page.route);
              return (
                <Typography
                  key={index}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: isActive ? "#1CA8CB" : "#113D48",
                    display: "block",
                    mx: 2,
                    fontWeight: isActive ? 600 : 500,
                    fontSize: "16px",
                    position: "relative",
                    textDecoration: "none",
                    padding: "8px 16px",
                    borderRadius: "8px",
                    backgroundColor: isActive
                      ? "rgba(28, 168, 203, 0.1)"
                      : "transparent",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      color: "#1CA8CB",
                      backgroundColor: "rgba(28, 168, 203, 0.1)",
                      transform: "translateY(-2px)",
                    },
                    "&::after": {
                      ...(isActive
                        ? {}
                        : {
                            content: '""',
                            position: "absolute",
                            bottom: "4px",
                            left: "50%",
                            transform: `translateX(-50%) scaleX(${
                              isActive ? 1 : 0
                            })`,
                            width: "80%",
                            height: "2px",
                            backgroundColor: "#1CA8CB",
                            borderRadius: "1px",
                            transition: "transform 0.3s ease",
                          }),
                    },
                    "&:hover::after": {
                      transform: "translateX(-50%) scaleX(1)",
                    },
                  }}
                  component={Link}
                  href={page.route}
                >
                  {page.name}
                </Typography>
              );
            })}
          </Box>

          {/* profile for mobile and Desktop  */}
          <Box sx={{ flexGrow: 0 }}>
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
                        width: 40,
                        height: 40,
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
                    href="/dashboard"
                    sx={{
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "rgba(28, 168, 203, 0.1)",
                        transform: "translateX(4px)",
                      },
                    }}
                  >
                    <ListItemIcon>
                      <DashboardIcon sx={{ color: "#1CA8CB" }} />
                    </ListItemIcon>
                    <Typography sx={{ color: "#113D48", fontWeight: 500 }}>
                      Dashboard
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
            ) : isClient ? (
              <Link href="/login" style={{ textDecoration: "none" }}>
                <Button
                  sx={{
                    borderRadius: "8px",
                    textTransform: "none",
                    fontWeight: 600,
                    px: 3,
                    py: 1,
                    color: "white",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      // background: "linear-gradient(135deg, #1565c0, #0d47a1)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 20px rgba(25, 118, 210, 0.4)",
                    },
                  }}
                >
                  Login
                </Button>
              </Link>
            ) : null}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
