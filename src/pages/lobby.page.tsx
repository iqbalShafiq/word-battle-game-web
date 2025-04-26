import { useNavigate } from 'react-router-dom';
import Button from '../components/standard-button';
import AnimatedCollapse from '../components/animated-collapse';
import { logout as logoutApi } from '../services/auth.service';
import { useToastStore } from '../store/toast.store';
import { toast } from 'sonner';

export default function LobbyPage() {
  const navigate = useNavigate();
  const setToast = useToastStore((state) => state.setToast);
  const { toastMessage, clearToast } = useToastStore();

  if (toastMessage) {
    toast.error(toastMessage);
    clearToast();
  }

  const handleStart = () => {
    navigate('/waiting-room');
  };

  const handleLogout = async () => {
    try {
      const res = await logoutApi();
      if (res.data.code === 200) {
        localStorage.removeItem('player');
        navigate('/login');
      } else {
        setToast(res.data.message || 'Logout failed!');
        console.error(res.data.message || 'Logout failed!');
      }
    } catch (err: any) {
      setToast(err?.response?.data?.message || 'Logout failed!');
      console.error(err?.response?.data?.message || 'Logout failed!');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-primary p-4">
      {/* Card utama */}
      <div className="flex flex-col items-center bg-white/5 rounded-xl px-8 py-6 shadow w-full max-w-md mb-6">
        {/* Info User */}
        <div className="relative group flex flex-col items-center bg-white/10 rounded-xl px-6 py-4 shadow-md mb-4 w-full overflow-hidden">
          <img
            src="https://api.dicebear.com/7.x/thumbs/svg?seed=Player123"
            alt="avatar"
            className="w-16 h-16 rounded-full border-2 border-accent mb-2"
          />
          <span className="text-accent font-semibold text-lg mb-1">Player123</span>
          <span className="text-accent/70 text-sm mb-2">5 players online</span>
          <span className="text-xs text-accent/60">Status: Ready</span>
          {/* Tombol logout full card, hanya muncul saat hover */}
          <Button
            onClick={handleLogout}
            className="absolute cursor-pointer inset-0 flex items-center justify-center bg-danger text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 font-bold text-lg rounded-xl z-10"
            aria-label="Logout"
          >
            Logout
          </Button>
        </div>
        {/* Deskripsi dan tombol mulai */}
        <h1 className="text-3xl font-bold text-accent my-2 animate-bounce">Word Battle Game</h1>
        <p className="text-base text-accent/80 mb-3 text-center font-normal max-w-xs">
          Adu cepat menebak kata dengan pemain lain. Siap jadi yang tercepat?
        </p>
        <Button
          className="w-48 py-3 text-md my-2 shadow-lg bg-yellow-400 hover:bg-yellow-500 text-accent"
          onClick={handleStart}
        >
          Classic Match
        </Button>
        {/* How to Play Section dengan animasi */}
        <div className="w-full mt-2">
          <AnimatedCollapse title="How to Play?">
            <ul className="list-disc ml-5 mt-2 text-accent/80 text-sm">
              <li>Masuk ke ruang tunggu dan tunggu pemain lain.</li>
              <li>Setiap ronde, tebak kata secepat mungkin.</li>
              <li>Pemain tercepat mendapat poin lebih banyak.</li>
              <li>Menangkan permainan dengan skor tertinggi!</li>
            </ul>
          </AnimatedCollapse>
        </div>
      </div>
    </div>
  );
}
