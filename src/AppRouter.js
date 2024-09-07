// src/App.js
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import App from './App';
import Admin from './Admin';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';

function AppRouter() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    // You can return a loading indicator here
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={user ? <Admin /> : <Navigate to="/login" />} />
        {/* Other routes */}
        <Route path="/" element={<App />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
