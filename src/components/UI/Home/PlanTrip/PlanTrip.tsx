import { Box, Typography } from "@mui/material";
import Image from "next/image";
import "./planTrip.css";

import ModeOfTravelIcon from "@mui/icons-material/ModeOfTravel";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import InsightsIcon from "@mui/icons-material/Insights";
const PlanTrip = () => {
  return (
    <div>
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        alignItems="center"
        justifyContent="center"
        gap={2}
        sx={{ padding: 5 }}
      >
        <Box gridColumn="span 6" justifySelf='center'>
          <Box display="flex" gap={2}>
            <Image
              src="https://wordpress.themeholy.com/tourm/wp-content/uploads/2024/06/about_1_1.jpg"
              alt="4"
              height={200}
              width={200}
              className="img1"
            />
            <Box>
              <Image
                src="https://wordpress.themeholy.com/tourm/wp-content/uploads/2024/06/about_1_2.jpg"
                alt="4"
                height={200}
                width={200}
                className="img2"
              />
              <Image
                src="https://wordpress.themeholy.com/tourm/wp-content/uploads/2024/06/about_1_3.jpg"
                alt="4"
                height={200}
                width={200}
                className="img3"
              />
            </Box>
          </Box>
        </Box>
        <Box gridColumn="span 6" textAlign="left">
          <Typography
            sx={{
              fontWeight: 700,
              color: "#113D48",
              fontSize: 30,
            }}
          >
            Plan Your Trip With us
          </Typography>
          <Typography variant="body2" color="text.secondary" marginBottom={3}>
            Whether you are embarking on a solo adventure or looking for the
            perfect travel companion, Travel Buddy is here to make your journey
            unforgettable. With our easy-to-use platform, you can:
          </Typography>
          <Box width="80%">
            <Box display="flex" alignItems="center" gap={2}>
              <Box
                sx={{
                  backgroundColor: "primary.main",
                  padding: 2,
                  borderRadius: "100px",
                }}
              >
                <ModeOfTravelIcon
                  fontSize="medium"
                  sx={{
                    color: "white",
                  }}
                />
              </Box>
              <Box>
                <Typography variant="h6" color="secondary.main">
                  Post Your Travel Plans
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Share your itinerary, destination, and travel dates. Whether
                  its a weekend getaway or a months-long expedition
                </Typography>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" gap={2} marginTop={2}>
              <Box
                sx={{
                  backgroundColor: "primary.main",
                  padding: 2,
                  borderRadius: "100px",
                }}
              >
                <InsertEmoticonIcon
                  fontSize="medium"
                  sx={{
                    color: "white",
                  }}
                />
              </Box>
              <Box>
                <Typography variant="h6" color="secondary.main">
                  Find Like-minded Travelers
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Browse through other travelers plans and find someone who
                  shares your interests and schedule.
                </Typography>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" gap={2} marginTop={2}>
              <Box
                sx={{
                  backgroundColor: "primary.main",
                  padding: 2,
                  borderRadius: "100px",
                }}
              >
                <InsightsIcon
                  fontSize="medium"
                  sx={{
                    color: "white",
                  }}
                />
              </Box>
              <Box>
                <Typography variant="h6" color="secondary.main">
                  Personalize Your Adventure
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Tailor your trip by finding companions who share your passion
                  for specific activities, be it hiking, cultural exploration.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default PlanTrip;
