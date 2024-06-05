import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import { Box } from "@mui/material";
import Link from "next/link";

const TravelCard = ({ trip }: any) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        pb: 2,
        backgroundColor: "F5F5F5",
        height: 400,
        textAlign: "center",
      }}
    >
      <CardMedia
        sx={{ height: 140 }}
        image={trip.photos[0]}
        title="green iguana"
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {trip.destination}
        </Typography>
        <Typography gutterBottom variant="body1" color="text.secondary">
          ({dayjs(trip?.startDate).format("DD/MM/YYYY")} -
          {dayjs(trip?.endDate).format("DD/MM/YYYY")})
        </Typography>
        <Box
          sx={{
            height: 100,
          }}
        >
          <Typography variant="body2" gutterBottom color="text.secondary">
            {trip.description.slice(0, 200)}...
          </Typography>
        </Box>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Link href={`/travel/${trip.id}`}>
          <Button size="small">Details</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default TravelCard;
