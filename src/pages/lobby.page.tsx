import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

export default function LobbyPage() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/waiting-room');
  };

  const handleLogout = () => {
    // TODO: clear token/player data jika ada
    navigate('/login');
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-primary gap-8">
      <h1 className="text-4xl font-bold text-accent mb-4">Lobby</h1>
      <Button
        className="w-64 py-4 text-xl mb-2 shadow-lg hover:scale-105 transition-transform"
        onClick={handleStart}
      >
        Start Classic Match
      </Button>
      <Button
        className="w-64 py-3 text-lg bg-danger text-white hover:bg-red-600 shadow"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </div>
  );
}
