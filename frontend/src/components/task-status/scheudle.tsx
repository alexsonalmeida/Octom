import { Calendar, LayoutDashboard, Plus } from "lucide-react";

export function Scheudle() {
    return(
        <div >
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-md">Today's Scheudle</h3>   
                <div className="flex bg-slate-100 gap-2 rounded-full px-3 py-2">
                    <LayoutDashboard size={14}/>
                    <Calendar size={14}/>
                </div>             
            </div>
            <div className="flex items-center justify-between text-blue-500">
                <p className="text-xs">30 minute call with Client</p>
                <div className="flex items-center gap-1 text-xs">
                    <Plus size={12}/>
                    Invite
                </div>
            </div>
        </div>
    )
}