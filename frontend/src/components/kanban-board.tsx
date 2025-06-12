import React, { useEffect, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import axios from 'axios';
import { CircleCheck } from 'lucide-react';

export interface Subtask {
  id: string;
  title: string;
  description?: string;
  status: string;
  taskId: string;
}

export interface Task {
  id: string;    
  title: string;
  description?: string;
  status: string;
  goalId?: string | null;
  tag: string | null;
  teamId: string;
  taskCollaborators: {
    userId: string;
    taskId: string;
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      role: string;
      profilePicture: string;
      teamId: string;
    };
  }[];
  substasks?: Subtask[];
  createdAt: string;
}

const STATUS_COLUMNS = [
  { key: 'backlog', label: 'Backlog' },
  { key: 'to-do', label: 'To Do' },
  { key: 'in-progress', label: 'In Progress' },
  { key: 'review', label: 'Review' },
  { key: 'done', label: 'Done' },
];

export function KanbanBoard () {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get('http://localhost:3333/task/team/cmbgk0aij00006zkzt0unjbn6');
        setTasks(res.data);
      } catch (err) {
        console.error('Erro ao buscar tasks:', err);
      }
    };

    fetchTasks();
  }, []);

  return (
    <ScrollArea className="w-full overflow-x-auto">
      <div className="flex gap-4 p-4 min-w-[1200px]">
        {STATUS_COLUMNS.map((column) => {
          const filteredTasks = tasks.filter(task => task.status === column.key);

          return (
            <div key={column.key} className="w-[250px] space-y-4">
                <div className='bg-white px-4 py-2 rounded-md flex items-center justify-between mb-4'>
                    <h2 className="text-lg font-sembild">{column.label}</h2>                    
                </div>

              {filteredTasks.map(task => (
                <Card key={task.id} className="bg-white border-0 ">
                  <CardContent className="px-4 space-y-4">
                    {task.tag && <Badge>{task.tag}</Badge>}
                    <div className='space-y-2'>
                      <h3 className="font-semibold text-sm">{task.title}</h3>
                      <p className="text-xs text-muted-foreground">{task.description}</p>                      
                    </div>
                    <p className="text-xs rounded border border-gray-200 px-2 py-1 max-w-min">
                      {new Date(task.createdAt).toLocaleDateString()}
                    </p>   
                    <div className='flex items-center justify-between'>
                      <div>
                        {task.taskCollaborators.map((collab) => (
                          <Image
                            key={collab.userId}
                            src={collab.user.profilePicture}
                            alt={collab.user.firstName}
                            width={24}
                            height={24}
                            className="rounded-full"
                          />
                        ))}
                      </div>
                      <div className='flex items-center gap-2'>
                        <CircleCheck size={16}/>
                        <p className="text-sm text-muted-foreground">
                          {`0/${task.substasks?.length}`}                          
                        </p>
                      </div>                    
                    </div>                  

                  </CardContent>
                </Card>
              ))}
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
};
