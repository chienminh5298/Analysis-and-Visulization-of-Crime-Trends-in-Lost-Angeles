import React from "react";
import { Legend, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from "recharts";

const OverviewRadar = () => {
    const data = [
        {
            subject: "Black",
            male: 120,
            female: 110,
        },
        {
            subject: "Hispanic",
            male: 98,
            female: 130,
        },
        {
            subject: "White",
            male: 86,
            female: 130,
        },
        {
            subject: "Asian",
            male: 99,
            female: 100,
        },
        {
            subject: "Unknown",
            male: 85,
            female: 90,
        },
    ];

    return (
        <ResponsiveContainer width="100%" height={250}>
            <RadarChart outerRadius={90} data={data}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <Radar name="Male" dataKey="male" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Radar name="Female" dataKey="female" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                <Legend />
            </RadarChart>
        </ResponsiveContainer>
    );
};

export default OverviewRadar;
