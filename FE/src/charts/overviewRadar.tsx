import React from "react";
import { Legend, Line, LineChart, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const OverviewRadar = () => {
    const data = [
        {
            month: "January",
            male: 120,
            female: 110,
            x: 245,
        },
        {
            month: "February",
            male: 130,
            female: 115,
            x: 260,
        },
        {
            month: "March",
            male: 125,
            female: 120,
            x: 270,
        },
        {
            month: "April",
            male: 135,
            female: 125,
            x: 280,
        },
        {
            month: "May",
            male: 140,
            female: 130,
            x: 290,
        },
        {
            month: "June",
            male: 145,
            female: 135,
            x: 300,
        },
        {
            month: "July",
            male: 150,
            female: 140,
            x: 310,
        },
        {
            month: "August",
            male: 155,
            female: 145,
            x: 320,
        },
        {
            month: "September",
            male: 160,
            female: 150,
            x: 330,
        },
        {
            month: "October",
            male: 165,
            female: 155,
            x: 340,
        },
        {
            month: "November",
            male: 170,
            female: 160,
            x: 350,
        },
        {
            month: "December",
            male: 175,
            female: 165,
            x: 360,
        },
    ];
    

    return (
        <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="month" />
                {/* <YAxis /> */}
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="male" stroke="#8884d8" />
                <Line type="monotone" dataKey="female" stroke="#8884d8" />
                <Line type="monotone" dataKey="x" stroke="#81ca2d" />
            </LineChart>
            {/* <RadarChart outerRadius={90} data={data}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <Radar name="Male" dataKey="male" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Radar name="Female" dataKey="female" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                <Legend />
            </RadarChart> */}
        </ResponsiveContainer>
    );
};

export default OverviewRadar;
