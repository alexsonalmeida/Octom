'use client';

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/lib/axios";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Check, ChevronLeft, ChevronRight, Plus, X } from "lucide-react";

interface User {
  id: string;
  firstName: string;
  profilePicture?: string;
}

interface TaskPayload {
  title: string;
  description?: string;
  status: string;
  tag?: string;
  goalId?: string;
  teamId: string;
  collaborators: string[];
}

const TEAM_ID = "cmbgk0aij00006zkzt0unjbn6";

export default function NewTaskWizard() {
  const [step, setStep] = useState<0 | 1>(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [collaborators, setCollaborators] = useState<User[]>([]);
  const [selectedCollabs, setSelectedCollabs] = useState<User[]>([]);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadTeamUsers = useCallback(async () => {
    try {
      const { data } = await api.get(`/teams/${TEAM_ID}`);
      setCollaborators(data.users ?? []);
    } catch (err) {
      console.error("Erro ao buscar colaboradores", err);
    }
  }, []);

  const toggleCollaborator = (user: User) => {
    setSelectedCollabs((prev) =>
      prev.find((u) => u.id === user.id)
        ? prev.filter((u) => u.id !== user.id)
        : [...prev, user]
    );
  };

  const removeCollaboratorById = (id: string) => {
    setSelectedCollabs((prev) => prev.filter((u) => u.id !== id));
  };

  const next = () => setStep((s) => (s < 1 ? 1 : s));
  const back = () => setStep((s) => (s > 0 ? 0 : s));

  const handleSubmit = async () => {
    setLoading(true);

    const payload: TaskPayload = {
      title,
      status: "TODO",
      teamId: TEAM_ID,
      collaborators: selectedCollabs.map((u) => u.id),
    };

    try {
      await api.post("/tasks", payload);
      setTitle("");
      setSelectedCollabs([]);
      setStep(0);
      alert("Task criada com sucesso!");
    } catch (err) {
      console.error("Erro ao criar task", err);
      alert("Falha ao criar task. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg">
      <AnimatePresence mode="wait">
        {/* ──────────────────────────── STEP 0 ──────────────────────────── */}
        {step === 0 && (
          <motion.div
            key="step-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-2"
          >
            <label className="text-sm font-medium text-slate-400">
              Task Title
            </label>
            <input
              className="w-full rounded-md bg-slate-200 placeholder:text-slate-400 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
              placeholder="Create task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <hr className="mb-2"/>
            {/* Colaboradores */}
            <p className="text-sm font-medium text-slate-400">
              Add Collaborators
            </p>

            <div className="relative">
              <div className="flex items-center gap-2 overflow-x-auto pr-10">
                {selectedCollabs.map((user) => (
                  <span
                    key={user.id}
                    className="flex-shrink-0 flex items-center gap-1 px-2 py-1 rounded-full bg-indigo-50"
                  >
                    {user.profilePicture ? (
                      <img
                        src={user.profilePicture}
                        alt={user.firstName}
                        className="h-5 w-5 rounded-full object-cover"
                      />
                    ) : (
                      <span className="h-5 w-5 rounded-full bg-gray-300 flex items-center justify-center text-[10px] uppercase">
                        {user.firstName ? user.firstName.charAt(0) : "?"}
                      </span>
                    )}
                    <span className="text-xs whitespace-nowrap">
                      {user.firstName}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeCollaboratorById(user.id)}
                      className="text-xs text-indigo-600 hover:text-indigo-800"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
                <Popover
                  open={popoverOpen}
                  onOpenChange={(open: boolean) => {
                    setPopoverOpen(open);
                    if (open && collaborators.length === 0) {
                      loadTeamUsers();
                    }
                  }}
                >
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 hover:bg-gray-200 border border-gray-200"
                    >
                      <Plus size={16} />
                    </button>
                  </PopoverTrigger>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="p-2 rounded-full bg-indigo-600 text-white disabled:opacity-50 hover:bg-indigo-500"
                      disabled={!title.trim()}
                      onClick={next}
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                  <PopoverContent className="w-64 p-2">
                    <p className="text-sm font-medium text-slate-500 mb-2">
                      Membros do time
                    </p>
                    <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
                      {collaborators.map((user) => {
                        const already = selectedCollabs.find(
                          (u) => u.id === user.id
                        );
                        return (
                          <button
                            key={user.id}
                            type="button"
                            onClick={() => toggleCollaborator(user)}
                            className={`flex items-center gap-2 px-2 py-1 rounded-md hover:bg-slate-100 ${
                                already ? "bg-slate-100" : ""
                            }`}
                          >
                            {user.profilePicture ? (
                              <img
                                src={user.profilePicture}
                                alt={user.firstName}
                                className="h-6 w-6 rounded-full object-cover"
                              />
                            ) : (
                              <span className="h-6 w-6 rounded-full bg-gray-300 flex items-center justify-center text-xs uppercase">
                                {user.firstName ? user.firstName.charAt(0) : "?"}
                              </span>
                            )}
                            <span className="text-sm">{user.firstName}</span>
                            {already && (
                              <X size={12} className="ml-auto text-indigo-600" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </motion.div>
        )}
        {/* ──────────────────────────── STEP 1 ──────────────────────────── */}
        {step === 1 && (
          <motion.div
            key="step-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-6"
          >
            {/* Descrição */}
            <label className="text-sm font-medium text-slate-400">
              Description (optional)
            </label>
            <textarea
              className="w-full min-h-[120px] rounded-md bg-slate-200 placeholder:text-slate-400 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Write a short description of the task..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            {/* Ações */}
            <div className="flex justify-between pt-2">
              <button
                type="button"
                onClick={back}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading || !title.trim()}
                className="p-2 rounded-full bg-indigo-600 text-white disabled:opacity-50 transition-transform hover:scale-105"
              >
                {loading ? "..." : <Check size={14} />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

