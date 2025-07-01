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
import Image from "next/image";
import logo from "@/assets/logo.png";
import Link from "next/link";
import { useState } from "react";
import { getUserInfo, removeUser } from "@/services/auth.services";
import { useRouter } from "next/navigation";

// const pages = ["Home", "About Us", "My Profile"];

function Navbar() {
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

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

  const userData = getUserInfo();

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
    userData
      ? {
          name: "My Profile",
          route: "/profile",
        }
      : {
          name: "",
          route: "",
        },
  ];

  const handleLogout = () => {
    removeUser();
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
              {pages.map((page, index) => (
                <MenuItem
                  key={index}
                  onClick={handleCloseNavMenu}
                  component={Link}
                  href={page.route}
                  sx={{
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "rgba(28, 168, 203, 0.1)",
                      transform: "translateX(8px)",
                    },
                  }}
                >
                  <Typography
                    textAlign="center"
                    sx={{
                      fontWeight: 500,
                      color: "#113D48",
                    }}
                  >
                    {page.name}
                  </Typography>
                </MenuItem>
              ))}
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
            {pages.map((page, index) => (
              <Typography
                key={index}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "#113D48",
                  display: "block",
                  mx: 2,
                  fontWeight: 500,
                  fontSize: "16px",
                  position: "relative",
                  textDecoration: "none",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: "#1CA8CB",
                    backgroundColor: "rgba(28, 168, 203, 0.1)",
                    transform: "translateY(-2px)",
                  },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: "4px",
                    left: "50%",
                    transform: "translateX(-50%) scaleX(0)",
                    width: "80%",
                    height: "2px",
                    backgroundColor: "#1CA8CB",
                    borderRadius: "1px",
                    transition: "transform 0.3s ease",
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
            ))}
          </Box>

          {/* profile for mobile and Desktop  */}
          <Box sx={{ flexGrow: 0 }}>
            {userData ? (
              <Button
                onClick={() => {
                  handleLogout();
                  // router.refresh();
                }}
                sx={{
                  borderRadius: "8px",
                  textTransform: "none",
                  fontWeight: 600,
                  px: 3,
                  py: 1,
                  background: "linear-gradient(135deg, #ff6b6b, #ee5a52)",
                  color: "white",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: "linear-gradient(135deg, #ee5a52, #dc4c64)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 20px rgba(238, 90, 82, 0.4)",
                  },
                }}
              >
                Logout
              </Button>
            ) : (
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
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
