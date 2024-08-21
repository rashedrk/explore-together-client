import { Card, CardMedia, Typography } from "@mui/material";
import Image from "next/image";

const CategoryCard = () => {
  return (
    <Card>
        <CardMedia
        sx={{ height: 240 }}
        image="https://swiperjs.com/demos/images/nature-1.jpg"
        title="green iguana"
      />
      <Typography gutterBottom variant="h5" component="div">
        Maldives
      </Typography>
    </Card>
  );
};

export default CategoryCard;
