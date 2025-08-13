import { useMessagesActions } from "@/hooks/user-messages-actions";
import type { Message } from "@/schemas/room.schema";
import { useEffect, useRef, useState } from "react";
import { useUser } from "reactfire";
import MessageChat from "./message-chat";

interface Props {
  roomId: string;
}

const MessagesChat = ({ roomId }: Props) => {
  const { messages } = useMessagesActions(roomId);
  const { data: user } = useUser();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [suggestion, setSuggestion] = useState<string>("");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();

    if (messages.length > 0) {
      const lastMsg = messages[messages.length - 1];
      // Solo generar sugerencia si el último mensaje NO es del usuario actual
      if (lastMsg.senderId !== user?.uid) {
        fetchSuggestion(messages);
      }
    }
  }, [messages, user?.uid]);

  const fetchSuggestion = async (msgs: Message[]) => {
    try {
      // Tomamos solo los últimos 8 mensajes para mantener relevancia
      const recentMsgs = msgs.slice(-8);
      const contextText = recentMsgs
        .map((m) => `${m.senderId}: ${m.text}`)
        .join("\n");

      const lastMessage = recentMsgs[recentMsgs.length - 1];

      const prompt = `
    Eres un asistente de chat con personalidad malvada, perversa, sarcástica y de humor extremadamente pesado.
    Tus respuestas deben ser desagradables, crueles y con un toque oscuro, pero siempre manteniendo el idioma español.
    No seas educado, no pidas disculpas, y haz chistes de mal gusto. Sé directo y mordaz.
    Debes sugerir SOLO UNA respuesta que continúe la conversación respondiendo específicamente al ÚLTIMO mensaje recibido.
    No incluyas explicaciones ni formato extra, responde en una sola línea.

    Historial reciente:
    ${contextText}

    Último mensaje a responder:
    ${lastMessage.senderId}: ${lastMessage.text}
    `;

      const res = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama3.2:3b",
          prompt,
          stream: false,
        }),
      });

      const data = await res.json();

      if (typeof data.response === "string") {
        setSuggestion(data.response.trim());
      } else {
        setSuggestion("");
      }
    } catch (error) {
      console.error("Error llamando a Ollama:", error);
      setSuggestion("");
    }
  };

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground">
        <div className="text-center">
          <div className="text-4xl mb-2">💬</div>
          <p className="text-sm">No hay mensajes aún</p>
          <p className="text-xs">¡Envía el primer mensaje!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-1 h-full">
      <div className="flex-1">
        {messages.map((message) => (
          <MessageChat
            key={message.id}
            message={message}
          />
        ))}
      </div>

      {/* Sugerencia de IA */}
      {suggestion && (
        <div className="bg-muted p-2 rounded">
          <p className="text-xs mb-1 text-muted-foreground">
            Sugerencia malvada:
          </p>
          <button
            className="px-2 py-1 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/80"
            onClick={() => {
              console.log("Enviar respuesta:", suggestion);
              // Aquí puedes llamar a tu función para enviar el mensaje al chat
            }}
          >
            {suggestion}
          </button>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessagesChat;
