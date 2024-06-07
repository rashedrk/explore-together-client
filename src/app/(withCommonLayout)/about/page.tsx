import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";

import mission from "@/assets/5064484.jpg";
import BusinessIcon from "@mui/icons-material/Business";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';

const AboutUsPage = () => {
  return (
    <Container>
      <Box sx={{ textAlign: "center" }}>
        <Typography component="div" variant="h4">
          About{" "}
          <Box component="span" sx={{ color: "primary.main" }}>
            Us
          </Box>
        </Typography>
      </Box>
      <Box sx={{ mb: 3 }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item md={6}>
            <Typography variant="h5" mb={1}>
              Our Mission
            </Typography>
            <Typography variant="body1">
              At Explore Together, our mission is to connect travelers from all
              over the world, fostering shared adventures and unforgettable
              experiences. We believe that exploring new places is more
              enjoyable and enriching when done with like-minded companions. Our
              platform is designed to help you find the perfect travel buddy,
              making your trips safer, more fun, and truly memorable.
            </Typography>
          </Grid>
          <Grid item md={6} sx={{ pl: 10 }}>
            <Image src={mission} height={300} width={300} alt="mission" />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ my: 5, textAlign: "center" }}>
        <Typography variant="h5" mb={3}>
          Meet The Team
        </Typography>
        <Grid container justifyContent="center" alignItems="center" spacing={4}>
          <Grid item md={12} sx={{ display: "flex", justifyContent: "center" }}>
            <Card sx={{ minWidth: 275, maxWidth: 300 }}>
              <CardContent>
                <Image
                  src="https://i.ibb.co/JF2PJq1/foto-sushi-6anudmp-ILw4-unsplash.jpg"
                  height={300}
                  width={300}
                  alt="founder"
                />

                <Typography variant="h5" mt={2} component="div">
                  Nilson Mandela
                </Typography>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Avid traveler and visionary behind Explore Together, dedicated
                  to connecting people through shared adventures.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={4} sx={{ display: "flex", justifyContent: "center" }}>
            <Card sx={{ minWidth: 275, maxWidth: 300 }}>
              <CardContent>
                <Image
                  src="https://i.ibb.co/rf29bzb/christian-buehner-DIt-Ylc26z-VI-unsplash.jpg"
                  height={300}
                  width={300}
                  alt="founder"
                />

                <Typography variant="h5" mt={2} component="div">
                  David Harsen
                </Typography>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Tech enthusiast and developer, ensuring a seamless and
                  user-friendly experience on our platform.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={4} sx={{ display: "flex", justifyContent: "center" }}>
            <Card sx={{ minWidth: 275, maxWidth: 300 }}>
              <CardContent>
                <Image
                  src="https://i.ibb.co/zXKx01f/edward-cisneros-H6wpor9mjs-unsplash.jpg"
                  height={300}
                  width={300}
                  alt="founder"
                />

                <Typography variant="h5" mt={2} component="div">
                  Misa Nitika
                </Typography>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Community manager, fostering a welcoming and supportive
                  environment for all our users.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={4} sx={{ display: "flex", justifyContent: "center" }}>
            <Card sx={{ minWidth: 275, maxWidth: 300 }}>
              <CardContent>
                <Image
                  src="https://i.ibb.co/DrRG5Xm/warren-VVEw-JJRRHgk-unsplash.jpg"
                  height={300}
                  width={300}
                  alt="founder"
                />

                <Typography variant="h5" mt={2} component="div">
                  Kevin Dyson
                </Typography>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Marketing guru, spreading the word about Explore Together and
                  our mission to connect travelers.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ my: 4 }}>
        <Typography variant="h5" mb={3}>
          Get in touch
        </Typography>
        <Grid container spacing={4}>
          <Grid item md={6}>
            <Box>
              <Grid container spacing={2}>
                <Grid item md={12}>
                  <TextField
                    label="Enter message"
                    variant="outlined"
                    multiline
                    rows={4}
                    fullWidth
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    label="Enter Your name"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    label="Enter Your email"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item md={12}>
                  <TextField
                    label="Enter Your subject"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Button sx={{ mt: 2 }}>Send message</Button>
            </Box>
          </Grid>

          <Grid item md={6}>
            <Box sx={{display: "flex", gap:1, alignItems: "center", my:2 }}>
              <BusinessIcon />
              <Typography component="h4" >Mirpur, Dhaka, Bangladesh</Typography>
            </Box>
            <Box sx={{display: "flex", gap:1, alignItems: "center",my:2 }}>
              <LocalPhoneIcon />
              <Typography component="h4">(+880)17264821</Typography>
            </Box>
            <Box sx={{display: "flex", gap:1, alignItems: "center",my:2 }}>
              <MailOutlineIcon />
              <Typography component="h4">info@exploretogether.com</Typography>
            </Box>
            <Box sx={{display: "flex", gap:1, alignItems: "center",my:3 }}>
              <FacebookIcon />
              <XIcon />
              <InstagramIcon />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AboutUsPage;
