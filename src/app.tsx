import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { LandingPage } from './pages/LandingPage';

function App() {
  return (
    // Membungkus aplikasi dengan provider auth Supabase
    <AuthProvider>
      <LandingPage />
    </AuthProvider>
  );
}

export default App;

