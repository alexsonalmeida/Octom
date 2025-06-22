'use client'

import { useEffect, useState } from 'react'
import api from '@/lib/axios'
import { useForm } from 'react-hook-form'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Select, SelectTrigger, SelectItem, SelectContent, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Link, X } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'

interface Folder {
  id: string
  name: string
}

interface User {
  id: string
  firstName: string
  lastName: string
  profilePicture?: string
}

type UploadFileDialogProps = {
  teamId: string
}

export function UploadFileDialog({ teamId }: UploadFileDialogProps) {
  const [folders, setFolders] = useState<Folder[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [open, setOpen] = useState(false)
  const { register, handleSubmit, setValue, watch } = useForm()

  const folderId = watch('folderId')
  const viewerIds = watch('viewerIds')

  useEffect(() => {
    if (!teamId) return

    api.get(`/folders/team/${teamId}`).then(res => setFolders(res.data))

    api.get(`/teams/${teamId}`).then(res => {
      setUsers(res.data.users)
    })
  }, [teamId])

  async function onSubmit(data: any) {
    const formData = new FormData()
    const file = data.file?.[0]
    if (!file) {
      console.error('Arquivo não selecionado corretamente')
      return
    }
    formData.append('file', file)
    console.log('Arquivo a ser enviado:', file)


    formData.append('folderId', data.folderId)
    formData.append('teamId', teamId)

    viewerIds?.forEach((id: string) => formData.append('viewerIds[]', id))

    for (let [key, value] of formData.entries()) {
      console.log(`Dados: ${key}:`, value)
    }
    api.post('/files/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }, // NÃO FAÇA ISSO!
    })

    setOpen(false)

  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center font-medium rounded-full border border-slate-300 text-sm text-slate-600 gap-2 py-3 px-4 cursor-pointer hover:bg-slate-200 transition-colors">
            <Link size={14} />
            Upload
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-lg font-semibold">Upload de arquivo</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input type="file" {...register('file')} required />
          <Select onValueChange={val => setValue('folderId', val)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Folder" />
            </SelectTrigger>
            <SelectContent>
              {folders.map(folder => (
                <SelectItem key={folder.id} value={folder.id}>
                  {folder.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start">
                {viewerIds?.length > 0
                  ? `Selected ${viewerIds.length} viewer(s)`
                  : 'Select Viewers'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-2 bg-white rounded-md shadow-lg py-4">
              <p className="text-sm font-medium text-slate-500 mb-2">
                Team Members
              </p>
              <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
                {users.map((user) => {
                  const already = viewerIds?.includes(user.id)

                  return (
                    <button
                      key={user.id}
                      type="button"
                      onClick={() => {
                        const updated = already
                          ? viewerIds.filter((id: string) => id !== user.id)
                          : [...(viewerIds ?? []), user.id]
                        setValue('viewerIds', updated)
                      }}
                      className={`flex items-center gap-2 px-2 py-1 rounded-md hover:bg-slate-100 ${
                        already ? 'bg-slate-100' : ''
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
                          {user.firstName ? user.firstName.charAt(0) : '?'}
                        </span>
                      )}
                      <span className="text-sm">
                        {user.firstName} {user.lastName}
                      </span>
                      {already && (
                        <X size={12} className="ml-auto text-indigo-600" />
                      )}
                    </button>
                  )
                })}
              </div>
            </PopoverContent>
          </Popover>
          <Button type="submit" className="w-full">Upload File</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
