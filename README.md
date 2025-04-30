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

![Login Page](https://ibb.co.com/Cq1W4Pj)

### 2. Register Page

![Register Page](https://ibb.co.com/MxZCs4F8)

### 3. Lobby

![Lobby](https://ibb.co.com/0Tzq0fq)

### 4. Waiting Room

![Waiting Room](https://ibb.co.com/21dhYk3p)

### 5. Playing

![Playing](https://ibb.co.com/ZRYPJN7K)

### 6. Correct Answer

![Correct Answer](https://ibb.co.com/m5xMYhFc)

### 7. Game Result

![Game Result](https://ibb.co.com/wZ7YksZM)

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
