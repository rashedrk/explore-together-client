import TravelCard from "@/components/TravelCard/TravelCard";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const TravelPosts = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/trips?limit=8`,
    { cache: "no-store" }
  );
  const { data: trips } = await res.json();
  return (
    <Box textAlign="center">
      <Typography variant="h4" component="div" gutterBottom>
        Travel{" "}
        <Box component="span" sx={{ color: "primary.main" }}>
          Posts
        </Box>
      </Typography>
      <Container>
        <Grid container justifyContent="center" spacing={2}>
          {trips?.map((trip: any) => (
            <Grid item key={trip.id} md={3}>
              <TravelCard trip={trip} />
            </Grid>
          ))}
        </Grid>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            my: 5,
          }}
        >
          <Button
            variant="outlined"
            sx={{
              color: "#0096FF",
            }}
          >
            All Travel Posts <ArrowForwardIcon fontSize="small" sx={{marginRight:0.5}}/>
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default TravelPosts;
