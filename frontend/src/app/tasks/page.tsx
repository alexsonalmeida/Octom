'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; 
import { KanbanBoard } from '@/components/kanban-board';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  profilePicture: string;
  teamId: string;
}

interface Team {
  id: string;
  name: string;
  users: User[];
  chat: null;
}

const teamID = 'cmbgk0aij00006zkzt0unjbn6';

export default function Tasks() {
    const [team, setTeam] = useState<Team | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const displayUsers = team?.users.slice(0, 5);
    const remainingCount = team && displayUsers ? team.users.length - displayUsers.length : 0;

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const response = await api.get(`/teams/${teamID}`);
                setTeam(response.data);
            } catch (err) {
                setError('Failed to fetch team data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTeam();
    }, [teamID]);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
    }

    if (!team) {
        return <div className="flex justify-center items-center h-screen">Team not found</div>;
    }
    return (
        <main>
            <div className='flex justify-between'>
                <h2 className="font-semibold text-xl">Tasks</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="flex items-center">
                        {displayUsers?.map((user, index) => (
                            <div
                                key={user.id}
                                className="relative"
                                style={{
                                    marginLeft: index > 0 ? '-8px' : '0',
                                    zIndex: displayUsers.length - index,
                                }}
                            >
                                <Avatar className="w-8 h-8 border-2 border-white">
                                <AvatarImage 
                                    src={user.profilePicture} 
                                    alt={`${user.firstName} ${user.lastName}`} 
                                />
                                <AvatarFallback className="text-xs">
                                    {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                                </AvatarFallback>
                                </Avatar>
                            </div>
                        ))}
                            
                        {/* Mostrar contador de usuários restantes */}
                            {remainingCount > 0 && (
                            <div
                                className="relative flex items-center justify-center w-8 h-8 bg-gray-200 text-gray-600 rounded-full border-2 border-white text-xs font-medium"
                                style={{
                                    marginLeft: '-8px',
                                    zIndex: 0,
                                }}
                            >
                                +{remainingCount}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <KanbanBoard/>
        </main>
    )
}