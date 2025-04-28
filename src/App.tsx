import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login.page';
import RegisterPage from './pages/register.page';
import WordBattlePage from './pages/word-battle.page';
import LobbyPage from './pages/lobby.page';
import WaitingRoomPage from './pages/waiting-room.page';
import ForgotPasswordPage from './pages/forgot-password.page';
import ResetPasswordPage from './pages/reset-password.page';
import { Toaster } from './components/ui/sonner';
import ProtectedRoute from './components/protected-route';
import AuthRoute from './components/auth-route';

function App() {
  return (
    <BrowserRouter>
      <Toaster richColors />
      <Routes>
        <Route
          path="/login"
          element={
            <AuthRoute>
              <LoginPage />
            </AuthRoute>
          }
        />
        <Route
          path="/register"
          element={
            <AuthRoute>
              <RegisterPage />
            </AuthRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <AuthRoute>
              <ForgotPasswordPage />
            </AuthRoute>
          }
        />
        <Route
          path="/reset-password"
          element={
            <AuthRoute>
              <ResetPasswordPage />
            </AuthRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <LobbyPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/waiting-room"
          element={
            <ProtectedRoute>
              <WaitingRoomPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/game"
          element={
            <ProtectedRoute>
              <WordBattlePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
