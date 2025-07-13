'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Avatar } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import api from '@/lib/axios';
import { cn } from '@/lib/utils';

interface Chat {
  id: string;
  messages: {
    text: string;
  }[];
  chatParticipants: {
    user: {
        id: string;
        firstName: string;
        lastName: string;
        profilePicture: string;
    };
  }[];
}

interface ChatListDashboardProps {
  userId: string;
  height?: number;
}

export function ChatListDashboard({ userId, height = 360 }: ChatListDashboardProps) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const { data } = await api.get(`/chats/user/${userId}`);
        setChats(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, [userId]);

  const handleClick = (chatId: string) => {
    router.push(`/messages?chat=${chatId}`);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error || !chats) {
    return <p className="text-muted-foreground text-sm mb-6">Erro ao carregar mensagens.</p>;
  }

  if (chats.length === 0) {
    return <p className="text-muted-foreground text-sm mb-6">Você não tem mensagens.</p>;
  }

  return (
    <div
      className="space-y-4 overflow-y-auto pr-2 mb-4"
      style={{ maxHeight: height }}
    >
      {chats.map((chat) => {
        const other = chat.chatParticipants.find(p => p.user.id !== userId);
        const name = other?.user?.firstName ?? 'Usuário';
        const lastName = other?.user?.lastName ?? 'Usuário';
        const avatar = other?.user?.profilePicture;
        const lastMsg = chat.messages.at(-1)?.text ?? 'Sem mensagens';

        return (
          <div
            key={chat.id}
            className={cn(
              'flex items-center gap-4 p-2 rounded-md cursor-pointer hover:bg-muted transition'
            )}
            onClick={() => handleClick(chat.id)}
          >
            <Avatar className="h-12 w-12">
              {avatar ? (
                <img src={avatar} alt={name} />
              ) : (
                <div className="bg-gray-300 rounded-full w-full h-full" />
              )}
            </Avatar>
            <div className="flex flex-col overflow-hidden">
              <div>
                <span className="font-semibold text-sm truncate">{name}</span>
                <span className="font-semibold text-sm truncate"> {lastName}</span>
              </div>
              <span className="text-muted-foreground text-sm truncate">{lastMsg}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
