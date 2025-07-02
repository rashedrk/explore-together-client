"use client";
import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
  IconButton,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { styled } from "@mui/material/styles";
import facebookIcon from "@/assets/facebook.png";
import instagramIcon from "@/assets/instagram.png";
import twitterIcon from "@/assets/twitter.png";
import linkedIcon from "@/assets/linkedin.png";
import logo from "@/assets/search.png";

// Styled components for better design
const StyledFooterLink = styled(Typography)(({ theme }) => ({
  color: "#B0B0B0",
  textDecoration: "none",
  transition: "all 0.3s ease",
  cursor: "pointer",
  fontSize: "0.9rem",
  "&:hover": {
    color: theme.palette.primary.main,
    transform: "translateX(5px)",
  },
}));

const StyledSocialIcon = styled(IconButton)(({ theme }) => ({
  padding: "8px",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  borderRadius: "50%",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    transform: "translateY(-3px)",
    boxShadow: `0 5px 15px ${theme.palette.primary.main}40`,
  },
}));

const StyledSectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: "1.1rem",
  marginBottom: "1.5rem",
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: "-8px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "40px",
    height: "3px",
    backgroundColor: theme.palette.primary.main,
    borderRadius: "2px",
    [theme.breakpoints.up("md")]: {
      left: 0,
      transform: "none",
    },
  },
}));

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        background: `rgb(25, 35, 45)`,
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: `linear-gradient(90deg, transparent, ${theme.palette.primary.main}, transparent)`,
        },
      }}
    >
      <Container maxWidth="lg">
        <Box py={{ xs: 4, md: 3 }}>
          <Grid container spacing={{ xs: 4, md: 6 }}>
            {/* Logo and Brand Section */}
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: { xs: "center", md: "flex-start" },
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    mb: 2,
                    "&:hover": {
                      transform: "scale(1.05)",
                      transition: "transform 0.3s ease",
                    },
                  }}
                >
                  <Image
                    src={logo}
                    height={isMobile ? 50 : 80}
                    width={isMobile ? 50 : 80}
                    alt="Explore Together Logo"
                    style={{ borderRadius: "12px" }}
                  />
                </Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: "white",
                    mb: 2,
                    fontSize: { xs: "1rem", md: "1.2rem" },
                  }}
                >
                  Let&apos;s
                  <Box
                    component="span"
                    sx={{
                      color: theme.palette.primary.main,
                      mx: 0.5,
                    }}
                  >
                    Explore
                  </Box>
                  Together
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#B0B0B0",
                    lineHeight: 1.6,
                    maxWidth: "250px",
                  }}
                >
                  Discover amazing destinations and create unforgettable
                  memories with fellow travelers from around the world.
                </Typography>
              </Box>
            </Grid>

            {/* Quick Links Section */}
            <Grid item xs={12} sm={6} md={4}>
              <Box
                sx={{
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                <StyledSectionTitle color="white">
                  Quick Links
                </StyledSectionTitle>
                <Stack spacing={1.5}>
                  <Link href="/" style={{ textDecoration: "none" }}>
                    <StyledFooterLink>Home</StyledFooterLink>
                  </Link>
                  <Link href="/about" style={{ textDecoration: "none" }}>
                    <StyledFooterLink>About Us</StyledFooterLink>
                  </Link>
                  <Link href="/travel" style={{ textDecoration: "none" }}>
                    <StyledFooterLink>Destinations</StyledFooterLink>
                  </Link>
                  <Link
                    href="/travel_request"
                    style={{ textDecoration: "none" }}
                  >
                    <StyledFooterLink>Travel Requests</StyledFooterLink>
                  </Link>
                  <Link href="/post_trip" style={{ textDecoration: "none" }}>
                    <StyledFooterLink>Post Trip</StyledFooterLink>
                  </Link>
                </Stack>
              </Box>
            </Grid>

            {/* Contact Info Section */}
            <Grid item xs={12} sm={6} md={4}>
              <Box
                sx={{
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                <StyledSectionTitle color="white">
                  Contact Info
                </StyledSectionTitle>
                <Stack spacing={1.5} mb={3}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#B0B0B0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: { xs: "center", md: "flex-start" },
                      gap: 1,
                    }}
                  >
                    📍 Mirpur, Dhaka, Bangladesh
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#B0B0B0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: { xs: "center", md: "flex-start" },
                      gap: 1,
                    }}
                  >
                    📞 (+880) 1726 4821
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#B0B0B0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: { xs: "center", md: "flex-start" },
                      gap: 1,
                    }}
                  >
                    ✉️ info@exploretogether.com
                  </Typography>
                </Stack>

                {/* Social Media Icons */}
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#B0B0B0",
                      mb: 2,
                      fontWeight: 600,
                    }}
                  >
                    Follow Us
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={2}
                    justifyContent={{ xs: "center", md: "flex-start" }}
                  >
                    <StyledSocialIcon>
                      <Image
                        src={facebookIcon}
                        width={20}
                        height={20}
                        alt="Facebook"
                      />
                    </StyledSocialIcon>
                    <StyledSocialIcon>
                      <Image
                        src={instagramIcon}
                        width={20}
                        height={20}
                        alt="Instagram"
                      />
                    </StyledSocialIcon>
                    <StyledSocialIcon>
                      <Image
                        src={twitterIcon}
                        width={20}
                        height={20}
                        alt="Twitter"
                      />
                    </StyledSocialIcon>
                    <StyledSocialIcon>
                      <Image
                        src={linkedIcon}
                        width={20}
                        height={20}
                        alt="LinkedIn"
                      />
                    </StyledSocialIcon>
                  </Stack>
                </Box>
              </Box>
            </Grid>
          </Grid>

          {/* Divider */}
          <Divider
            sx={{
              my: 2,
              borderColor: "rgba(255, 255, 255, 0.1)",
              borderWidth: "1px",
            }}
          />

          {/* Copyright Section */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: "#B0B0B0",
                textAlign: { xs: "center", md: "left" },
              }}
            >
              © 2024 Explore Together. All Rights Reserved.
            </Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              alignItems="center"
            >
              <Link href="/terms" style={{ textDecoration: "none" }}>
                <StyledFooterLink>Terms & Conditions</StyledFooterLink>
              </Link>
              <Box
                sx={{
                  width: "1px",
                  height: "16px",
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  display: { xs: "none", sm: "block" },
                }}
              />
              <Link href="/privacy" style={{ textDecoration: "none" }}>
                <StyledFooterLink>Privacy Policy</StyledFooterLink>
              </Link>
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
