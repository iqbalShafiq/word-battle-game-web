import { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import { Link } from 'react-router-dom';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: handle register logic
    alert(`Register with name: ${name}, email: ${email}`);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-primary">
      <form
        onSubmit={handleSubmit}
        className="bg-white/5 rounded-xl px-8 py-6 shadow w-full max-w-sm flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-accent mb-2 text-center">Register</h2>
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password Confirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          required
        />
        <Button type="submit">Register</Button>
        <div className="text-center mt-2 text-textmuted">
          Already have an account?{' '}
          <Link to="/login" className="text-accent hover:underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}
