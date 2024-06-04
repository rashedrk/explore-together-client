import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const TravelCard = ({ trip }: any) => {
  return (
    <Card
   sx={{ maxWidth: 345, pb: 2, 
      backgroundColor: "F5F5F5",
     }}>
      <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {trip.destination}
        </Typography>
        <Typography gutterBottom variant="body1" color="text.secondary">
          ({trip.startDate} - {trip.endDate})
        </Typography>
        <Typography variant="body2" gutterBottom color="text.secondary">
          {trip.description.slice(0, 200)}...
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button size="small">Details</Button>
      </CardActions>
    </Card>
  );
};

export default TravelCard;
