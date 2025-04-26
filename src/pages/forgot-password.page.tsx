import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import { toast } from 'sonner';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      // TODO: Ganti dengan API forgot password yang sesuai
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess('Password reset link sent! Please check your email.');
      toast.success('Password reset link sent!');
    } catch (err: any) {
      setError('Failed to send reset link.');
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
        {error && <div className="text-danger text-center text-sm">{error}</div>}
        {success && <div className="text-success text-center text-sm">{success}</div>}
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError('');
            if (success) setSuccess('');
          }}
          required
        />
        <div className="flex items-center w-full gap-1 justify-end -mt-1">
          <span className='text-textmuted text-xs'>Already remember your password?</span>
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
