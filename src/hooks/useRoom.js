import { useState, useEffect } from "react";
import { database } from "../service/firebase";

import { useAuth } from "./useAuth";

export function useRoom(roomId) {
  const { user } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    //duvidas conferir docs do firebase
    const roomRef = database.ref(`rooms/${roomId}`);

     roomRef.on("value", (room) => {
      //recebendo os valores e passando o valor do objeto para um array
      const databaseRoom = room.val();
      const firebaseQuestions = databaseRoom.questions ?? {};
      //desestruturizando objeto vindo do firebase
      const parsedQuestions = Object.entries(firebaseQuestions).map(
        ([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighlighted: value.isHighlighted,
            isAnswered: value.isAnswered,
            likeCount: Object.values(value.likes ?? {}).length,
            likeId: Object.entries(value.likes ?? {}).find(
              ([key, like]) => like.authorId === user?.id
            )?.[0],
          };
        }
      );
      //pegando titulo vindo do firebase
      setTitle(databaseRoom.title);
      //jogando o array dentro do useState para consumir depois
      setQuestions(parsedQuestions);
    });
    //removendo tods os eventListen 
    return () => {
      roomRef.off("value");
    };
  }, [roomId, user?.id]);
  return { questions, title };
}
