import React, { lazy, Suspense,useMemo } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// Import LoginPage and ProfilePage normally
import LoginPage from "@/scenes/loginPage";
import ProfilePage from "@/scenes/profilePage";
// Use React.lazy for HomePage
const HomePage = lazy(() => import('@/scenes/homePage'));
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from "@mui/material/styles";
import { themeSettings } from './theme';

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Suspense fallback={<div style={{display:"flex",justifyContent:"center",marginTop:"50%"}}>Loading...</div>}>
            <Routes>
              <Route path='/' element={<LoginPage />} />
              {/* Wrap HomePage with Suspense fallback */}
              <Route path='/home' element={isAuth ? <HomePage /> : <Navigate to="/" />} />
              <Route path='/profile/:userId' element={isAuth ? <ProfilePage /> : <Navigate to="/" />} />
            </Routes>
          </Suspense>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
