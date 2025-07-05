"use client";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
  Paper,
  IconButton,
  InputAdornment,
  Divider,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { FieldValues } from "react-hook-form";
import { storeUserInfo } from "@/services/auth.services";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CSForm from "@/components/Forms/CSForm";
import CSInput from "@/components/Forms/CSInput";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import logo from "@/assets/search.png";
import bgImage from "@/assets/bg.jpg";
import { userLogin } from "@/services/actions/userLogin";
import setAccessToken from "@/services/actions/setCookie";
import DemoLoginModal from "@/components/Modals/DemoLoginModal";

const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = z.object({
    email: z.string().email("Please enter a valid email address!"),
    password: z.string().min(6, "Must be at least 6 characters"),
  });

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleLogin = async (values: FieldValues) => {
    // console.log(values);
    try {
      const res = await userLogin(values);
      //   console.log(res.data.token);

      if (res?.data?.token) {
        storeUserInfo({ accessToken: res?.data?.token });
        setAccessToken(res?.data?.token);
        router.push("/");
        toast.success(res?.message, { duration: 3000 });
      } else {
        // console.log(res);
        toast.error(res.message, { duration: 3000 });
      }
    } catch (err: any) {
      console.error(err.message, { duration: 3000 });
    }
  };

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
      <Container maxWidth="xs" sx={{ position: "relative", zIndex: 1 }}>
        <Paper
          elevation={24}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
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
              Welcome Back
            </Typography>
            <Typography variant="subtitle1" color="white" sx={{ opacity: 0.9 }}>
              Sign in to your account
            </Typography>
          </Box>

          {/* Form Section */}
          <Box sx={{ px:4, py:3 }}>
            <CSForm
              onSubmit={handleLogin}
              resolver={zodResolver(validationSchema)}
              defaultValues={{
                email: "",
                password: "",
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <CSInput
                    name="email"
                    label="Email Address"
                    type="email"
                    fullWidth={true}
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
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    fullWidth={true}
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
                Sign In
              </Button>

              <DemoLoginModal handleLogin={handleLogin} />

              <Divider sx={{ my: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Don&apos;t have an account?
                </Typography>
              </Divider>

              <Box sx={{ textAlign: "center", mb: 2 }}>
                <Link href="/register" style={{ textDecoration: "none" }}>
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
                    Create an account
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

export default LoginPage;
