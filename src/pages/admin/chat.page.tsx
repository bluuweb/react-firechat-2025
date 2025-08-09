import FormMessageChat from "@/components/chat/form-message-chat";
import FormSearchFriend from "@/components/chat/form-search-friend";
import ListRoomChat from "@/components/chat/list-room-chat";
import MessagesChat from "@/components/chat/messages-chat";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Suspense, useState } from "react";

const ChatPage = () => {
  const [roomId, setRoomId] = useState("");

  const handleClickRoomId = (id: string) => {
    setRoomId(id);
  };

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col md:flex-row gap-4">
      {/* Sidebar de conversaciones */}
      <Card
        className={`${
          roomId ? "hidden md:flex" : "flex"
        } w-full md:w-80 flex-col border-r bg-card`}
      >
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold mb-3">Conversaciones</h2>
          <Suspense
            fallback={
              <div className="text-sm text-muted-foreground">Cargando...</div>
            }
          >
            <FormSearchFriend handleClickRoomId={handleClickRoomId} />
          </Suspense>
        </div>
        <div className="flex-1 overflow-y-auto">
          <Suspense
            fallback={
              <div className="p-4 text-sm text-muted-foreground">
                Cargando rooms...
              </div>
            }
          >
            <ListRoomChat handleClickRoomId={handleClickRoomId} />
          </Suspense>
        </div>
      </Card>

      {/* Área principal del chat */}
      <Card
        className={`${
          !roomId ? "hidden md:flex" : "flex"
        } flex-1 flex-col bg-card`}
      >
        {roomId ? (
          <Suspense
            fallback={
              <div className="flex-1 flex items-center justify-center text-muted-foreground">
                Cargando mensajes...
              </div>
            }
          >
            <div className="flex-1 flex flex-col min-h-0">
              {/* Header del chat con botón de regreso en móvil */}
              <div className="p-4 border-b md:hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setRoomId("")}
                  className="mb-2"
                >
                  ← Volver a conversaciones
                </Button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 min-h-0">
                <MessagesChat roomId={roomId} />
              </div>
              <div className="border-t p-4">
                <FormMessageChat roomId={roomId} />
              </div>
            </div>
          </Suspense>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <div className="text-6xl mb-4">💬</div>
              <h3 className="text-lg font-medium mb-2">Bienvenido al Chat</h3>
              <p>Selecciona una conversación para comenzar a chatear</p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};
export default ChatPage;
