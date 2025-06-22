"use client";

import { CreateFolderDialog } from "@/components/create-folder-dialog";
import { UploadFileDialog } from "@/components/upload-file-dialog";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { Folder } from "lucide-react";

type Folder = {
  id: string;
  name: string;
  files: { id: string }[];
};

const teamId = "cmbgk0aij00006zkzt0unjbn6"

export default function Files() {
    const [folders, setFolders] = useState<Folder[]>([]);

    useEffect(() => {
    api
      .get(`/folders/team/${teamId}`)
      .then((res) => setFolders(res.data))
      .catch((err) => console.error('Erro ao buscar pastas', err));
    }, []);

    return (
        <main className="pr-4 py-4">
            <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-xl">Files</h2>   
                <div className="flex items-center gap-2">
                    <CreateFolderDialog teamId={teamId} />
                    <UploadFileDialog teamId={teamId}/>
                </div>         
            </div>
            <div className="bg-white p-4 rounded-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
        </main>
    )
}