'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { FieldValues } from 'react-hook-form';
import { z } from 'zod';
import KeyIcon from '@mui/icons-material/Key';
import PHInput from '@/components/Forms/PHInput';
import PHForm from '@/components/Forms/PHForm';
import { useResetPasswordMutation } from '@/redux/api/authApi';
import { useEffect, useState } from 'react';
import { authKey } from '@/contants/authkey';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { deleteCookies } from '@/services/actions/deleteCookies';

const validationSchema = z.object({
   newPassword: z.string().min(6, 'Must be at least 6 characters long'),
});

const ResetPassword = () => {
   const router = useRouter();
   const [resetPassword] = useResetPasswordMutation();
   const [id, setId] = useState<string | null>(null);
   const [token, setToken] = useState<string | null>(null);

   useEffect(() => {
      if (typeof window !== 'undefined') {
         const urlParams = new URLSearchParams(window.location.search);
         setId(urlParams.get('userId'));
         setToken(urlParams.get('token'));
      }
   }, []);

   useEffect(() => {
      if (token) {
         localStorage.setItem(authKey, token);
      }
   }, [token]);

   const onSubmit = async (values: FieldValues) => {
      const updatedData = { ...values, id };

      try {
         const res = await resetPassword(updatedData).unwrap();
         if (res.message === "Password reset successfully!") {
            toast.success('Password Reset Successful');
            localStorage.removeItem(authKey);
            deleteCookies([authKey, 'refreshToken']);
            router.push('/login');
         } else {
            throw new Error('Unexpected response');
         }
      } catch (error) {
         toast.error('Something Went Wrong, Try Again');
      }
   };

   return (
      <Box
         sx={{
            px: 4,
            py: 2,
            maxWidth: 600,
            width: '100%',
            boxShadow: 1,
            borderRadius: 1,
            mx: 'auto',
            mt: { xs: 2, md: 10 },
         }}
      >
         <Stack alignItems='center' justifyContent='center'>
            <Box
               sx={{
                  '& svg': {
                     width: 100,
                     height: 100,
                  },
               }}
            >
               <KeyIcon sx={{ color: 'primary.main' }} />
            </Box>
            <Typography variant='h5' fontWeight={600} sx={{ mb: 2 }}>
               Reset password
            </Typography>
         </Stack>
         <PHForm
            onSubmit={onSubmit}
            defaultValues={{ newPassword: '' }}
            resolver={zodResolver(validationSchema)}
         >
            <Grid>
               <Grid item xs={12} sm={12} md={6}>
                  <PHInput
                     name='newPassword'
                     type='password'
                     label='New Password'
                     sx={{ mb: 2 }}
                     fullWidth
                  />
               </Grid>
            </Grid>

            <Button type='submit' sx={{ width: '100%', my: 2 }}>
               Reset Password
            </Button>
         </PHForm>
      </Box>
   );
};

export default ResetPassword;
