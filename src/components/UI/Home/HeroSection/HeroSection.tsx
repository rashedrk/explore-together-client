import { Box, Button, Container, Paper, Typography } from "@mui/material";
import Link from "next/link";

const HeroSection = () => {
  return (
    <Container
      sx={{
        position: "relative",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
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
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the opacity value for desired darkness
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
              
            }}
          >
            Discover New Adventures with the Perfect Travel Buddy!
          </Typography>
          <Typography variant="body1" color={"white"} mb={2}>
          Connect with like-minded travelers and make your journeys more exciting and memorable.
          </Typography>

          <Link href="/trip">
          <Button>Join Now</Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default HeroSection;
