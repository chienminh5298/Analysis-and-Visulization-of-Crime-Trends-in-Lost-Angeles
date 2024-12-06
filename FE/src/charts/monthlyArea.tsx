import React from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const MonthlyArea = () => {
    const data = [
        {
            name: "January",
            caseNums: 2400,
        },
        {
            name: "February",
            caseNums: 1398,
        },
        {
            name: "March",
            caseNums: 9800,
        },
        {
            name: "April",
            caseNums: 3908,
        },
        {
            name: "May",
            caseNums: 4800,
        },
        {
            name: "June",
            caseNums: 3800,
        },
        {
            name: "July",
            caseNums: 4300,
        },
    ];

    return (
        <ResponsiveContainer width="100%" height={150}>
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area type="monotone" dataKey="caseNums" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default MonthlyArea;
