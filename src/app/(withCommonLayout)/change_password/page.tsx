'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { FieldValues } from 'react-hook-form';
import { z } from 'zod';
import PasswordIcon from '@mui/icons-material/Password';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { removeUser } from '@/services/auth.services';
import { useChangePasswordMutation } from '@/redux/features/user/userApi';
import CSForm from '@/components/Forms/CSForm';
import CSInput from '@/components/Forms/CSInput';

const validationSchema = z.object({
   oldPassword: z.string().min(6, 'Must be at least 6 characters long'),
   newPassword: z.string().min(6, 'Must be at least 6 characters long'),
});

const ChangePassword = () => {
   const [changePassword] = useChangePasswordMutation();
   const router = useRouter();
   const onSubmit = async (values: FieldValues) => {
    const passwordData = {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword
    }
    
      try {
         const res = await changePassword(passwordData);

         if ('data' in res && res.data.status === 200) {
            toast.success('Password Changed Successfully');
            removeUser();
            router.push('/login');
            router.refresh();
         } else {
            throw new Error('Incorrect Old Password');
         }
      } catch (error) {
         toast.success('Something went wrong!');
         console.log(error);
      }
   };

   return (
      <Box
         sx={{
            px: 4,
            py: 2,
            maxWidth: 400,
            width: '100%',
            boxShadow: 1,
            borderRadius: 1,
            mx: 'auto',
            mt: {
               xs: 2,
               md: 5,
            },
            mb: 3
         }}
      >
         <Stack alignItems='center' justifyContent='center'>
            <Box
               sx={{
                  '& svg': {
                     width: 50,
                     height: 50,
                  },
               }}
            >
               <PasswordIcon sx={{ color: 'primary.main' }} />
            </Box>
            <Typography variant='h5' fontWeight={600} sx={{ mb: 2, mt: -1.5 }}>
               Change password
            </Typography>
         </Stack>
         <CSForm
            onSubmit={onSubmit}
            defaultValues={{ oldPassword: '', newPassword: '' }}
            resolver={zodResolver(validationSchema)}
         >
            <Grid>
               <Grid item xs={12} sm={12} md={6}>
                  <CSInput
                     name='oldPassword'
                     type='password'
                     label='Old Password'
                     fullWidth
                     sx={{ mb: 2 }}
                  />
               </Grid>
               <Grid item xs={12} sm={12} md={6}>
                  <CSInput
                     name='newPassword'
                     type='password'
                     label='New Password'
                     fullWidth
                     sx={{ mb: 2 }}
                  />
               </Grid>
            </Grid>

            <Button type='submit' sx={{ width: '100%', my: 2 }}>
               change Password
            </Button>
         </CSForm>
      </Box>
   );
};

export default ChangePassword;