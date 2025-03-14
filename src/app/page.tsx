'use client';
import { useRouter } from 'next/navigation';
import { Box, Button, TextField, Paper, Typography, Container } from '@mui/material';

export default function HomePage() {
  const router = useRouter();

  return (
    <Container maxWidth={false} disableGutters>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#f5f5f5'
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: '100%',
            maxWidth: 400,
            borderRadius: 2
          }}
        >
          <Typography variant="h4" textAlign="center" mb={4} fontWeight="bold">
            PH Health Care
          </Typography>
          <Button
            fullWidth
            variant="contained"
            onClick={() => router.push('/dashboard')}
            sx={{ mt: 3 }}
          >
            Go to Dashboard
          </Button>
        </Paper>
      </Box>
    </Container>
  );
}