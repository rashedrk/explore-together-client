import {
  Box,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import facebookIcon from "@/assets/facebook.png";
import instagramIcon from "@/assets/instagram.png";
import twitterIcon from "@/assets/twitter.png";
import linkedIcon from "@/assets/linkedin.png";
import logo from "@/assets/search.png";

const Footer = () => {
  return (
    <Box bgcolor="rgb(17, 26, 34)" py={5}>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Image src={logo} height={150} width={150} alt="logo" />
            <Typography
              color="white"
              component="h4"
              sx={{
                fontWeight: 600,
              }}
            >
              Lets
              <Box
                component="span"
                sx={{
                  color: "#ff5403",
                  mx: 0.3,
                }}
              >
                {" "}
                Explore
              </Box>{" "}
              Together
            </Typography>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography
              color="#808C8C"
              component="h3"
              sx={{
                fontWeight: 600,
                textTransform: "uppercase",
                mb: 1,
              }}
            >
              Quicks Links
            </Typography>
            <Typography color="white" component={Link} href="/">
              Home
            </Typography>
            <Typography color="white" component={Link} href="/about">
              Terms & Conditions
            </Typography>
            <Typography color="white" component={Link} href="/about">
              Privacy Policy
            </Typography>
            <Typography color="white" component={Link} href="/about">
              Contact Us
            </Typography>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography
              color="#808C8C"
              component="h3"
              sx={{
                fontWeight: 600,
                textTransform: "uppercase",
                mb: 1,
              }}
            >
              Contact Info
            </Typography>
            <Typography color="white" component="h4">
              Mirpur, Dhaka, Bangladesh
            </Typography>
            <Typography color="white" component="h4">
              (+880)17264821
            </Typography>
            <Typography color="white" component="h4">
              info@exploretogether.com
            </Typography>
            <Stack direction="row" gap={2}>
              <Image src={facebookIcon} width={30} height={30} alt="facebook" />
              <Image
                src={instagramIcon}
                width={30}
                height={30}
                alt="facebook"
              />
              <Image src={twitterIcon} width={30} height={30} alt="facebook" />
              <Image src={linkedIcon} width={30} height={30} alt="facebook" />
            </Stack>
          </Grid>
        </Grid>
        <Box
          sx={{
            border: "1px dashed lightgray",
            my : 2
          }}
        ></Box>
        <Typography component="p"  textAlign="center" color="white">
          &copy;2024 Explore Together. All Rights Reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
