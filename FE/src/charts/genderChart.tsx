import React from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import styles from "@src/pages/dashboard/dashboard.module.scss";
import { useQuery } from "@tanstack/react-query";
import { fetchAge, fetchGender } from "../http";

const GenderChart = ({ coordinate }: { coordinate: { lat: number; lng: number } }) => {
    const {
        data: dataQuery,
        isFetching,
        isError,
    } = useQuery({
        queryKey: ["genderChart", coordinate],
        queryFn: () => fetchGender(coordinate.lat, coordinate.lng),
        staleTime: 300000,
    });

    let skeleton = isFetching ? styles.skeleton : "";

    return (
        <ResponsiveContainer width="100%" height={250} className={skeleton}>
            <LineChart data={dataQuery && dataQuery.data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="month" stroke="#FFFFFF" />
                <YAxis stroke="#FFFFFF" />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="male" stroke="#8884d8" />
                <Line type="monotone" dataKey="female" stroke="#2384d8" />
                <Line type="monotone" dataKey="x" stroke="#81ca2d" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default GenderChart;
