"use client";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
  Paper,
  IconButton,
  InputAdornment,
  Divider,
  alpha,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import {
  useForm,
  SubmitHandler,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { userLogin } from "@/services/actions/userLogin";
import { storeUserInfo } from "@/services/auth.services";
import CSForm from "@/components/Forms/CSForm";
import CSInput from "@/components/Forms/CSInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import logo from "@/assets/search.png";
import { registerUser } from "@/services/actions/registerUser";
import {
  Visibility,
  VisibilityOff,
  Person,
  Email,
  Lock,
} from "@mui/icons-material";
import { useState } from "react";
import bgImage from "@/assets/bg.jpg";

const RegisterPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validationSchema = z
    .object({
      password: z.string().min(6, "Must be at least 6 characters"),
      firstName: z.string().min(1, "Please enter your first name!"),
      lastName: z.string().min(1, "Please enter your last name!"),
      email: z.string().email("Please enter a valid email address!"),
      confirmPassword: z
        .string()
        .min(6, { message: "Password must be at least 6 characters" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "Password and Confirm password does not match",
    });

  const defaultValues = {
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    confirmPassword: "",
  };

  const handleRegister = async (values: FieldValues) => {
    // Combine firstName and lastName into name for API
    const registrationData = {
      ...values,
      name: `${values.firstName} ${values.lastName}`,
    };

    try {
      const res = await registerUser(registrationData);
      if (res?.data?.id) {
        toast.success(res?.message);
        const result = await userLogin({
          password: values.password,
          email: values.email,
        });
        if (result?.data?.token) {
          storeUserInfo({ accessToken: result?.data?.token });
          router.push("/");
        }
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        backgroundImage: `url(${bgImage.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(28, 168, 203, 0.3)",
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
        <Paper
          elevation={24}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          {/* Header Section */}
          <Box
            sx={{
              background: "#1CA8CB",
              color: "white",
              textAlign: "center",
              py: 2,
              px: 2,
            }}
          >
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 60,
                height: 60,
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.2)",
                mb: 1,
              }}
            >
              <Image src={logo} width={40} height={40} alt="logo" />
            </Box>
            <Typography variant="h5" fontWeight={700}>
              Create Account
            </Typography>
            <Typography variant="subtitle1" color="white" sx={{ opacity: 0.9 }}>
              Join our community and start exploring together
            </Typography>
          </Box>

          {/* Form Section */}
          <Box sx={{ p: 3 }}>
            <CSForm
              onSubmit={handleRegister}
              resolver={zodResolver(validationSchema)}
              defaultValues={defaultValues}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <CSInput
                    label="First Name"
                    fullWidth={true}
                    name="firstName"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        "& fieldset": {
                          borderColor: "#e0e0e0",
                        },
                        "&:hover fieldset": {
                          borderColor: "#1CA8CB",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#1CA8CB",
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CSInput
                    label="Last Name"
                    fullWidth={true}
                    name="lastName"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        "& fieldset": {
                          borderColor: "#e0e0e0",
                        },
                        "&:hover fieldset": {
                          borderColor: "#1CA8CB",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#1CA8CB",
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CSInput
                    label="Email Address"
                    type="email"
                    fullWidth={true}
                    name="email"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        "& fieldset": {
                          borderColor: "#e0e0e0",
                        },
                        "&:hover fieldset": {
                          borderColor: "#1CA8CB",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#1CA8CB",
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CSInput
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    fullWidth={true}
                    name="password"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        "& fieldset": {
                          borderColor: "#e0e0e0",
                        },
                        "&:hover fieldset": {
                          borderColor: "#1CA8CB",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#1CA8CB",
                        },
                      },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPassword}
                            edge="end"
                            size="small"
                            sx={{ color: "#1CA8CB" }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CSInput
                    label="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    fullWidth={true}
                    name="confirmPassword"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        "& fieldset": {
                          borderColor: "#e0e0e0",
                        },
                        "&:hover fieldset": {
                          borderColor: "#1CA8CB",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#1CA8CB",
                        },
                      },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowConfirmPassword}
                            edge="end"
                            size="small"
                            sx={{ color: "#1CA8CB" }}
                          >
                            {showConfirmPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>

              <Button
                type="submit"
                fullWidth
                size="large"
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 1,
                  py: 1.5,
                  borderRadius: 2,
                  background: "#1CA8CB",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  textTransform: "none",
                  boxShadow: "0 4px 15px rgba(28, 168, 203, 0.4)",
                  "&:hover": {
                    background: "#1691B3",
                    boxShadow: "0 6px 20px rgba(28, 168, 203, 0.6)",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Create Account
              </Button>

              <Divider sx={{ my: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Already have an account?
                </Typography>
              </Divider>

              <Box sx={{ textAlign: "center" }}>
                <Link href="/login" style={{ textDecoration: "none" }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#1CA8CB",
                      fontWeight: 600,
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Sign in here
                  </Typography>
                </Link>
              </Box>
            </CSForm>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default RegisterPage;
