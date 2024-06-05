"use client";

import CSDatePicker from "@/components/Forms/CSDatePicker";
import CSFileUploader from "@/components/Forms/CSFileUploader";
import CSForm from "@/components/Forms/CSForm";
import CSInput from "@/components/Forms/CSInput";
import CSSelect from "@/components/Forms/CSSelect";
import { postTrip } from "@/services/actions/postTrip";
import { Button, Container, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const PostTripPage = () => {
  const tripType = ["adventure", "leisure", "business", "camping"];

  const handleSubmit = async (values: FieldValues) => {
    const toastId = toast.loading("Processing! Please wait....");
    const fileArray = [
      values?.photo?.[0],
      values?.photo?.[1],
      values?.photo?.[2],
      values?.photo?.[3],
    ];
    // console.log(fileArray);
    const uploadPromises = fileArray.map((img: File) => {
      const formData = new FormData();
      formData.append("image", img);
      // Return the fetch promise
      return fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            // Return the uploaded image URL
            return data.data.display_url;
          } else {
            // Throw an error if upload failed
            throw new Error("Failed to upload image");
          }
        });
    });

    try {
      const uploadedPhotos = await Promise.all(uploadPromises);
      console.log(uploadedPhotos);

      const tripData = {
        destination: values.destination,
        startDate: values.startDate,
        endDate: values.endDate,
        budget: Number(values.budget),
        activities: values.activities.split(",").map((activity: string) => activity.trim()),
        photos: uploadedPhotos,
        description: values.description,
        type: values.type,
      }

      const res = await postTrip(tripData);
      if (res?.statusCode === 201) {
        toast.success(res?.message, {id: toastId});
      } else {
        toast.error(res.message, {id: toastId});
      }
    } catch (error: any) {
      toast.error(error.message, {id: toastId});
    }
  };
  return (
    <Container
      sx={{
        my: 2,
      }}
    >
      <CSForm onSubmit={handleSubmit}>
        <CSFileUploader sx={{
          my: 2
        }} name="photo" />
        <Typography variant="caption" sx={{
          ml:2
        }}>
          Please select 4 images at once
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <CSInput
              name="destination"
              label="Destination"
              type="text"
              fullWidth={true}
            />
          </Grid>
          <Grid item xs={4}>
            <CSDatePicker
              name="startDate"
              label="Start Date"
              fullWidth={true}
            />
          </Grid>
          <Grid item xs={4}>
            <CSDatePicker name="endDate" label="End Date" fullWidth={true} />
          </Grid>
          <Grid item xs={4}>
            <CSSelect
              name="type"
              label="Trip Type"
              items={tripType}
              fullWidth={true}
            />
          </Grid>
          <Grid item xs={4}>
            <CSInput
              name="budget"
              label="Budget"
              type="number"
              fullWidth={true}
            />
          </Grid>
          <Grid item xs={4}>
            <CSInput
              name="activities"
              label="Activities"
              type="text"
              fullWidth={true}
            />
          </Grid>
          <Grid item xs={4}>
            <CSInput
              name="description"
              label="Description"
              type="text"
              fullWidth={true}
              multiline={true}
            />
          </Grid>
        </Grid>
        <Button
          sx={{
            margin: "10px 0px",
          }}
          // fullWidth={true}
          type="submit"
        >
          Create
        </Button>
      </CSForm>
    </Container>
  );
};

export default PostTripPage;
