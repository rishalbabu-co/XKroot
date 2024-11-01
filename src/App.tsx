import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import AuthForm from './components/AuthForm';
import Profile from './pages/Profile';
import Companies from './pages/Companies';
import FindJobs from './pages/FindJobs';
import PostJob from './pages/PostJob';
import Recruiter from './pages/Recruiter';
import SavedJobs from './pages/SavedJobs';
import Settings from './pages/Settings';
import ThemeToggle from './components/ThemeToggle';
import ChatWidget from './components/chat/ChatWidget';

export function App() {
  return (
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/login" element={<AuthForm mode="login" />} />
            <Route path="/signup" element={<AuthForm mode="signup" />} />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/" element={
              <ProtectedRoute>
                <FindJobs />
              </ProtectedRoute>
            } />
            <Route path="/jobs" element={
              <ProtectedRoute>
                <FindJobs />
              </ProtectedRoute>
            } />
            <Route path="/companies" element={
              <ProtectedRoute>
                <Companies />
              </ProtectedRoute>
            } />
            <Route path="/recruiter" element={
              <ProtectedRoute>
                <Recruiter />
              </ProtectedRoute>
            } />
            <Route path="/post-job" element={
              <ProtectedRoute>
                <PostJob />
              </ProtectedRoute>
            } />
            <Route path="/saved-jobs" element={
              <ProtectedRoute>
                <SavedJobs />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } />
          </Routes>
          <div className="fixed bottom-6 left-6 z-50">
            <ThemeToggle />
          </div>
          <ChatWidget />
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}