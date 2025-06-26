import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";

const HeroSection = () => {
  return (
    <>
      <Container
        sx={{
          position: "relative",
          height: "80vh",
          width: "100vw",
          // marginBottom: 10,
          marginBottom: 2,
        }}
      >
        {/* Background layer with overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url('/assets/beach.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            "&:before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.3)", // Adjust the opacity value for desired darkness
              zIndex: 1,
            },
          }}
        />

        {/* Content layer */}
        <Box
          sx={{
            position: "relative",
            zIndex: 2, // Ensure content is above the overlay
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            color: "white", // Text color to contrast with the dark background
          }}
        >
          <Box
            sx={{
              width: 600,
              textAlign: "center",
            }}
          >
            <Typography
              component="div"
              variant="h4"
              sx={{
                fontWeight: 700,
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
              }}
            >
              Discover New Adventures with the Perfect Travel Buddy!
            </Typography>
            <Typography variant="body1" color={"white"} mb={2}>
              Connect with like-minded travelers and make your journeys more
              exciting and memorable.
            </Typography>

            {/* <Link href="/travel">
          <Button>See Trips</Button>
          </Link> */}
          </Box>
        </Box>
        {/* <Box
          sx={{
            position: "absolute",
            bottom: -20,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10000,
            display: "flex",
            alignItems: "center",
          }}
        >
          <TextField
            id="outlined-basic"
            placeholder="Search here..."
            variant="outlined"
            size="small"
            sx={{
              backgroundColor: "white",
              width: 300,
            }}
          />
          <Button>Search</Button>
        </Box> */}
      </Container>
    </>
  );
};

export default HeroSection;
