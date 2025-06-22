'use client'

import { useState } from 'react'
import api from '@/lib/axios'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react'

type CreateFolderDialogProps = {
  teamId?: string
}

export function CreateFolderDialog({ teamId }: CreateFolderDialogProps) {
  const [name, setName] = useState('')
  const [open, setOpen] = useState(false)

  async function handleCreate() {
    await api.post('/folders', { name, teamId })
    setName('')
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center bg-indigo-500 font-medium rounded-full text-sm text-white gap-2 py-3 px-4 cursor-pointer hover:bg-indigo-600 transition-colors">
            <Plus size={14}/>
            Create New Folder
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-lg font-semibold">Create Folder</DialogTitle>
        <Input value={name} onChange={e => setName(e.target.value)} placeholder="Folder name" />
        <Button onClick={handleCreate} className="mt-4">Create</Button>
      </DialogContent>
    </Dialog>
  )
}
