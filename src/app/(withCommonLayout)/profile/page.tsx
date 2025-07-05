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
  Card,
  CardContent,
  Avatar,
  Divider,
  Stack,
  IconButton,
  Chip,
  Paper,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { FieldValues } from "react-hook-form";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useRef } from "react";
import Loader from "@/components/shared/Loader/Loader";

const ProfilePage = () => {
  const { data: profile, isLoading } = useGetProfileQuery(undefined);
  const [updateProfile] = useUpdateProfileMutation();
  const theme = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const defaultValues = {
    firstName:
      profile?.data?.firstName || profile?.data?.name?.split(" ")[0] || "",
    lastName:
      profile?.data?.lastName ||
      profile?.data?.name?.split(" ").slice(1).join(" ") ||
      "",
    email: profile?.data?.email || "",
    phone: profile?.data?.phone || "",
    address: profile?.data?.address || "",
  };

  const handleSubmit = (values: FieldValues) => {
    const updateData = {
      ...values,
      name: `${values.firstName} ${values.lastName}`.trim(),
      profileImage: profileImage,
    };
    updateProfile(updateData);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const displayImage = profileImage || profile?.data?.profileImage;
  const displayName =
    profile?.data?.name ||
    `${defaultValues.firstName} ${defaultValues.lastName}`.trim();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 700,
              color: "#2c3e50",
              mb: 1,
            }}
          >
            My{" "}
            <Box component="span" sx={{ color: "primary.main" }}>
              Profile
            </Box>
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{ maxWidth: 600, mx: "auto" }}
          >
            Manage your account information and preferences
          </Typography>
        </Box>

        <CSForm onSubmit={handleSubmit} defaultValues={defaultValues}>
          <Grid container spacing={4}>
            {/* Profile Overview Card */}
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
                  },
                }}
              >
                <CardContent sx={{ p: 3, textAlign: "center" }}>
                  <Box
                    sx={{
                      position: "relative",
                      display: "inline-block",
                      mb: 3,
                    }}
                  >
                    {displayImage ? (
                      <Box
                        sx={{
                          width: 120,
                          height: 120,
                          borderRadius: "50%",
                          overflow: "hidden",
                          border: "4px solid white",
                          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                          mx: "auto",
                          backgroundImage: `url(${displayImage})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                    ) : (
                      <Avatar
                        sx={{
                          width: 120,
                          height: 120,
                          bgcolor: "primary.main",
                          fontSize: 48,
                          border: "4px solid white",
                          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                        }}
                      >
                        {displayName?.charAt(0)?.toUpperCase() || "U"}
                      </Avatar>
                    )}
                  </Box>

                  {/* Profile Image Upload Controls */}
                  <Box sx={{ mb: 3 }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      Recommended dimensions are typically 400 x 400 pixels.
                    </Typography>

                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      style={{ display: "none" }}
                      disabled={!isEditing}
                    />

                    <Stack direction="row" spacing={1} justifyContent="center">
                      <Button
                        variant="contained"
                        size="small"
                        onClick={handleUploadClick}
                        disabled={!isEditing}
                        startIcon={<CloudUploadIcon />}
                        sx={{
                          borderRadius: 2,
                          textTransform: "none",
                          fontWeight: 600,
                        }}
                      >
                        Upload
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={handleRemoveImage}
                        disabled={!isEditing || !displayImage}
                        startIcon={<DeleteIcon />}
                        sx={{
                          color: "primary.main",
                          borderRadius: 2,
                          textTransform: "none",
                          fontWeight: 600,
                        }}
                      >
                        Remove
                      </Button>
                    </Stack>
                  </Box>

                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: "#2c3e50",
                      mb: 1,
                    }}
                  >
                    {displayName || "User Name"}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {profile?.data?.email || "user@example.com"}
                  </Typography>

                  <Chip
                    label="Active"
                    color="success"
                    size="small"
                    sx={{ mb: 2 }}
                  />

                  <Divider sx={{ my: 2 }} />

                  <Stack spacing={1}>
                    <Typography variant="body2" color="text.secondary">
                      Member since: January 2024
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Last login: Today
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            {/* Main Information Card */}
            <Grid item xs={12} md={8}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  {/* Header with Edit Button */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 4,
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 600,
                        color: "#2c3e50",
                      }}
                    >
                      Profile Information
                    </Typography>

                    {!isEditing && (
                      <IconButton
                        onClick={handleEdit}
                        sx={{
                          bgcolor: "primary.main",
                          color: "white",
                          "&:hover": {
                            bgcolor: "primary.dark",
                          },
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    )}
                  </Box>

                  {/* Basic Information Section */}
                  <Box sx={{ mb: 4 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: "#2c3e50",
                        mb: 3,
                        pb: 1,
                        borderBottom: "2px solid",
                        borderColor: "primary.main",
                        display: "inline-block",
                      }}
                    >
                      Basic Information
                    </Typography>

                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 1,
                          }}
                        >
                          <PersonIcon color="primary" sx={{ fontSize: 20 }} />
                          <Typography variant="body2" color="text.secondary">
                            First Name
                          </Typography>
                        </Box>
                        <CSInput
                          name="firstName"
                          placeholder="Enter your first name"
                          type="text"
                          fullWidth={true}
                          disabled={!isEditing}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                              "&:hover": {
                                "& .MuiOutlinedInput-notchedOutline": {
                                  borderColor: "primary.main",
                                },
                              },
                            },
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 1,
                          }}
                        >
                          <PersonIcon color="primary" sx={{ fontSize: 20 }} />
                          <Typography variant="body2" color="text.secondary">
                            Last Name
                          </Typography>
                        </Box>
                        <CSInput
                          name="lastName"
                          placeholder="Enter your last name"
                          type="text"
                          fullWidth={true}
                          disabled={!isEditing}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                              "&:hover": {
                                "& .MuiOutlinedInput-notchedOutline": {
                                  borderColor: "primary.main",
                                },
                              },
                            },
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 1,
                          }}
                        >
                          <EmailIcon color="primary" sx={{ fontSize: 20 }} />
                          <Typography variant="body2" color="text.secondary">
                            Email
                          </Typography>
                        </Box>
                        <CSInput
                          name="email"
                          placeholder="Enter your email"
                          type="email"
                          fullWidth={true}
                          disabled={!isEditing}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                              "&:hover": {
                                "& .MuiOutlinedInput-notchedOutline": {
                                  borderColor: "primary.main",
                                },
                              },
                            },
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 1,
                          }}
                        >
                          <PhoneIcon color="primary" sx={{ fontSize: 20 }} />
                          <Typography variant="body2" color="text.secondary">
                            Phone
                          </Typography>
                        </Box>
                        <CSInput
                          name="phone"
                          placeholder="Enter your phone number"
                          type="tel"
                          fullWidth={true}
                          disabled={!isEditing}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                              "&:hover": {
                                "& .MuiOutlinedInput-notchedOutline": {
                                  borderColor: "primary.main",
                                },
                              },
                            },
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Box>

                  {/* Address Information Section */}
                  <Box sx={{ mb: 4 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: "#2c3e50",
                        mb: 3,
                        pb: 1,
                        borderBottom: "2px solid",
                        borderColor: "primary.main",
                        display: "inline-block",
                      }}
                    >
                      Address Information
                    </Typography>

                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 1,
                          }}
                        >
                          <LocationOnIcon
                            color="primary"
                            sx={{ fontSize: 20 }}
                          />
                          <Typography variant="body2" color="text.secondary">
                            Address
                          </Typography>
                        </Box>
                        <CSInput
                          name="address"
                          placeholder="Enter your address"
                          type="text"
                          fullWidth={true}
                          disabled={!isEditing}
                          multiline={true}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                              "&:hover": {
                                "& .MuiOutlinedInput-notchedOutline": {
                                  borderColor: "primary.main",
                                },
                              },
                            },
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Box>

                  {/* Action Buttons */}
                  {isEditing && (
                    <Box sx={{ display: "flex", gap: 2, pt: 2 }}>
                      <Button
                        type="submit"
                        startIcon={<SaveIcon />}
                        sx={{
                          borderRadius: 2,
                          px: 3,
                          py: 1.2,
                          fontWeight: 600,
                          textTransform: "none",
                        }}
                      >
                        Save Changes
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => setIsEditing(false)}
                        sx={{
                          color: "primary.main",
                          borderRadius: 2,
                          px: 3,
                          py: 1.2,
                          fontWeight: 600,
                          textTransform: "none",
                        }}
                      >
                        Cancel
                      </Button>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </CSForm>

        {/* Security Section */}
        <Box sx={{ mt: 4 }}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 3,
              bgcolor: "grey.50",
              border: "1px solid",
              borderColor: "grey.200",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: "#2c3e50",
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 2,
              }}
            >
              <LockIcon color="primary" />
              Security Settings
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Keep your account secure by updating your password regularly
            </Typography>

            <Link href="/change_password" style={{ textDecoration: "none" }}>
              <Button
                variant="outlined"
                startIcon={<LockIcon />}
                sx={{
                  borderRadius: 2,
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  textTransform: "none",
                  borderColor: "primary.main",
                  color: "primary.main",
                  "&:hover": {
                    borderColor: "primary.dark",
                  },
                }}
              >
                Change Password
              </Button>
            </Link>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default ProfilePage;
