import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { cn } from "@/lib/utils";

type TaskStatusProps = {
    icon?: React.ReactNode;
    title: string;
    values: number[];
}

export function TaskStatus({ icon, title, values }: TaskStatusProps) {
    const current = values[2] ?? 0;
    const previous = values[1] ?? 0;
    const diff = current - previous;

    const diffText =
        diff === 0
            ? "No change"
            : diff > 0
            ? `+${diff} more from last week`
            : `${Math.abs(diff)} less than last week`;

    const diffColor = diff > 0 ? "text-green-600" : diff < 0 ? "text-red-600" : "text-slate-400";

    const data = [
        { name: '2w ago', value: values[0] ?? 0 },
        { name: '1w ago', value: values[1] ?? 0 },
        { name: 'This week', value: values[2] ?? 0 },
    ];
    return (
        <div className="bg-white rounded-lg p-4 w-full max-w-72">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center p-2 bg-slate-100 text-slate-400 rounded-full">
                    {icon}
                </div>
                <h4 className="text-sm text-slate-400 font-medium">{title}</h4>
                <p className="text-xl text-slate-600">{values[2]}</p>
            </div>

            <hr className="my-2"/>

            <div className='flex items-baseline justify-between'>
                <ResponsiveContainer width="60%" height={80}>
                    <LineChart data={data}>
                        <XAxis dataKey="name" hide />
                        <YAxis hide domain={['auto', 'auto']} />
                        <Tooltip content={() => null} />
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#6366f1"
                            strokeWidth={3}
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>

                <p className={cn("text-xs text-right", diffColor)}>
                    {diffText}
                </p>
            </div>


        </div>
    );
}