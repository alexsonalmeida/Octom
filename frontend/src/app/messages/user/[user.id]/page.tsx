'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type User = {
  id: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
};

type Chat = {
  id: string;
  type: 'private' | 'team';
  team?: { name: string };
  chatParticipants: { user: User; userId: string }[];
  messages: { text: string }[];
};

const USER_ID = 'cmbgqxz2300006zszwfd5sx27'; 

export default function ChatList() {
  const [chats, setChats] = useState<Chat[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch(`http://localhost:3333/chats/user/${USER_ID}`)
      .then((res) => res.json())
      .then(setChats);
  }, []);

  const getTitle = (chat: Chat) => {
    if (chat.type === 'team') return chat.team?.name;
    const otherUser = chat.chatParticipants.find((p) => p.userId !== USER_ID);
    return `${otherUser?.user.firstName} ${otherUser?.user.lastName}`;
  };

  const getAvatar = (chat: Chat) => {
    if (chat.type === 'team') {
      return chat.chatParticipants[0]?.user.profilePicture;
    }
    const otherUser = chat.chatParticipants.find((p) => p.userId !== USER_ID);
    return otherUser?.user.profilePicture;
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Chats</h2>
      {chats.map((chat) => (
        <div
          key={chat.id}
          className="flex items-center gap-3 p-3 border rounded-lg mb-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => router.push(`/messages/chat/${chat.id}`)}
        >
          <img src={getAvatar(chat)} alt="avatar" className="w-10 h-10 rounded-full" />
          <div>
            <div className="font-medium">{getTitle(chat)}</div>
            <div className="text-sm text-gray-600">
              {chat.messages?.[0]?.text || 'Nenhuma mensagem'}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
