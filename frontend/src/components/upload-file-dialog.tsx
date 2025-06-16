'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Select, SelectTrigger, SelectItem, SelectContent, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Link } from 'lucide-react'

interface Folder {
  id: string
  name: string
}

interface User {
  id: string
  firstName: string
  lastName: string
}

export function UploadFileDialog() {
  const [folders, setFolders] = useState<Folder[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [open, setOpen] = useState(false)
  const { register, handleSubmit, setValue, watch } = useForm()

  const folderId = watch('folderId')
  const viewerIds = watch('viewerIds')

  useEffect(() => {
    axios.get('/folders').then(res => setFolders(res.data))
    axios.get('/team-members').then(res => setUsers(res.data))
  }, [])

  async function onSubmit(data: any) {
    const formData = new FormData()
    formData.append('file', data.file[0])
    formData.append('folderId', data.folderId)
    viewerIds?.forEach((id: string) => formData.append('viewerIds[]', id))

    await axios.post('/files/upload', formData)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center rounded-full border border-slate-300 text-sm text-slate-600 gap-2 py-3 px-4 cursor-pointer hover:bg-slate-200 transition-colors">
            <Link size={14} />
            Upload
        </button>
      </DialogTrigger>
      <DialogContent>
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

          <label className="block text-sm font-medium">Select Viewers</label>
          <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
            {users.map(user => (
              <label key={user.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={user.id}
                  onChange={(e) => {
                    const checked = e.target.checked
                    const current = viewerIds ?? []
                    const updated = checked
                      ? [...current, e.target.value]
                      : current.filter((id: string) => id !== e.target.value)
                    setValue('viewerIds', updated)
                  }}
                />
                {user.firstName} {user.lastName}
              </label>
            ))}
          </div>

          <Button type="submit" className="w-full">Upload File</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
