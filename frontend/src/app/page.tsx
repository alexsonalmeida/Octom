'use client';

import { TaskStatus } from "@/components/task-status";
import { Scheudle } from "@/components/task-status/scheudle";
import TaskChart from "@/components/task-status/task-chart";
import TaskList from "@/components/task-status/task-list";
import api from "@/lib/axios";
import { ClipboardList, FileText, Star } from "lucide-react";
import { useEffect, useState } from "react";

type TaskStatus = {
  data: [
    {
      week: string,
      completedUserTasks: number,
      openUserTasks: number,
      completedTeamTasks: number
    },
    {
      week: string,
      completedUserTasks: number,
      openUserTasks: number,
      completedTeamTasks: number
    },
    {
      week: string,
      completedUserTasks: number,
      openUserTasks: number,
      completedTeamTasks: number
    }
  ]
}

export default function Home() {
  const [taskStatus, setTaskStatus] = useState<TaskStatus | null>(null);
  useEffect(() => {
    async function fetchTasks() {
        try {
            const response = await api.get("task/cmbgqxz2300006zszwfd5sx27/dashboard")
            setTaskStatus(response.data)
            console.log("tasks", response.data)
        } catch (error) {
            console.error("Erro ao buscar usuário:", error)
        }
    }

    fetchTasks()
  }, []);

  return (
    <div className="flex h-full gap-4">
      <div className="flex-1 p-4">
        <div className="flex justify-between mb-4">
          <TaskStatus 
            title="Task Completed" 
            icon={<Star size={16}/>} 
            values={[
              taskStatus?.data[0]?.completedUserTasks ?? 0,
              taskStatus?.data[1]?.completedUserTasks ?? 0,
              taskStatus?.data[2]?.completedUserTasks ?? 0
            ]}
          />
          <TaskStatus 
            title="New Task" 
            icon={<FileText size={16} />} 
            values={[
              taskStatus?.data[0]?.openUserTasks ?? 0,
              taskStatus?.data[1]?.openUserTasks ?? 0,
              taskStatus?.data[2]?.openUserTasks ?? 0
            ]}
          />
          <TaskStatus 
            title="Project Done" 
            icon={<ClipboardList size={16} />} 
            values={[
              taskStatus?.data[0]?.completedTeamTasks ?? 0,
              taskStatus?.data[1]?.completedTeamTasks ?? 0,
              taskStatus?.data[2]?.completedTeamTasks ?? 0
            ]}
          />
        </div>
        <TaskChart/>
        <TaskList/>        
      </div>
      <div className="bg-white w-[25%] h-full p-6">
        <Scheudle/>
      </div>
    </div>
  );
}
