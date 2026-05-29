import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Admin from './Admin';
import TitlePage from './TitlePage';
import TableOfContents from './TableOfContents';
import ChapterPage from './ChapterPage';
import WorkPage from './WorkPage';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';

function AppRouter() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<TitlePage />} />
        <Route path="/contents" element={<TableOfContents />} />
        <Route path="/chapter/:id" element={<ChapterPage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={user ? <Admin /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
