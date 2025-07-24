import React, { useEffect, useState, useContext } from 'react';
import { Container, Box, Typography, CircularProgress, Alert, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

const ProfileContent = () => {
  const [user, setUserState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [logoutLoading, setLogoutLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch('/api/auth/me', {
          credentials: 'include',
        });
        if (res.status === 401) {
          navigate('/login');
          return;
        }
        if (!res.ok) {
          setError('Failed to fetch profile');
          setLoading(false);
          return;
        }
        const data = await res.json();
        setUserState(data.user);
      } catch (err) {
        setError('Network error');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      setUser(null);
      navigate('/login');
    } catch (err) {
      setUser(null);
      navigate('/login');
    } finally {
      setLogoutLoading(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      </Container>
    );
  }

  if (!user) return null;

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5" gutterBottom>
          Profile
        </Typography>
        <Typography variant="body1"><b>Username:</b> {user.username}</Typography>
        <Typography variant="body1"><b>Email:</b> {user.email}</Typography>
        <Typography variant="body1"><b>Full Name:</b> {user.full_name || '-'}</Typography>
        <Typography variant="body1"><b>Joined:</b> {user.created_at ? new Date(user.created_at).toLocaleString() : '-'}</Typography>
        <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            sx={{
              fontWeight: 600,
              color: 'white',
              backgroundColor: 'primary.main',
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: 'white',
                color: 'primary.main',
                border: '1.5px solid',
                borderColor: 'primary.main',
                boxShadow: 'none',
              },
              textTransform: 'none',
              borderRadius: 2,
              px: 2,
            }}
            onClick={() => navigate('/')}
          >
            Back to Home
          </Button>
          <Button
            variant="contained"
            color="secondary"
            sx={{
              fontWeight: 600,
              color: 'white',
              backgroundColor: '#18181b',
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: 'white',
                color: 'secondary.main',
                border: '1.5px solid',
                borderColor: 'secondary.main',
                boxShadow: 'none',
              },
              textTransform: 'none',
              borderRadius: 2,
              px: 2,
            }}
            onClick={handleLogout}
            disabled={logoutLoading}
          >
            {logoutLoading ? 'Logging Out...' : 'Logout'}
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default ProfileContent; 