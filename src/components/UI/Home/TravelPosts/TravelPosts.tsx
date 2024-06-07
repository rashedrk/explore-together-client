import TravelCard from "@/components/TravelCard/TravelCard";
import { Box, Button, Container, Grid, Typography } from "@mui/material";

const TravelPosts = async () => {
  const res = await fetch(
    "https://travel-buddy-matching-server.vercel.app/api/trips?limit=10"
  );
  const { data: trips } = await res.json();
  return (
    <Box textAlign="center">
      <Typography variant="h4" component="div" gutterBottom>
        Travel <Box component="span" sx={{ color: "primary.main" }}>
        Posts
        </Box>
      </Typography>
      <Container>
        <Grid container justifyContent="center" spacing={2}>
          {trips?.map((trip: any) => (
            <Grid item key={trip.id} md={4} >
              <TravelCard trip={trip} />
            </Grid>
          ))}
        </Grid>
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            my:5
        }}>
          <Button variant="outlined" sx={{
            color:"#FF6F61"
          }}>See More</Button>
        </Box>
      </Container>
    </Box>
  );
};

export default TravelPosts;
