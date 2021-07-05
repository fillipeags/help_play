import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

import illlustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';

import "../styles/auth.scss"
import { database } from '../services/firebase';

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle()
    }

    history.push('/rooms/new')
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert('Room does not exists');
      return;
    }

    if (roomRef.val().endedAt) {
      alert('Room already closed.');
      return;
    }

    history.push(`rooms/${roomCode}`);
  }

  return (
    <>
      <div id="page-auth">
        <aside>
          <img src={illlustrationImg} alt="Ilustração Simbolizando perguntas e respostas" />
          <strong>Create Q&amp;A Rooms for Help in Games</strong>
          <p>Ask and get help from people that played your current game</p>
        </aside>

        <main>
          <div className="main-content">
            <img src={logoImg} alt="Letmeask" />
            <button onClick={handleCreateRoom} className="create-room">
              <img src={googleIconImg} alt="Logo do google" />
              Create Room with Google
            </button>
            <div className="separator">or join an existing room</div>
            <form onSubmit={handleJoinRoom}>
              <input
                type="text"
                placeholder="Type your room code in here..."
                onChange={event => setRoomCode(event.target.value)}
                value={roomCode}
              />
              <Button type="submit">Join Room</Button>
            </form>
          </div>
        </main>
      </div>
    </>
  )
}
