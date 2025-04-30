# Word Battle Game Web

A real-time multiplayer word guessing game built with React, TypeScript, and Vite. Players compete to guess hidden words, with live scoreboards and chat. The game features matchmaking, a lobby, and interactive gameplay.

## Features

- **User Authentication**: Register and login securely.
- **Lobby**: View your stats and start matchmaking.
- **Matchmaking & Waiting Room**: Get paired with another player in real-time.
- **Word Battle**: Compete to guess the word first. See your score and your opponent's.
- **Chat**: In-game chat to communicate with your opponent.
- **Game Results**: See who wins, loses, or if it's a draw.

## Screenshots

### 1. Login Page

![Login Page](https://i.ibb.co.com/tSm3nL0/01-Login.jpg)

### 2. Register Page

![Register Page](https://i.ibb.co.com/W4G26wmD/02-Register.jpg)

### 3. Lobby

![Lobby](https://i.ibb.co.com/c0sJWNJ/03-Lobby.jpg)

### 4. Waiting Room

![Waiting Room](https://i.ibb.co.com/zTZxH4Vt/04-Waiting-Room.jpg)

### 5. Playing

![Playing](https://i.ibb.co.com/zW7Y5NDb/05-Playing.jpg)

### 6. Correct Answer

![Correct Answer](https://i.ibb.co.com/chm7p2Xr/06-Word-Submitted.jpg)

### 7. Game Result

![Game Result](https://i.ibb.co.com/Myf9v6yM/07-Game-Result.jpg)

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Run the development server:**

   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Visit [http://localhost:5173](http://localhost:5173)

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- SignalR (for real-time communication)

## Folder Structure

- `src/pages/` — Main pages (login, register, lobby, waiting room, game)
- `src/components/` — UI components (scoreboard, chat, forms, etc.)
- `src/services/` — API and SignalR services
- `src/hooks/` — Custom React hooks
- `src/types/` — TypeScript types
