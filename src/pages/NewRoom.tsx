import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import illlustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import { Button } from '../components/Button';
import { database } from '../services/firebase';

import "../styles/auth.scss"
import { useAuth } from '../hooks/useAuth';

export function NewRoom() {
  const { user } = useAuth();
  const history = useHistory();
  const [newRoom, setNewRoom] = useState('');

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    })

    history.push(`/rooms/${firebaseRoom.key}`)
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
            <h2>Create new Room</h2>
            <form onSubmit={handleCreateRoom}>
              <input
                type="text"
                placeholder="Room Name..."
                onChange={event => setNewRoom(event.target.value)}
                value={newRoom}
              />
              <Button type="submit">Create Room</Button>
            </form>
            <p>Want to enter an existing room ? <Link to="/">click here</Link></p>
          </div>
        </main>
      </div>
    </>
  )
}
