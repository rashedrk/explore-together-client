"use client";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

const Subscribe = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (email) {
      // Handle subscription logic here
      console.log("Subscribing with email:", email);
      // You can add your subscription logic here
    }
  };

  return (
    <Container sx={{ py: 4, my: 5 }}>
      <Card
        sx={{
          display: "flex",
          minHeight: 350,
          borderRadius: 10,
          overflow: "hidden",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: "50%",
            objectFit: "cover",
          }}
          image="/assets/img-2.webp"
          alt="Tropical beach with seaplane"
        />
        <Box
          sx={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            p: 3,
            textAlign: "center",
          }}
        >
          <CardContent sx={{ flex: "1 0 auto", p: 4 }}>
            <Typography
              component="h2"
              variant="h4"
              sx={{
                fontWeight: "bold",
                mb: 2,
                color: "#2d3748",
                lineHeight: 1.2,
              }}
            >
              Get special offers, and more from Traveler
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#718096",
                mb: 4,
                fontSize: "1.1rem",
                lineHeight: 1.5,
              }}
            >
              Subscribe to see secret deals prices drop the moment you sign up!
            </Typography>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                variant="contained"
                onClick={handleSubscribe}
                sx={{
                  color: "white",
                  px: 4,
                  py: 1.7,
                  borderRadius: 2,
                  fontWeight: "600",
                  fontSize: "1rem",
                  textTransform: "none",
                  minWidth: "140px",
                  boxShadow: "0 4px 12px rgba(66, 153, 225, 0.3)",
                }}
              >
                Subscribe
              </Button>
            </Box>
          </CardContent>
        </Box>
      </Card>
    </Container>
  );
};

export default Subscribe;
