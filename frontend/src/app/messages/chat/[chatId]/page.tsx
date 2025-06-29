'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

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

export default function ChatView() {
  const { chatId } = useParams();
  const [chat, setChat] = useState<Chat | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3333/chats/${chatId}`)
      .then((res) => res.json())
      .then(setChat);
  }, [chatId]);

  if (!chat) return <div>Carregando...</div>;

  const title =
    chat.type === 'private'
      ? chat.chatParticipants.find((p) => p.userId !== USER_ID)?.user.firstName
      : chat.team?.name;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <div className="space-y-4">
        {chat?.messages?.map((msg) => (
          <div key={msg.id} className="flex gap-3 items-start">
            <img
              src={msg.sender.profilePicture}
              alt="sender"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <div className="font-medium">{msg.sender.firstName}</div>
              <div className="bg-gray-200 p-2 rounded-md">{msg.text}</div>
              <div className="text-xs text-gray-500">
                {new Date(msg.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
