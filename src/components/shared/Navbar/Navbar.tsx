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

// const pages = ["Home", "About Us", "My Profile"];
const pages = [
  {
    name: "Home",
    route: '/'
  },
  {
    name: "About Us",
    route: '/about'
  },
  {
    name: "My Profile",
    route: '/profile'
  }
]

const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(
    null
  );

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

  return (
    <AppBar position="static" sx={{ color: "#333333", background: "white", border: 'none', boxShadow: "none" }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {/* Desktop logo and name  */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, flexGrow: 0.8 }}>
            <Image height={100} width={100} src={logo} alt="logo" />
          </Box>

          {/* mobile screen hamburger menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
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
              }}
            >
              {pages.map((page, index) => (
                <MenuItem key={index} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Mobile screen logo and name  */}
          <Box sx={{ display: { xs: "flex", md: "none" }, mr: 1, flexGrow: 1 }}>
            <Image height={100} width={100} src={logo} alt="logo" />
          </Box>

          {/* Desktop Nav items  */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, index) => (
              <Typography
                key={index}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "#333333", display: "block", mx: 2 }}
                component={Link}
                href={page.route}
              >
                {page.name}
              </Typography>
            ))}
          </Box>

          {/* profile for mobile and Desktop  */}
          <Box sx={{ flexGrow: 0 }}>
            <Link href="/login"><Button>Login</Button></Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
