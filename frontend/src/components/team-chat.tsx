'use client';

import { useEffect, useState, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SendHorizonal } from 'lucide-react';
import api from '@/lib/axios';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

interface TeamChatProps {
  chatId: string;
  users: User[]
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  profilePicture: string;
  teamId: string;
}

interface Message {
  id: string;
  content: string;
  createdAt: string;
  sender: {
    id: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
  };
}

export default function TeamChat({ chatId, users }: TeamChatProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const displayUsers = users.slice(0, 6);
    const remainingCount = users.length - displayUsers.length;
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await api.get(`/chats/${chatId}/messages`);
        setMessages(res.data);
      } catch (err) {
        console.error('Failed to fetch messages:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [chatId]);

  const handleSend = async () => {
    if (!newMessage.trim()) return;

    try {
      const res = await api.post(`/messages`, {
        chatId,
        content: newMessage,
      });

      setMessages(prev => [...prev, res.data]);
      setNewMessage('');
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  return (
    <div className="flex flex-col flex-1 border-l bg-white min-h-0">
        <div className="flex justify-between items-center px-4 pt-4">
            <h3 className="text-sm font-medium">
                Members <span className="text-indigo-500">({users.length})</span>
            </h3>
            <Popover>
                <PopoverTrigger className="text-sm text-muted-foreground hover:underline cursor-pointer">
                    View All
                </PopoverTrigger>
                <PopoverContent className="max-h-64 overflow-y-auto w-64">
                <ul>
                    {users.map((user) => (
                    <li key={user.id} className="flex items-center space-x-2 py-1">
                        <Avatar className="w-6 h-6">
                        <AvatarImage src={user.profilePicture} />
                        <AvatarFallback>
                            {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                        </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">
                        {user.firstName} {user.lastName}
                        </span>
                    </li>
                    ))}
                </ul>
                </PopoverContent>
            </Popover>
        </div>

        <div className="flex px-4 space-x-2 py-2">
            {displayUsers.map((user) => (
                <Avatar key={user.id} className="w-8 h-8">
                <AvatarImage src={user.profilePicture} alt={user.firstName} />
                <AvatarFallback>
                    {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                </AvatarFallback>
                </Avatar>
            ))}
            </div>

            {/* Chat Title */}
            <div className="p-4 font-semibold text-gray-800">
                Group Chat
            </div>
        <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4">
            {loading ? (
            <p>Loading messages...</p>
            ) : messages.length === 0 ? (
                <p className='text-slate-500 text-sm'>
                    Sem mensagens para exibir.
                </p>
            ) : (
            messages.map((msg) => (
                <div key={msg.id} className="flex items-start gap-2">
                <Avatar className="w-8 h-8">
                    <AvatarImage src={msg.sender.profilePicture} alt={msg.sender.firstName} />
                    <AvatarFallback>
                    {msg.sender.firstName[0]}
                    {msg.sender.lastName[0]}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <div className="text-sm font-semibold text-gray-800">
                    {msg.sender.firstName} {msg.sender.lastName}
                    </div>
                    <div className="text-sm text-gray-600">{msg.content}</div>
                    <div className="text-xs text-gray-400">{new Date(msg.createdAt).toLocaleTimeString()}</div>
                </div>
                </div>
            ))
            )}
            <div ref={messagesEndRef} />
        </div>
      <div className="border-t p-3 flex items-center gap-2">
        <Input
          placeholder="Write a message..."
          className="flex-1"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <Button size="icon" onClick={handleSend} className='bg-indigo-500 hover:bg-indigo-600'>
          <SendHorizonal size={18} />
        </Button>
      </div>
    </div>
  );
}
