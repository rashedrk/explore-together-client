import TravelCard from "@/components/TravelCard/TravelCard";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SectionTitle from "@/components/shared/SectionTitle/SectionTitle";
import Link from "next/link";

const TravelPosts = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/trips?limit=8`,
    { cache: "no-store" }
  );
  const { data: trips } = await res.json();
  return (
    <Box textAlign="center">
      {/* <Typography variant="h4" component="div" gutterBottom>
        Travel{" "}
        <Box component="span" sx={{ color: "primary.main" }}>
          Posts
        </Box>
      </Typography> */}
      <SectionTitle
        title="Travel Posts"
        description="Find your all travel posts here"
      />
      <Container>
        <Grid container justifyContent="center" spacing={3}>
          {trips?.map((trip: any) => (
            <Grid item key={trip.id} xs={12} sm={6} md={4}>
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
          <Link href="/travel">
            <Button
              variant="outlined"
              sx={{
                color: "#0096FF",
              }}
            >
              All Travel Posts{" "}
              <ArrowForwardIcon fontSize="small" sx={{ marginRight: 0.5 }} />
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default TravelPosts;
