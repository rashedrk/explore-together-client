import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import { Box, Stack, IconButton, Chip, Avatar, Rating } from "@mui/material";
import Link from "next/link";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarIcon from "@mui/icons-material/Star";

const TravelCard = ({ trip }: any) => {
  // Calculate duration in days
  const duration = dayjs(trip?.endDate).diff(dayjs(trip?.startDate), "d");


  const rating = trip.rating || 5;
  const reviewCount = trip.reviewCount || 3;
  const price = trip.budget || 180;
  const originalPrice = trip.budget || price + 20;
  const discount = trip.discount || null;
  const hasDiscount = discount && discount > 0;

  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        borderRadius: 3,
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        transition: "all 0.3s ease",
        cursor: "pointer",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
        },
        position: "relative",
        overflow: "visible",
      }}
    >
      {/* Image Container with Overlay Elements */}
      <Box sx={{ position: "relative" }}>
        <CardMedia
          sx={{
            height: { xs: 240, sm: 280, md: 300 },
            borderRadius: "12px 12px 0 0",
            position: "relative",
          }}
          image={trip.photos[0]}
        />

        {/* Discount Badge */}
        {hasDiscount && (
          <Chip
            label={`-${discount}%`}
            sx={{
              position: "absolute",
              top: 12,
              left: 12,
              backgroundColor: "#e91e63",
              color: "white",
              fontWeight: "bold",
              fontSize: "12px",
              height: "24px",
            }}
          />
        )}

        {/* Heart/Favorite Icon */}
        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            // backgroundColor: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(10px)",
            "&:hover": {
              backgroundColor: "rgba(255,255,255,1)",
            },
          }}
        >
          <FavoriteBorderIcon sx={{ fontSize: 20 }} />
        </IconButton>

        {/* Host Avatar */}
        <Avatar
          sx={{
            position: "absolute",
            bottom: -15,
            right: 15,
            width: 35,
            height: 35,
            border: "3px solid white",
          }}
          src={trip.hostAvatar || "/assets/avatar-placeholder.jpg"}
        />
      </Box>

      <CardContent
        sx={{ padding: { xs: "18px 16px 16px", sm: "24px 20px 20px" } }}
      >
        {/* Location */}
        <Typography
          variant="body2"
          component="div"
          color="text.secondary"
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: 1,
            fontSize: "14px",
          }}
        >
          <FmdGoodOutlinedIcon sx={{ fontSize: 16, marginRight: 0.5 }} />
          {trip.destination}
        </Typography>

        {/* Title */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            fontSize: { xs: "16px", sm: "18px" },
            lineHeight: 1.3,
            marginBottom: 1.5,
            color: "#2c3e50",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "2",
            WebkitBoxOrient: "vertical",
            textAlign: "left",
          }}
        >
          {trip.title || "Two Hour Walking Tour of Manhattan"}
        </Typography>

        {/* Rating and Reviews */}
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ marginBottom: 3 }}
        >
          <Rating
            value={rating}
            readOnly
            size="small"
            sx={{
              "& .MuiRating-iconFilled": {
                color: "#ffc107",
              },
            }}
          />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "14px" }}
          >
            {rating} ({reviewCount} Reviews)
          </Typography>
        </Stack>

        {/* Price and Duration */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            {hasDiscount && (
              <Typography
                variant="body2"
                sx={{
                  textDecoration: "line-through",
                  color: "text.secondary",
                  fontSize: "12px",
                }}
              >
                ${originalPrice}.00
              </Typography>
            )}
            <Typography
              variant="body1"
              sx={{
                fontWeight: 700,
                fontSize: { xs: "16px", sm: "18px" },
                color: "#2c3e50",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Typography
                component="span"
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: "14px", fontWeight: 400 }}
              >
                From
              </Typography>
              ${price}.00
            </Typography>
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: "flex",
              alignItems: "center",
              fontSize: "14px",
            }}
          >
            <ScheduleOutlinedIcon sx={{ fontSize: 16, marginRight: 0.5 }} />
            {duration === 1 ? "1 day" : `${duration} days`}
          </Typography>
        </Stack>
      </CardContent>

      {/* Invisible Link Overlay for Full Card Click */}
      <Link
        href={`/travel/${trip.id}`}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
          textDecoration: "none",
        }}
      />
    </Card>
  );
};

export default TravelCard;
