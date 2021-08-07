import copyImg from "../assets/images/copy.svg";
// import roomCode from "../styles/roomCode.scss";
import { useState } from "react";

import '../styles/roomCode.scss';

export function RoomCode({ code }) {
  const [codeRoom] = useState(code);

  //funcão criada para copiar codigo da sala
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(code);

  }

  return (
    <button className="room-code" onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt="Copy room code" />
      </div>
      <span> Sala#{codeRoom}</span>
    </button>
  );
}
