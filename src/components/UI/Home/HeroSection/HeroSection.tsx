import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import Link from "next/link";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DateRangeIcon from "@mui/icons-material/DateRange";

const HeroSection = () => {
  return (
    <>
      <Container
        sx={{
          position: "relative",
          height: "80vh",
          width: "100vw",
          // marginBottom: 10,
          marginBottom: 8,
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

        {/* Travel Booking Interface */}
        <Paper
          elevation={3}
          sx={{
            position: "absolute",
            bottom: -30,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10000,
            display: "flex",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: "50px",
            padding: "10px",
            gap: 1,
            minWidth: "800px",
          }}
        >
          {/* Location Field */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              padding: "12px 20px",
              borderRight: "1px solid #e0e0e0",
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              fontWeight={600}
            >
              Location
            </Typography>
            <TextField
              placeholder="Where are you going?"
              variant="standard"
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOnIcon color="action" />
                  </InputAdornment>
                ),
                sx: { fontSize: "14px" },
              }}
              sx={{
                "& .MuiInput-input": {
                  padding: 0,
                  paddingTop: "10px",
                  fontSize: "14px",
                  color: "#666",
                },
              }}
            />
          </Box>

          {/* Date Field */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              padding: "12px 20px",
              borderRight: "1px solid #e0e0e0",
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              fontWeight={600}
            >
              Date
            </Typography>
            <TextField
              type="date"
              defaultValue="2025-06-26"
              variant="standard"
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <DateRangeIcon color="action" />
                  </InputAdornment>
                ),
                sx: { fontSize: "14px" },
              }}
              sx={{
                "& .MuiInput-input": {
                  padding: 0,
                  paddingTop: "10px",
                  fontSize: "14px",
                  color: "#333",
                },
              }}
            />
          </Box>

          {/* Check out Field */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              padding: "12px 20px",
              marginRight: 2,
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              fontWeight={600}
            >
              Check out
            </Typography>
            <TextField
              type="date"
              defaultValue="2025-06-26"
              variant="standard"
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <DateRangeIcon color="action" />
                  </InputAdornment>
                ),
                sx: { fontSize: "14px" },
              }}
              sx={{
                "& .MuiInput-input": {
                  padding: 0,
                  paddingTop: "10px",
                  fontSize: "14px",
                  color: "#333",
                },
              }}
            />
          </Box>

          {/* Search Button */}
          <Button
            variant="contained"
            sx={{
              color: "white",
              borderRadius: "25px",
              padding: "12px 24px",
              textTransform: "none",
              fontWeight: 600,
              minWidth: "100px",
              marginRight: 1,
            }}
          >
            Search
          </Button>
        </Paper>
      </Container>
    </>
  );
};

export default HeroSection;
