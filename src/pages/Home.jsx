
import { useHistory } from "react-router";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
// IMAGE
import IllustrastionImg from "../assets/images/illustration.svg";
import logImg from "../assets/images/logo.svg";
import googleIconImg from "../assets/images/google-icon.svg";

import { database } from "../service/firebase";

import { Button } from "../components/Button";

import "../styles/auth.scss";

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState("");

  //funcao para criar uma sala, vinda do evento onClick no botão
  async function handleCreateRoom() {
    if (!user) {
      //verificando se o usuario está logado
      await signInWithGoogle(); //se der false não irá prosseguir
    }
    history.push("/room/new"); // após autorizado pelo google irá para está page criar sala
  }

  //função criada para entrar em uma sala
  async function handleJoinRoom(event) {
    event.preventDefault();
    //se a condição for verdadeira remove os espaços
    if(roomCode.trim() ===''){
      return;
    }
    //faz uma requisição do firebase passando o código da sala
    const roomRef = await database.ref(`rooms/${roomCode}`).get();
//caso não encontre
    if(!roomRef.exists()){
      alert("Sala não encontrada");
      return;
    }
//se sim irá para sala
    history.push(`/rooms/${roomCode}`)



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
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Logo do google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              value={roomCode}
              /*pegando valor do input e jogando dentro do useState*/
              onChange={(event) => setRoomCode(event.target.value)}
            />{" "}
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
