import { useQuery } from "@tanstack/react-query";
import React from "react";
import styles from "@src/pages/dashboard/dashboard.module.scss";
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { fetchAge } from "../http";

const AgeChart = ({ coordinate }: { coordinate: { lat: number; lng: number } }) => {
    const {
        data: dataQuery,
        isFetching,
    } = useQuery({
        queryKey: ["ageChart", coordinate],
        queryFn: () => fetchAge(coordinate.lat, coordinate.lng),
        staleTime: 300000,
    });

    let skeleton = isFetching ? styles.skeleton : "";

    return (
        <ResponsiveContainer width="100%" height={250} className={skeleton}>
            <BarChart  data={dataQuery && dataQuery.data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="month" stroke="#FFFFFF" />
                <YAxis stroke="#FFFFFF" />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Bar  type="monotone" dataKey="age" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default AgeChart;
