import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import api from '../services/axios';
import Spinner from './spinner';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    api
      .get('/v1/auth/me')
      .then(() => setAuthenticated(true))
      .catch(() => setAuthenticated(false))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner />;
  if (!authenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}
