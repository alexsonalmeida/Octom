'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UploadCloud } from 'lucide-react';
import api from '@/lib/axios';

const USER_ID = 'cmbgqxz2300006zszwfd5sx27';

export default function Settings() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get(`/user/${USER_ID}`);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setEmail(data.email);
        setRole(data.role);
        setPreviewUrl(data.profilePicture || '/default-avatar.png');
      } catch (err) {
        console.error('Erro ao carregar usuário:', err);
      }
    };

    fetchUser();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePicture(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('email', email);
      if (profilePicture) {
        formData.append('file', profilePicture);
      }

      await api.patch(`/user/${USER_ID}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

    } catch (err) {
      console.error('Erro ao atualizar perfil:', err);
      alert('Erro ao atualizar perfil');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 space-y-8"
    >
      {/* Avatar + Título */}
        <img 
            src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="foto de capa" 
            className='w-full h-48'
        />
      <div className="relative flex items-center gap-6">
        <img
          src={previewUrl ?? '/default-avatar.png'}
          alt="avatar"
          className="w-24 h-24 rounded-full object-cover ring-4 ring-white shadow-md -mt-16 z-10 relative"
        />
        <h2 className="text-3xl font-bold text-gray-800 absolute left-28 bottom-3">Settings</h2>
      </div>

      {/* Campos de detalhes */}
      <div className="border-t pt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First name</label>
            <Input value={firstName} onChange={e => setFirstName(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last name</label>
            <Input value={lastName} onChange={e => setLastName(e.target.value)} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <Input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </div>

        {/* Upload separado */}
        <div className="border border-dashed border-gray-300 rounded-md p-6 text-center">
          <label
            htmlFor="profilePicture"
            className="cursor-pointer flex flex-col items-center gap-2 text-sm text-indigo-500 hover:underline"
          >
            <UploadCloud size={24} />
            <span>Click to upload or drag and drop</span>
            <span className="text-xs text-gray-500">(SVG, PNG, JPG or GIF - max 5MB)</span>
            <input
              id="profilePicture"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
          <Input value={role} disabled className="bg-gray-100 cursor-not-allowed" />
        </div>
      </div>

      {/* Botões */}
      <div className="flex gap-3">
        <Button type="button" variant="outline">Cancel</Button>
        <Button type="submit" className='bg-indigo-500'>Save</Button>
      </div>
    </form>
  );

}