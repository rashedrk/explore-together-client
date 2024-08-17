import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import { Box, Stack } from "@mui/material";
import Link from "next/link";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

const TravelCard = ({ trip }: any) => {
  return (
    <Card
      sx={{
        maxWidth: 300,
        pb: 2,
        backgroundColor: "F5F5F5",
        height: 325,
        textAlign: "left",
      }}
    >
      <CardMedia sx={{ height: 150 }} image={trip.photos[0]} />
      <CardContent>
        <Stack
          justifyContent="space-between"
          alignItems="center"
          direction="row"
        >
          <Typography
            variant="body2"
            component="div"
            color="text.secondary"
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <FmdGoodOutlinedIcon sx={{ fontSize: 16, marginRight: 0.5 }} />
            {trip.destination}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <ScheduleOutlinedIcon sx={{ fontSize: 16, marginRight: 0.5 }} />
            {dayjs(trip?.endDate).diff(dayjs(trip?.startDate), "d")} days
          </Typography>
        </Stack>
        <Typography
          variant="body1"
          marginTop={1}
          sx={{
            fontWeight: 600,
            fontSize: 18,
          }}
        >
          {trip.title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "2",
            WebkitBoxOrient: "vertical",
          }}
        >
          {trip.description}
        </Typography>
        <Stack sx={{
          marginTop: 1.5,
          marginBottom: 1.5,
          // textAlign: 'right'
        }}
        >
          <Link href={`/travel/${trip.id}`}>
            <Button size="small">See More</Button>
          </Link>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TravelCard;
