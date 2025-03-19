'use client';
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import assets from '@/assets';
import Link from 'next/link';
import { FieldValues, useForm } from 'react-hook-form';
import { userLogin } from '@/services/actions/userLogin';
import { storeUserInfo } from '@/services/auth.services';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import PHForm from '@/components/Forms/PHForm';
import PHInput from '@/components/Forms/PHInput';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect } from 'react';
import useUserInfo from '@/hooks/useUserInfo';
import { getFromLocalStorage } from '@/utils/local-storage';
import { authKey } from '@/contants/authkey';

const validationSchema = z.object({
   email: z.string().email('Please enter a valid email address!'),
   password: z.string().min(6, 'Must be at least 6 characters'),
});

const LoginPage = () => {
   const [error, setError] = useState('');
   const router = useRouter();
   const userInfo = useUserInfo();

   useEffect(() => {
      if (userInfo) {
         router.push('/dashboard');
      }
   });

   const handleLogin = async (values: FieldValues) => {
      try {
         const res = await userLogin(values);
         console.log(res);
         if (res?.data?.accessToken) {
            toast.success('Login successful');
            storeUserInfo({ accessToken: res?.data?.accessToken });
            router.push('/dashboard');
         } else {
            setError(res?.message || 'Login failed');
         }
      } catch (err: any) {
         setError(err?.message || 'Something went wrong');
         console.error('Login error:', err);
      }
   };

   return (
      <Container>
         <Stack
            sx={{
               minHeight: '100vh',
               justifyContent: 'center',
               alignItems: 'center',
            }}
         >
            <Box
               sx={{
                  maxWidth: 600,
                  width: '100%',
                  boxShadow: 1,
                  borderRadius: 1,
                  p: 4,
                  textAlign: 'center',
               }}
            >
               <Stack
                  sx={{
                     justifyContent: 'center',
                     alignItems: 'center',
                     mb: 3
                  }}
               >
                  <Box sx={{ mb: 2 }}>
                     <Image
                        src={'/images/kulogo.png'}
                        width={50}
                        height={50}
                        alt='logo'
                     />
                  </Box>
                  <Typography variant='h6' fontWeight={600}>
                     Login KU Admin Panel
                  </Typography>
               </Stack>

               {error && (
                  <Box sx={{ mb: 2 }}>
                     <Typography
                        sx={{
                           bgcolor: 'error.main',
                           p: 1,
                           borderRadius: 1,
                           color: 'white',
                        }}
                     >
                        {error}
                     </Typography>
                  </Box>
               )}

               <PHForm
                  onSubmit={handleLogin}
                  resolver={zodResolver(validationSchema)}
                  defaultValues={{
                     email: '',
                     password: '',
                  }}
               >
                  <Grid container spacing={2}>
                     <Grid item xs={12} md={6}>
                        <PHInput
                           name='email'
                           label='Email'
                           type='email'
                           fullWidth
                        />
                     </Grid>
                     <Grid item xs={12} md={6}>
                        <PHInput
                           name='password'
                           label='Password'
                           type='password'
                           fullWidth
                        />
                     </Grid>
                  </Grid>

                  <Box sx={{ textAlign: 'right', mt: 1 }}>
                     <Link href='/forgot-password'>
                        <Typography
                           component='span'
                           sx={{
                              textDecoration: 'underline',
                              fontSize: '0.875rem',
                           }}
                        >
                           Forgot Password?
                        </Typography>
                     </Link>
                  </Box>

                  <Button
                     variant="contained"
                     fullWidth
                     type='submit'
                     sx={{ mt: 2, mb: 2 }}
                  >
                     Login
                  </Button>

               </PHForm>
            </Box>
         </Stack>
      </Container>
   );
};

export default LoginPage;
