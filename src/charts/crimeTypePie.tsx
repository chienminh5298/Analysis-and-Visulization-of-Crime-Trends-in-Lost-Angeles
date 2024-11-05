import React from "react";
import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const CrimeTypePie = () => {
    const data01 = [
        { name: "101", value: 5, fill: "#3884d8" }, // Assign a unique color
        { name: "102", value: 1, fill: "#82ca9d" },
        { name: "128", value: 1, fill: "#ffc658" },
        { name: "203", value: 1, fill: "#d0ed57" },
        { name: "248", value: 1, fill: "#8dd1e1" },
        { name: "405", value: 1, fill: "#a4de6c" },
        { name: "501", value: 8, fill: "#ff7300" },
        { name: "502", value: 8, fill: "#8884d8" },
        { name: "750", value: 1, fill: "#83a6ed" },
        { name: "751", value: 1, fill: "#8e6ced" },
    ];

    const renderCustomLabel = ({ name, percent }: { name: any; percent: any }) => {
        return `${name}`; // Displays the 'name' on the chart
    };

    return (
        <ResponsiveContainer width="100%" height={250}>
            <PieChart width={730} height={250}>
                <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} label={renderCustomLabel} />
                <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} />
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default CrimeTypePie;
