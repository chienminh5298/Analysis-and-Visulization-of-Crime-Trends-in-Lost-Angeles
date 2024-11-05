import React from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const CrimeTypeBar = () => {
    const data = [
        { name: "101", cases: 5 },
        { name: "102", cases: 1 },
        { name: "128", cases: 1 },
        { name: "203", cases: 1 },
        { name: "248", cases: 1 },
        { name: "405", cases: 1 },
        { name: "501", cases: 8 },
        { name: "502", cases: 8 },
        { name: "750", cases: 1 },
        { name: "751", cases: 1 },
    ];

    return (
        <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fill: "white" }} />
                <YAxis tick={{ fill: "white" }} />
                <Bar dataKey="cases" fill="#82ca9d" />
                <Tooltip />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default CrimeTypeBar;
