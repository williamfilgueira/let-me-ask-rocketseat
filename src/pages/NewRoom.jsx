
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { Button } from "../components/Button";
import {database} from '../service/firebase'
import { useAuth } from "../hooks/useAuth";

//CSS
import "../styles/auth.scss";

// IMAGE
import IllustrastionImg from "../assets/images/illustration.svg";
import logImg from "../assets/images/logo.svg";



export function NewRoom() {
  const { user } = useAuth();
  const history = useHistory();
  const [newRoom, setNewRoom] = useState("");

  async function handleCreateRoom(event) {
    event.preventDefault();

    //verificar se existe algum texto, utiliza o trim para retirar os espaços
    if (newRoom.trim() === "") {
      return;
    }
    //crio uma constante para receber o database
    const roomRef = database.ref('rooms');

    //constante criada para enviar as informações para o firebase
    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user.id,
    });

    //enviando para link de rooms passando valores do firebase, no caso a KEY
    history.push(`/rooms/${firebaseRoom.key}`)
  }

  return (
    <div id="page-auth">
      <aside>
        <img
          src={IllustrastionImg}
          alt="Ilustraçao simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real</p>
      </aside>
      <main>
        <div className="main-container">
          <img src={logImg} alt="LetMeAsk" />
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={(event) => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma salta existente?<Link to="/">Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
