import React from 'react';

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

type ChatListProps = {
  chats: Chat[];
  onSelect: (chatId: string) => void;
};

const USER_ID = 'cmbgqxz2300006zszwfd5sx27';

export default function ChatList({ chats, onSelect }: ChatListProps) {
  const getTitle = (chat: Chat) => {
    if (chat.type === 'team') return chat.team?.name;
    const other = chat.chatParticipants.find(p => p.userId !== USER_ID);
    return `${other?.user.firstName} ${other?.user.lastName}`;
  };

  const getAvatar = (chat: Chat) => {
    if (chat.type === 'team') return chat.chatParticipants[0]?.user.profilePicture;
    const other = chat.chatParticipants.find(p => p.userId !== USER_ID);
    return other?.user.profilePicture;
  };

  return (
    <div className="w-1/4 border-r overflow-y-auto p-4">
      <h2 className="text-xl font-bold mb-4">Messages</h2>
      {chats.map(chat => (
        <div
          key={chat.id}
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer"
          onClick={() => onSelect(chat.id)}
        >
          <img src={getAvatar(chat)} alt="avatar" className="w-10 h-10 rounded-full" />
          <div>
            <div className="font-medium">{getTitle(chat)}</div>
            <div className="text-sm text-gray-600">
              {chat.messages?.[chat.messages.length - 1]?.text || 'Nenhuma mensagem'}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
