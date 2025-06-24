"use client";

import { CreateFolderDialog } from "@/components/create-folder-dialog";
import { UploadFileDialog } from "@/components/upload-file-dialog";
import { JSX, useEffect, useState } from "react";
import api from "@/lib/axios";
import { Folder, ImageIcon, FileText, Music, FileQuestion, } from "lucide-react";

type Folder = {
    id: string;
    name: string;
    files: {   
        id: string;
        name: string;
        type: string;
        size: number;
        url: string;
    }[];
};

const teamId = "cmbgk0aij00006zkzt0unjbn6"
const BYTES_IN_MB = 1024 ** 2;
const MAX_TOTAL_MB = 512;
const MAX_FOLDER_MB = 100;

const formatMB = (bytes: number) => (bytes / BYTES_IN_MB).toFixed(1);


type FileTypeStats = {
  label: string;
  icon: JSX.Element;
  color: string;
  size: number;
};

const getTypeLabelAndIcon = (mime: string): { label: string; icon: JSX.Element } => {
  if (mime.startsWith("image/")) return { label: "Media", icon: <ImageIcon size={20} className="text-indigo-500" /> };
  if (mime === "application/pdf") return { label: "Documents", icon: <FileText size={20} className="text-blue-400"/> };
  if (mime.startsWith("audio/") || mime.includes("mpeg")) return { label: "Music", icon: <Music size={20} className="text-yellow-400" /> };
  return { label: "Other File", icon: <FileQuestion size={20} className="text-cyan-400"/> };
};

const typeColors: Record<string, string> = {
  Media: 'bg-indigo-500',
  Documents: 'bg-blue-400',
  Music: 'bg-yellow-400',
  'Other File': 'bg-cyan-400',
};


export default function Files() {
    const [folders, setFolders] = useState<Folder[]>([]);

    useEffect(() => {
        api
            .get(`/folders/team/${teamId}`)
            .then((res) => setFolders(res.data))
            .catch((err) => console.error('Erro ao buscar pastas', err));
    }, []);

    const allFiles = folders.flatMap(f => f.files);
    const totalUsed = allFiles.reduce((sum, file) => sum + file.size, 0);

    const groupedMap: Record<string, { size: number; icon: JSX.Element }> = {};

    allFiles.forEach((file) => {
        const { label, icon } = getTypeLabelAndIcon(file.type);
        if (!groupedMap[label]) {
            groupedMap[label] = { size: 0, icon };
        }
        groupedMap[label].size += file.size;
    });

    const stats: FileTypeStats[] = Object.entries(groupedMap).map(([label, { size, icon }]) => ({
        label,
        size,
        icon,
        color: typeColors[label] || "bg-slate-300",
    }));



    return (
        <main className="pr-4 py-4">
            <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-xl">Files</h2>   
                <div className="flex items-center gap-2">
                    <CreateFolderDialog teamId={teamId} />
                    <UploadFileDialog teamId={teamId}/>
                </div>         
            </div>
            <div className="flex gap-4">
                <div className="bg-white p-4 rounded-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-[70%]">
                    {folders.map((folder) => (
                    <div
                        key={folder.id}
                        className="bg-white border border-slate-200 rounded-md p-4 flex flex-col gap-4 hover:shadow-md transition"
                    >
                        <div>
                            <Folder className="text-blue-500"/>                        
                        </div>
                        <div className="space-y-1">
                            <h3 className="font-semibold text-lg">{folder.name}</h3>
                            <p className="text-sm text-slate-500">
                                {folder.files.length} {folder.files.length === 1 ? 'file' : 'files'}
                            </p>                        
                        </div>
                    </div>
                    ))}
                </div>      
                <div className="flex-1">
                    <div className="bg-white rounded-md p-4 w-full ml-auto flex-1">
                        <div className="flex items-center justify-center bg-slate-100 gap-4 rounded-md p-4 mb-2">
                            <div className="flex flex-col items-center">
                                {/* Círculo de progresso */}
                                <div className="relative w-24 h-24 mx-auto flex flex-col items-center">
                                    <svg viewBox="0 0 36 36" className="w-full h-full">
                                        <path
                                            d="M18 2.0845
                                            a 15.9155 15.9155 0 0 1 0 31.831
                                            a 15.9155 15.9155 0 0 1 0 -31.831"
                                            fill="none"
                                            stroke="#e5e7eb"
                                            strokeWidth="3"
                                        />
                                        <path
                                            d="M18 2.0845
                                            a 15.9155 15.9155 0 0 1 0 31.831"
                                            fill="none"
                                            stroke="#3b82f6"
                                            strokeWidth="3"
                                            strokeDasharray={`${(totalUsed / (MAX_TOTAL_MB * BYTES_IN_MB)) * 100}, 100`}
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold">
                                        {Math.floor((totalUsed / (MAX_TOTAL_MB * BYTES_IN_MB)) * 100)}%
                                    </div>                      
                                </div>                                
                            </div>
                            <div className="flex flex-col gap-1 items-start mb-4">
                                <h3 className="font-semibold text-sm">Available Storage</h3>    
                                <p className="text-center text-sm text-gray-500">
                                    {formatMB(totalUsed)}MB / {MAX_TOTAL_MB}MB
                                </p>                               
                            </div>
                        </div>
                        
                        <div className="space-y-4 mt-4">
                            {stats.map((s) => (
                                <div key={s.label}>
                                    <div className="flex justify-between items-center mb-1">
                                    <div className="flex items-center gap-1 text-sm text-gray-700">
                                        <div className="p-1 rounded bg-slate-100 text-indigo-500">
                                          {s.icon}  
                                        </div>
                                        
                                        <span>{s.label}</span>
                                    </div>
                                    <span className="text-sm font-medium text-gray-600">
                                        {formatMB(s.size)} MB
                                    </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                        <div
                                            className={`h-2 rounded-full ${s.color}`}
                                            style={{ width: `${Math.min((s.size / (MAX_FOLDER_MB * BYTES_IN_MB)) * 100, 100)}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>                    
                </div>
            </div>

        </main>
    )
}