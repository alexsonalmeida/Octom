import { Calendar, EllipsisVertical, LayoutDashboard, PhoneCall, Plus } from "lucide-react";

export function Scheudle() {
    const avatars = [
        '/person-1.png',
        '/person-2.png',
        '/person-3.png'
    ];
    return(
        <div className="mb-7">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-lg">Today's Scheudle</h3>   
                <div className="flex bg-slate-100 gap-2 rounded-full px-3 py-2">
                    <LayoutDashboard size={14}/>
                    <Calendar size={14}/>
                </div>             
            </div>
            <div className="flex items-center justify-between text-blue-500 mb-2">
                <p className="text-xs">30 minute call with Client</p>
                <div className="flex items-center gap-1 text-xs">
                    <Plus size={12}/>
                    Invite
                </div>
            </div>
            <h3 className="font-semibold text-md mb-6">Project Discovery Call</h3>
            <div className="flex items-center justify-between bg-indigo-600 shadow-lg shadow-indigo-300 text-white rounded-md p-4">
                <div className=" flex space-x-0">
                    {avatars.map((src, index) => (
                        <div
                            key={index}
                            className={`rounded-full border-2 border-white bg-white flex items-center justify-center 
                                ${index !== 0 ? '-ml-3' : ''}`}
                        >
                            <img
                                src={src}
                                alt={`Avatar ${index}`}
                                className="w-6 h-6 rounded-full object-cover"
                            />
                        </div>
                    ))}
                </div>
                <p className="text-sm">28:35</p>
                <div className="flex items-center gap-2">
                    <PhoneCall size={18}/>
                    <EllipsisVertical size={18}/>
                </div>
            </div>
        </div>
    )
}