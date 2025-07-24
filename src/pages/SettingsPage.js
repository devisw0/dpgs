import React, { useContext } from 'react';
import Switch from 'react-switch';
import { DarkModeContext } from '../App';

const SettingsPage = () => {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);

  return (
    <div style={{ minHeight: '100vh', background: darkMode ? '#18181b' : '#f7f7f7', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', fontFamily: 'Playfair Display, serif', paddingTop: '4rem' }}>
      <div style={{ background: darkMode ? '#23232a' : 'white', borderRadius: '16px', boxShadow: darkMode ? '0 4px 32px rgba(0,0,0,0.32)' : '0 4px 32px rgba(0,0,0,0.08)', padding: '3rem 2.5rem', minWidth: '350px', maxWidth: '90vw' }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700, fontSize: '2rem', marginBottom: '2.5rem', color: darkMode ? '#fff' : '#222' }}>Settings</h1>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '1.15rem', fontWeight: 500, color: darkMode ? '#fff' : '#222' }}>Dark Mode</span>
          <Switch
            onChange={setDarkMode}
            checked={darkMode}
            offColor="#bbb"
            onColor="#a78bfa"
            offHandleColor="#fff"
            onHandleColor="#fff"
            handleDiameter={24}
            height={28}
            width={56}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0 1px 5px rgba(0,0,0,0.15)"
            activeBoxShadow="0 0 2px 3px #a78bfa"
            aria-label="Dark mode toggle"
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage; 