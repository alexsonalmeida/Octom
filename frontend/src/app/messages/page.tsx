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
//   const [chats, setChats] = useState<Chat[]>([]);
//   const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     fetch(`http://localhost:3333/chats/user/${USER_ID}`)
//       .then(res => res.json())
//       .then((data) => {
//         setChats(data);
//         if (data.length) {
//           fetchChat(data[0].id);
//         }
//       });
//   }, []);

//   const fetchChat = async (chatId: string) => {
//     const res = await fetch(`http://localhost:3333/chats/${chatId}`);
//     const data = await res.json();
//     setSelectedChat(data);
//   };

//   const getTitle = (chat: Chat) => {
//     if (chat.type === 'team') return chat.team?.name;
//     const other = chat.chatParticipants.find(p => p.userId !== USER_ID);
//     return `${other?.user.firstName} ${other?.user.lastName}`;
//   };

//   const getAvatar = (chat: Chat) => {
//     if (chat.type === 'team') return chat.chatParticipants[0]?.user.profilePicture;
//     const other = chat.chatParticipants.find(p => p.userId !== USER_ID);
//     return other?.user.profilePicture;
//   };
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

//   return (
//     <div className="flex h-screen">
//       {/* Lista de chats */}
//       <div className="w-1/4 border-r overflow-y-auto p-4">
//         <h2 className="text-xl font-bold mb-4">Messages</h2>
//         {chats.map(chat => (
//           <div
//             key={chat.id}
//             className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer"
//             onClick={() => fetchChat(chat.id)}
//           >
//             <img src={getAvatar(chat)} alt="avatar" className="w-10 h-10 rounded-full" />
//             <div>
//               <div className="font-medium">{getTitle(chat)}</div>
//               <div className="text-sm text-gray-600">
//                 {chat.messages?.[chat.messages.length - 1]?.text || 'Nenhuma mensagem'}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Área de mensagens */}
//       <div className="flex-1 p-6 overflow-y-auto">
//         {selectedChat ? (
//           <>
//             <h1 className="text-2xl font-bold mb-4">
//               {selectedChat.type === 'private'
//                 ? selectedChat.chatParticipants.find(p => p.userId !== USER_ID)?.user.firstName
//                 : selectedChat.team?.name}
//             </h1>
//             <div className="space-y-4">
//               {selectedChat.messages.map(msg => (
//                 <div key={msg.id} className="flex gap-3 items-start">
//                   <img
//                     src={msg.sender.profilePicture}
//                     alt="sender"
//                     className="w-10 h-10 rounded-full"
//                   />
//                   <div>
//                     <div className="font-medium">{msg.sender.firstName}</div>
//                     <div className="bg-gray-200 p-2 rounded-md">{msg.text}</div>
//                     <div className="text-xs text-gray-500">
//                       {new Date(msg.createdAt).toLocaleString()}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </>
//         ) : (
//           <div>Carregando chat...</div>
//         )}
//       </div>

//       {/* Informações do lado direito */}
//       <div className="w-1/4 border-l p-4 bg-gray-50">
//         {selectedChat && (
//           <>
//             <h2 className="font-bold text-lg mb-2">Informações</h2>
//             {selectedChat.type === 'private' ? (
//               <div className="flex gap-3 items-center">
//                 <img
//                   src={
//                     selectedChat.chatParticipants.find(p => p.userId !== USER_ID)?.user
//                       .profilePicture
//                   }
//                   alt="avatar"
//                   className="w-12 h-12 rounded-full"
//                 />
//                 <div>
//                   <div className="font-semibold">
//                     {
//                       selectedChat.chatParticipants.find(p => p.userId !== USER_ID)?.user
//                         .firstName
//                     }
//                   </div>
//                   <div className="text-sm text-gray-500">@usuario</div>
//                 </div>
//               </div>
//             ) : (
//               <>
//                 <div className="font-semibold mb-2">{selectedChat.team?.name}</div>
//                 <div className="text-sm text-gray-500 mb-2">
//                   {selectedChat.chatParticipants.length} membros
//                 </div>
//                 <ul className="space-y-2">
//                   {selectedChat.chatParticipants.map(p => (
//                     <li key={p.user.id} className="flex items-center gap-2">
//                       <img
//                         src={p.user.profilePicture}
//                         className="w-8 h-8 rounded-full"
//                         alt={p.user.firstName}
//                       />
//                       <span>{p.user.firstName}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
  return (
    <div className="flex h-screen">
      <ChatList chats={chats} onSelect={handleSelectChat} />
      <ChatWindow chat={selectedChat} />
      <ChatInfo chat={selectedChat} />
    </div>
  )
}
