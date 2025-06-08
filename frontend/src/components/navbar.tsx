'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import api from "@/lib/axios"
import { ChevronDown } from "lucide-react"
import { useEffect, useState } from "react"

type User = {
  firstName: string
  lastName: string
  profilePicture?: string
}

export function NavBar() {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await api.get("user/cmbgqxz2300006zszwfd5sx27")
                setUser(response.data)
                console.log("Usuário buscado:", response.data)
            } catch (error) {
                console.error("Erro ao buscar usuário:", error)
            }
        }

        fetchUser()
    }, [])
    const initials = user ? `${user.firstName[0] || ""}${user.lastName[0] || ""}`.toUpperCase() : "US"

    return (
        <section className="bg-white flex sticky top-0 z-10 justify-end py-5 px-10">
            <div className="flex items-center gap-2">
                <Avatar className="w-10 h-10">
                    <AvatarImage src={user?.profilePicture || undefined}/>
                    <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <ChevronDown className="text-indigo-500"/>
            </div>
        </section>
    )
}