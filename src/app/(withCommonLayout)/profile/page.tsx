"use client";
import CSForm from "@/components/Forms/CSForm";
import CSInput from "@/components/Forms/CSInput";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/features/user/userApi";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { FieldValues } from "react-hook-form";

const ProfilePage = () => {
  const { data: profile, isLoading } = useGetProfileQuery(undefined);
  const [updateProfile] = useUpdateProfileMutation();

  const defaultValues = {
    name: profile?.data?.name,
    email: profile?.data?.email,
  };

  const handleSubmit = (values: FieldValues) => {
    updateProfile(values);
  };
  return (
    <Container>
      <Box sx={{ textAlign: "center" }}>
        <Typography component="div" variant="h4">
          My{" "}
          <Box component="span" sx={{ color: "primary.main" }}>
            Profile
          </Box>
        </Typography>
      </Box>
      <Box>
        <Typography variant="h5" mb={1}>
          User Information
        </Typography>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Box mb={3}>
            <CSForm onSubmit={handleSubmit} defaultValues={defaultValues}>
              <Grid container spacing={3} my={3}>
                <Grid item md={4}>
                  <CSInput
                    name="name"
                    label="Name"
                    type="text"
                    fullWidth={true}
                  />
                </Grid>
                <Grid item md={4}>
                  <CSInput
                    name="email"
                    label="Email"
                    type="email"
                    fullWidth={true}
                  />
                </Grid>
              </Grid>
              <Button sx={{ mr: 2 }} type="submit">
                Update
              </Button>
              <Link href="/change_password">
                <Button>Change Password</Button>
              </Link>
            </CSForm>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default ProfilePage;
