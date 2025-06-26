import DestinationCard from "@/components/Cards/DestinationCard/DestinationCard";
import SectionTitle from "@/components/shared/SectionTitle/SectionTitle";
import { Container } from "@mui/material";

const TopDestinations = () => {
  const destinations = [
    {
      destination: "California",
      image: "/assets/California.jpg",
    },
    {
      destination: "New York City",
      image: "/assets/New-York-City.jpg",
    },
    {
      destination: "New Jersey",
      image: "/assets/New-Jersey.jpg",
    },
    {
      destination: "Los Angeles",
      image: "/assets/Los-Angeles.jpg",
    },
    {
      destination: "San Francisco",
      image: "/assets/San-Francisco.jpg",
    },
    {
      destination: "Nevada",
      image: "/assets/Nevada_.jpg",
    },
  ];

  return (
    <Container sx={{ marginBottom: 10, marginTop: 10 }}>
      <SectionTitle
        title="Top Destinations"
        description="Discover amazing places around the world"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {destinations.map((dest, index) => (
          <DestinationCard
            key={index}
            destination={dest.destination}
            image={dest.image}
          />
        ))}
      </div>
    </Container>
  );
};

export default TopDestinations;
