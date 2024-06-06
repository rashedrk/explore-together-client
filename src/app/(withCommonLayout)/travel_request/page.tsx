"use client";

import CSForm from "@/components/Forms/CSForm";
import CSInput from "@/components/Forms/CSInput";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Grid,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { z } from "zod";

const TravelRequestPage = () => {
  const [checked, setChecked] = useState(false);

  const validationSchema = z.object({
    name: z.string({ required_error: "Enter your name" }),
    email: z.string().email("Enter your email address"),
    reason: z.string({ required_error: "Please add additional information" }),
  });
  const defaultValues = {
    destination: "Paris, London",
    duration: "20/02/23 - 23/03/23",
    name: "",
    email: "",
  };
  const submitRequest = (values: FieldValues) => {
    console.log(values);
  };
  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        // width: "100vw",
        overflow: "hidden",
      }}
    >
      {/* Background layer with overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url('/assets/beach-2.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          "&:before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the opacity value for desired darkness
            zIndex: 1,
          },
        }}
      />

      {/* Content layer */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          color: "white",
        }}
      >
        <Card
          sx={{
            backgroundColor: "white",
            color: "black",
            maxWidth: 450,
            p: 2,
            zIndex: 3,
            boxShadow: "-1px 7px 36px 0px rgba(0,0,0,0.75)",
          }}
        >
          <CardContent>
            <Typography variant="h5" component="div">
              Travel{" "}
              <Box component="span" sx={{ color: "primary.main" }}>
                Request
              </Box>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Welcome to the travel request page!
            </Typography>

            <CSForm
              onSubmit={submitRequest}
              resolver={zodResolver(validationSchema)}
              defaultValues={defaultValues}
            >
              <Grid container justifyContent="center" spacing={2} mt={2}>
                <Grid item md={6}>
                  <CSInput
                    name="destination"
                    type="text"
                    label="Destination"
                    disabled={true}
                  />
                </Grid>
                <Grid item md={6}>
                  <CSInput
                    name="duration"
                    type="text"
                    label="Duration"
                    disabled={true}
                  />
                </Grid>

                <Grid item md={6}>
                  <CSInput name="name" type="text" label="Name" />
                </Grid>
                <Grid item md={6}>
                  <CSInput name="email" type="email" label="Email" />
                </Grid>
                <Grid item md={12}>
                  <CSInput
                    name="reason"
                    type="text"
                    multiline={true}
                    label="Why join with us?"
                    fullWidth={true}
                  />
                </Grid>
                <Grid item md={12}>
                  <Checkbox
                    checked={checked}
                    onClick={() => setChecked(!checked)}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      fontSize: 15,
                    }}
                  >
                    I agree to the terms & conditions
                  </Typography>
                </Grid>
              </Grid>
              <Button type="submit" disabled={!checked}>
                Request
              </Button>
            </CSForm>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default TravelRequestPage;
