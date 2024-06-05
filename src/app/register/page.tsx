"use client";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";

import Link from "next/link";
import { useForm, SubmitHandler, FieldValues, useFormContext } from "react-hook-form";
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




export const validationSchema = z.object({
  password: z.string().min(6, "Must be at least 6 characters"),
  name: z.string().min(1, "Please enter your name!"),
  email: z.string().email("Please enter a valid email address!"),
  confirmPassword: z.string().min(6, {message: 'Password must be at least 6 characters'})
}).refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'Password and Confirm password does not match'
});

export const defaultValues = {
  password: "",
  name: "",
  email: "",
  confirmPassword: "",
};

const RegisterPage = () => {
  const router = useRouter();
  

  const handleRegister = async (values: FieldValues) => {
    
    // console.log(data);
    try {
      const res = await registerUser(values);
      // console.log(res);
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

  return (
    <Container>
      <Stack
        sx={{
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 600,
            width: "100%",
            boxShadow: 1,
            borderRadius: 1,
            p: 4,
            textAlign: "center",
          }}
        >
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box>
              <Image src={logo} width={50} height={50} alt="logo" />
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={600}>
                Register Here
              </Typography>
            </Box>
          </Stack>

          <Box>
            <CSForm
              onSubmit={handleRegister}
              resolver={zodResolver(validationSchema)}
              defaultValues={defaultValues}
            >
              <Grid container spacing={2} my={1}>
                <Grid item md={12}>
                  <CSInput label="Username" fullWidth={true} name="name" />
                </Grid>
                <Grid item md={12}>
                  <CSInput
                    label="Email"
                    type="email"
                    fullWidth={true}
                    name="email"
                  />
                </Grid>
                <Grid item md={6}>
                  <CSInput
                    label="Password"
                    type="password"
                    fullWidth={true}
                    name="password"
                  />
                </Grid>
                <Grid item md={6}>
                  <CSInput
                    label="Confirm Password"
                    type="password"
                    fullWidth={true}
                    name="confirmPassword"
                  />
                </Grid>
                
              </Grid>
              <Button
                sx={{
                  margin: "10px 0px",
                }}
                fullWidth={true}
                type="submit"
              >
                Register
              </Button>
              <Typography component="p" fontWeight={300}>
                Do you already have an account? <Link href="/login">Login</Link>
              </Typography>
            </CSForm>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default RegisterPage;
