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
};

const USER_ID = 'cmbgqxz2300006zszwfd5sx27';

export default function ChatInfo({ chat }: { chat: Chat | null }) {
  if (!chat) return <div className="w-1/4 p-4 bg-gray-50 border-l">Selecione um chat</div>;

  return (
    <div className="w-1/4 p-4 bg-gray-50 border-l">
      <h2 className="font-bold text-lg mb-2">Informações</h2>
      {chat.type === 'private' ? (
        <div className="flex gap-3 items-center">
          <img
            src={chat.chatParticipants.find(p => p.userId !== USER_ID)?.user.profilePicture}
            alt="avatar"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <div className="font-semibold">
              {chat.chatParticipants.find(p => p.userId !== USER_ID)?.user.firstName}
            </div>
            <div className="text-sm text-gray-500">@usuario</div>
          </div>
        </div>
      ) : (
        <>
          <div className="font-semibold mb-2">{chat.team?.name}</div>
          <div className="text-sm text-gray-500 mb-2">
            {chat.chatParticipants.length} membros
          </div>
          <ul className="space-y-2">
            {chat.chatParticipants.map(p => (
              <li key={p.user.id} className="flex items-center gap-2">
                <img
                  src={p.user.profilePicture}
                  className="w-8 h-8 rounded-full"
                  alt={p.user.firstName}
                />
                <span>{p.user.firstName}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
