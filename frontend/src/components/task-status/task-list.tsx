'use client';
import { AlarmClock, LayoutList } from 'lucide-react';
import { useEffect, useState } from 'react';

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
  tagId?: string | null;
  teamId: string;
  collaboratorIds?: string[];
  substasks?: Subtask[];
}

interface ProgressBarProps {
  percentage: number;
  height?: string;
}

function ProgressBar({ percentage, height = "h-2" }: ProgressBarProps) {
  return (
    <div className={`w-60 bg-gray-200 rounded-full ${height} overflow-hidden`}>
      <div 
        className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full transition-all duration-300 ease-out"
        style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
      />
    </div>
  );
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const calcCompletion = (task: Task): number => {
    if (!task.substasks || task.substasks.length === 0) {
      return task.status === 'done' ? 100 : 0;
    }

    const doneCount = task.substasks.filter(subtask => subtask.status === 'done').length;
    return Math.round((doneCount / task.substasks.length) * 100);
  };

  useEffect(() => {
    async function fetchTasks() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch('http://localhost:3333/task/user/cmbgqxz2300006zszwfd5sx27');
        
        if (!res.ok) {
          throw new Error(`Erro na requisição: ${res.status}`);
        }
        
        const data = await res.json();
        setTasks(data);
      } catch (err: any) {
        setError(err.message || 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
  }, []);

  if (loading) return <p>Carregando tasks...</p>;
  if (error) return <p>Erro: {error}</p>;
  if (tasks.length === 0) return <p>Nenhuma task encontrada.</p>;


  return (
    <div>
      <h2 className="font-semibold text-xl my-4">Tasks</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map(task => {
          const completion = calcCompletion(task);
          return (
            <li key={task.id} className='bg-white mb-3.5 p-4 rounded-md'>
              <div className='flex items-center gap-4'>
                <LayoutList className="text-gray-400" size={20} />
                
                <div className='flex-1'>
                  {/* Header da task */}
                  <div className='flex items-center justify-between'>
                    <h3 className="font-medium text-gray-900 w-full max-w-72">{task.title}</h3>
                    {/* Barra de progresso */}
                    <div className='space-y-2'>
                      <div className='flex items-center justify-between text-sm'>
                        <span className='text-gray-500'>
                          {completion}% complete
                        </span>
                      </div>
                      <ProgressBar percentage={completion} />
                    </div>
                    <div className='flex items-center gap-3 bg-indigo-100 text-indigo-700 rounded-lg px-3 py-2 cursor-pointer hover:bg-indigo-200 transition-colors'>
                      <AlarmClock size={16} />
                      <p className='text-sm'>Reminder</p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
