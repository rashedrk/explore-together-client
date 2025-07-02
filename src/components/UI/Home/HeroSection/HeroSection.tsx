"use client";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  InputAdornment,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DateRangeIcon from "@mui/icons-material/DateRange";

const HeroSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "65vh",
          marginBottom: isMobile ? 180 : isTablet ? 120 : 60,
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
            backgroundImage: `url('/assets/header.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            imageRendering: "crisp-edges",
            "&:before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              zIndex: 1,
            },
          }}
        />

        {/* Content layer */}
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            color: "white",
            px: { xs: 2, sm: 3, md: 4 },
            pt: { xs: 8, sm: 6, md: 0 },
          }}
        >
          <Box
            sx={{
              maxWidth: { xs: "100%", sm: 600, md: 700 },
              textAlign: "center",
              mb: { xs: 20, sm: 15, md: 0 },
            }}
          >
            <Typography
              component="div"
              variant="h3"
              sx={{
                fontWeight: 700,
                marginBottom: 2,
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                fontSize: { xs: "1.75rem", sm: "2.5rem", md: "3rem" },
              }}
            >
              Explore the World Together
            </Typography>
            <Typography
              variant="body1"
              color={"white"}
              mb={2}
              sx={{
                fontSize: { xs: 14, sm: 16, md: 18 },
                px: { xs: 2, sm: 0 },
              }}
            >
              Find your perfect travel companion and create unforgettable
              memories around the globe
            </Typography>
          </Box>
        </Box>

        {/* Travel Booking Interface */}
        <Paper
          elevation={3}
          sx={{
            position: "absolute",
            bottom: { xs: -160, sm: -120, md: -80, lg: -30 },
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10000,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "stretch", md: "center" },
            backgroundColor: "white",
            borderRadius: { xs: "20px", md: "50px" },
            padding: { xs: "20px", md: "10px" },
            gap: { xs: 2, md: 1 },
            width: { xs: "90%", sm: "85%", md: "auto" },
            minWidth: { xs: "auto", md: "800px" },
            maxWidth: { xs: "500px", sm: "600px", md: "none" },
          }}
        >
          {/* Location Field */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              padding: { xs: "12px 0", md: "12px 20px" },
              borderRight: { xs: "none", md: "1px solid #e0e0e0" },
              borderBottom: { xs: "1px solid #e0e0e0", md: "none" },
              pb: { xs: 2, md: 0 },
            }}
          >
            <Typography variant="body2" color="text.secondary" fontWeight={600}>
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
              padding: { xs: "12px 0", md: "12px 20px" },
              borderRight: { xs: "none", md: "1px solid #e0e0e0" },
              borderBottom: { xs: "1px solid #e0e0e0", md: "none" },
              pb: { xs: 2, md: 0 },
            }}
          >
            <Typography variant="body2" color="text.secondary" fontWeight={600}>
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
              padding: { xs: "12px 0", md: "12px 20px" },
              marginRight: { xs: 0, md: 2 },
              borderBottom: { xs: "1px solid #e0e0e0", md: "none" },
              pb: { xs: 2, md: 0 },
            }}
          >
            <Typography variant="body2" color="text.secondary" fontWeight={600}>
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
              borderRadius: { xs: "12px", md: "25px" },
              padding: { xs: "16px 24px", md: "12px 24px" },
              textTransform: "none",
              fontWeight: 600,
              minWidth: { xs: "100%", md: "100px" },
              marginRight: { xs: 0, md: 1 },
              mt: { xs: 1, md: 0 },
            }}
          >
            Search
          </Button>
        </Paper>
      </div>
    </>
  );
};

export default HeroSection;
