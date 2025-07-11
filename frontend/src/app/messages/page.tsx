'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ChatList from '@/components/messages/chat-list';
import ChatWindow from '@/components/messages/chat-window';
import ChatInfo from '@/components/messages/chat-info';

const USER_ID = 'cmbgqxz2300006zszwfd5sx27';

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

export default function MessagesPage() {
  const [chats, setChats] = useState<any[]>([]);
  const [selectedChat, setSelectedChat] = useState<any>(null);

  useEffect(() => {
    fetch(`http://localhost:3333/chats/user/${USER_ID}`)
      .then(res => res.json())
      .then(async (data) => {
        setChats(data);
        if (data.length) {
          const res = await fetch(`http://localhost:3333/chats/${data[0].id}`);
          const chatData = await res.json();
          setSelectedChat(chatData);
        }
      });
  }, []);

  const handleSelectChat = async (chatId: string) => {
    const res = await fetch(`http://localhost:3333/chats/${chatId}`);
    const chatData = await res.json();
    setSelectedChat(chatData);
  };

  return (
    <div className="flex h-screen bg-slate-100">
      <ChatList chats={chats} onSelect={handleSelectChat} />
      <ChatWindow chat={selectedChat} />
      <ChatInfo chat={selectedChat} />
    </div>
  )
}
