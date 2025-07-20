'use client';
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format, parseISO } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

const resolutions = ["daily", "weekly", "monthly"] as const;

type Resolution = (typeof resolutions)[number];

export default function TaskChart() {
  const [resolution, setResolution] = useState<Resolution>("monthly");
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
        const fetchData = async () => {
        const to = new Date();
        to.setDate(to.getDate() + 1);
        const from = new Date();

        if (resolution === "daily") {
            from.setDate(to.getDate() - 13);
        } else if (resolution === "weekly") {
            from.setDate(to.getDate() - 7 * 8); 
        } else if (resolution === "monthly") {
            from.setMonth(to.getMonth() - 11);
        }

        const format = (date: Date) => date.toISOString();

        try {
            const response = await axios.get(
                `http://localhost:3333/task/cmbgqxz2300006zszwfd5sx27/completed-stats`,
                {
                    params: {
                        from: format(from),
                        to: format(to),
                        resolution,
                    },
                }
            );
            setChartData(response.data?.data || []);
            console.log("Dados do gráfico:", response.data);
        } catch (error) {
            console.error("Erro ao buscar dados do gráfico:", error);
        }
    };

    fetchData();
  }, [resolution]);

    const series = useMemo(
        () =>

        chartData.map(({ period, count }) => {
            const utcDate = parseISO(period);
            const zonedDate = toZonedTime(utcDate, 'America/Sao_Paulo');

            return {
                name:
                resolution === 'monthly'
                    ? format(zonedDate, 'MMM')
                    : resolution === 'weekly'
                    ? format(zonedDate, 'dd/MM')
                    : format(zonedDate, 'dd MMM'),
                value: count,
            };
        }),
        [chartData, resolution]
    );

  return (
    <div className="p-4 bg-white rounded-xl mb-4">
        <Tabs 
            value={resolution} 
            onValueChange={(val) => {
                if (resolutions.includes(val as Resolution)) {
                    setResolution(val as Resolution);
                }
            }}
        >
            <div className="flex justify-between mb-4">
                <h2 className="text-xl font-semibold">Task Done</h2>
                <TabsList>
                    <TabsTrigger value="daily">Daily</TabsTrigger>
                    <TabsTrigger value="weekly">Weekly</TabsTrigger>
                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                </TabsList>                
            </div>
            <TabsContent value={resolution}>
                <div className="h-[320px] w-[100%] ">
                    <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={series} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                        <defs>
                        <linearGradient id="areaColor" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25} />
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                        </defs>

                        <CartesianGrid
                            vertical={false}
                            strokeDasharray="3 3"
                            stroke="#e5e7eb" 
                        />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            padding={{ left: 20, right: 20 }}
                            tick={{ fontSize: 12, fill: '#64748b' }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: '#64748b' }}
                            domain={[0, 'auto']}
                        />
                        <Tooltip
                            cursor={{ opacity: 0.1 }}
                            contentStyle={{ border: 'none', borderRadius: 8 }}
                            labelStyle={{ fontWeight: 600 }}
                        />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#3b82f6"  
                            strokeWidth={3}
                            fill="url(#areaColor)"
                            dot={{ r: 4, strokeWidth: 2, stroke: '#fff' }}
                            activeDot={{ r: 5 }}
                        />
                    </AreaChart>
                    </ResponsiveContainer>
                </div>
            </TabsContent>
        </Tabs>
    </div>
  );
}
