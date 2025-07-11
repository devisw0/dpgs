import React, { useContext, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import { Stack } from '@mui/material';

const HeaderIcons = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [logoutLoading, setLogoutLoading] = useState(false);

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

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      {user && (
        <Typography variant="body1" sx={{ color: 'white', mr: 1, fontWeight: 500 }}>
          {user.username}
        </Typography>
      )}
      <IconButton color="inherit" size="large" onClick={() => navigate('/profile')}>
        <AccountCircleIcon sx={{ color: 'white' }} fontSize="inherit" />
      </IconButton>
      <IconButton color="inherit" size="large" onClick={() => navigate('/cart')}>
        <ShoppingCartIcon sx={{ color: 'white' }} fontSize="inherit" />
      </IconButton>
      <IconButton color="inherit" size="large" onClick={() => navigate('/settings')}>
        <SettingsIcon sx={{ color: 'white' }} fontSize="inherit" />
      </IconButton>
      {user ? (
        <IconButton color="inherit" size="large" onClick={handleLogout} disabled={logoutLoading}>
          <LogoutIcon sx={{ color: 'secondary.main' }} fontSize="inherit" />
        </IconButton>
      ) : (
        <Button
          variant="contained"
          color="secondary"
          size="small"
          sx={{
            ml: 1,
            fontWeight: 600,
            color: 'white',
            backgroundColor: 'secondary.main',
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
          onClick={() => navigate('/login')}
        >
          Log In
        </Button>
      )}
    </Stack>
  );
};

export default HeaderIcons; 