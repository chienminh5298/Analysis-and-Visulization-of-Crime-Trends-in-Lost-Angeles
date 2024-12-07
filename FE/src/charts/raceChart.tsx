import React from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import styles from "@src/pages/dashboard/dashboard.module.scss";
import { useQuery } from "@tanstack/react-query";
import { fetchRace } from "../http";

const RaceChart = ({ coordinate }: { coordinate: { lat: number; lng: number } }) => {
    const {
        data: dataQuery,
        isFetching,
    } = useQuery({
        queryKey: ["raceChart", coordinate],
        queryFn: () => fetchRace(coordinate.lat, coordinate.lng),
        staleTime: 300000,
    });

    let skeleton = isFetching ? styles.skeleton : "";

    return (
        <ResponsiveContainer width="100%" height={250} className={skeleton}>
            <LineChart data={dataQuery && dataQuery.data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#FFFFFF" />
                <XAxis dataKey="month" stroke="#FFFFFF" />
                <YAxis />
                <Tooltip
                    contentStyle={{
                        backgroundColor: "#ffffff", // Change tooltip background color
                        border: "1px solid #ccc", // Optional: Add border
                        borderRadius: "5px", // Optional: Add rounded corners
                    }}
                />
                <Legend />
                <Line type="monotone" dataKey="black" stroke="#8884d8" />
                <Line type="monotone" dataKey="asian" stroke="#82ca9d" />
                <Line type="monotone" dataKey="hispanic" stroke="#82cffe" />
                <Line type="monotone" dataKey="white" stroke="#82c23d" />
                <Line type="monotone" dataKey="nativeAmerican" stroke="#222a9d" />
                <Line type="monotone" dataKey="other" stroke="#52ca9d" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default RaceChart;
