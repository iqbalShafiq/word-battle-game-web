import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login.page';
import RegisterPage from './pages/register.page';
import WordBattlePage from './pages/word-battle.page';
import LobbyPage from './pages/lobby.page';
import WaitingRoomPage from './pages/waiting-room.page';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/lobby" element={<LobbyPage />} />
        <Route path="/waiting-room" element={<WaitingRoomPage />} />
        <Route path="/" element={<WordBattlePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
