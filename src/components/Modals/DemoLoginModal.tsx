import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { BootstrapDialog } from "../shared/CSModal/CSModal";
import { GridCloseIcon } from "@mui/x-data-grid";
import { useState } from "react";

const DemoLoginModal = ({handleLogin} : any) => {
  const [open, setOpen] = useState(false);

  const credentials = [
    {
      role: "Admin",
      email: "admin@admin.com",
      password: "admin123",
    },
    {
      role: "User",
      email: "user@user.com",
      password: "user123",
    },
  ];

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{
          color: "#0096FF",
          marginTop: 1,
        }}
      >
        Try Demo
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Login with demo accounts
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <GridCloseIcon />
        </IconButton>
        <DialogContent dividers sx={{
            width: { xs: '95vw', sm: 500 }
        }}>
          {credentials.map((credential) => (
            <Stack key={credential.role} direction="row" justifyContent="space-between" alignItems="center" marginBottom={1}>
              <Box>
                <Typography variant="h6">{credential.role}</Typography>
                <Typography variant="body2">Email: {credential.email}</Typography>
                <Typography variant="body2">Password: {credential.password}</Typography>
              </Box>
              <Button onClick={() => handleLogin({
                email: credential.email,
                password: credential.password
              })}>Login</Button>
            </Stack>
          ))}
        </DialogContent>
       
      </BootstrapDialog>
    </>
  );
};

export default DemoLoginModal;
