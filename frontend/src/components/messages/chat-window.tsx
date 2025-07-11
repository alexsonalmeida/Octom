import api from '@/lib/axios';
import { Send } from 'lucide-react';
import React, { useState } from 'react';

type User = {
  id: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
};

type Message = {
  id: string;
  text: string;
  createdAt: string;
  sender: User;
};

type Chat = {
  id: string;
  type: 'private' | 'team';
  team?: { name: string };
  chatParticipants: { user: User; userId: string }[];
  messages: Message[];
};

const USER_ID = 'cmbgqxz2300006zszwfd5sx27';

export default function ChatWindow({ chat }: { chat: Chat | null }) {
  const [newMessage, setNewMessage] = useState('');
  if (!chat) return <div className="flex-1 p-6">Selecione um chat</div>;

  const handleSend = async () => {
    if (!newMessage.trim() || !chat) return;

    try {
      const res = await api.post(`/messages/chat/${chat.id}`, {
        senderId: USER_ID,
        text: newMessage,
      });

      const sentMessage: Message = {
        ...res.data,
        sender: chat.chatParticipants.find(p => p.userId === USER_ID)?.user!,
      };

      chat.messages.push(sentMessage); // ⚠️ isso muta diretamente, ideal seria usar `setMessages` se tivesse controle

      setNewMessage('');
    } catch (err) {
      console.error('Erro ao enviar mensagem:', err);
    }
  };


  const title =
    chat.type === 'private'
      ? chat.chatParticipants.find(p => p.userId !== USER_ID)?.user.firstName
      : chat.team?.name;

  return (
    <div className="flex flex-col flex-1 overflow-y-auto">
      {/* Header */}
      <div className="p-6">
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>

      {/* Mensagens roláveis */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {chat.messages.map(msg => (
          <div key={msg.id} className="flex gap-3 items-start">
            <img
              src={msg.sender.profilePicture}
              alt="sender"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <div className="font-medium">{msg.sender.firstName}</div>
              <div className="bg-gray-200 p-2 rounded-md">{msg.text}</div>
              <div className="text-xs text-gray-500 mt-1">
                {new Date(msg.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input fixo */}
      <div className="border-t p-4 bg-indigo-50">
        <form
          className="flex items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
        >
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-1 bg-white rounded-full px-3 py-2 placeholder:text-slate-400 focus:outline-none focus:ring focus:ring-blue-200"
          />
            <button
              type="submit"
              className="bg-indigo-500 flex items-center justify-center text-white p-3 rounded-full cursor-pointer hover:bg-indigo-600"
            >
              <Send size={14} />
            </button>
        </form>
      </div>
    </div>
  );

}
