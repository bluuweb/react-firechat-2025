import FormMessageChat from "@/components/chat/form-message-chat";
import FormSearchFriend from "@/components/chat/form-search-friend";
import ListRoomChat from "@/components/chat/list-room-chat";
import MessagesChat from "@/components/chat/messages-chat";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { Suspense, useState } from "react";

const ChatPage = () => {
  const [roomId, setRoomId] = useState("");

  const handleClickRoomId = (id: string) => {
    setRoomId(id);
  };

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col md:flex-row gap-4 p-4 bg-slate-50/50">
      {/* Sidebar de conversaciones */}
      <Card
        className={`${
          roomId ? "hidden md:flex" : "flex"
        } w-full md:w-80 flex-col border border-slate-200 bg-white shadow-sm`}
      >
        <div className="p-4 border-b border-slate-100 bg-slate-50/50">
          <h2 className="text-lg font-semibold mb-3 text-slate-900 flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-blue-500" />
            Conversaciones
          </h2>
          <Suspense
            fallback={<div className="text-sm text-slate-500">Cargando...</div>}
          >
            <FormSearchFriend handleClickRoomId={handleClickRoomId} />
          </Suspense>
        </div>
        <div className="flex-1 overflow-y-auto">
          <Suspense
            fallback={
              <div className="p-4 text-sm text-slate-500">
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
        } flex-1 flex-col border border-slate-200 bg-white shadow-sm`}
      >
        {roomId ? (
          <Suspense
            fallback={
              <div className="flex-1 flex items-center justify-center text-slate-500">
                Cargando mensajes...
              </div>
            }
          >
            <div className="flex-1 flex flex-col min-h-0">
              {/* Header del chat con botón de regreso en móvil */}
              <div className="p-4 border-b border-slate-100 md:hidden bg-slate-50/50">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setRoomId("")}
                  className="mb-2 text-slate-600 hover:text-slate-900"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver a conversaciones
                </Button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 min-h-0 bg-slate-50/30">
                <MessagesChat roomId={roomId} />
              </div>
              <div className="border-t border-slate-100 p-4 bg-white">
                <FormMessageChat roomId={roomId} />
              </div>
            </div>
          </Suspense>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-500">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-50 rounded-full flex items-center justify-center">
                <MessageCircle className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-lg font-medium mb-2 text-slate-900">
                Bienvenido al Chat
              </h3>
              <p className="text-slate-600">
                Selecciona una conversación para comenzar a chatear
              </p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};
export default ChatPage;
