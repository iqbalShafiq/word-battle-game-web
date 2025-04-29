import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/standard-button';
import Input from '../components/form-input';
import { toast } from 'sonner';
import { requestPasswordReset } from '../services/auth.service';
import { getErrorMessage } from '../lib/utils';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await requestPasswordReset(email);
      if (res.data.code === 200) {
        toast.success('Password reset link sent! Please check your email.');
        navigate('/login');
      } else {
        toast.error(res.data.message || 'Failed to send reset link.');
      }
    } catch (err: unknown) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-primary">
      <form
        onSubmit={handleSubmit}
        className="bg-white/5 rounded-xl px-8 py-6 shadow w-full max-w-sm flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-accent mb-2 text-center">Forgot Password</h2>
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
        />
        <div className="flex items-center w-full gap-1 justify-end -mt-1">
          <span className="text-textmuted text-xs">Already remember your password?</span>
          <Link to="/login" className="text-accent/70 hover:underline text-xs">
            Login
          </Link>
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send Reset Link'}
        </Button>
      </form>
    </div>
  );
}
