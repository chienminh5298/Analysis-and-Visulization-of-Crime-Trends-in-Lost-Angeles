import { useQuery } from "@tanstack/react-query";
import React from "react";
import styles from "@src/pages/dashboard/dashboard.module.scss";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { fetchAge } from "../http";

const AgeChart = ({ coordinate }: { coordinate: { lat: number; lng: number } }) => {
    const {
        data: dataQuery,
        isFetching,
        isError,
    } = useQuery({
        queryKey: ["ageChart", coordinate],
        queryFn: () => fetchAge(coordinate.lat, coordinate.lng),
        staleTime: 300000,
    });

    let skeleton = isFetching ? styles.skeleton : "";

    const data = [
        {
            month: "January",
            "20-30": 24,
            "30-40": 30,
            ">40": 20,
        },
        {
            month: "February",
            "20-30": 28,
            "30-40": 35,
            ">40": 25,
        },
        {
            month: "March",
            "20-30": 22,
            "30-40": 25,
            ">40": 18,
        },
        {
            month: "April",
            "20-30": 26,
            "30-40": 32,
            ">40": 22,
        },
        {
            month: "May",
            "20-30": 30,
            "30-40": 28,
            ">40": 24,
        },
        {
            month: "June",
            "20-30": 35,
            "30-40": 33,
            ">40": 27,
        },
        {
            month: "July",
            "20-30": 40,
            "30-40": 36,
            ">40": 30,
        },
        {
            month: "August",
            "20-30": 38,
            "30-40": 34,
            ">40": 28,
        },
        {
            month: "September",
            "20-30": 32,
            "30-40": 29,
            ">40": 26,
        },
        {
            month: "October",
            "20-30": 36,
            "30-40": 32,
            ">40": 30,
        },
        {
            month: "November",
            "20-30": 28,
            "30-40": 26,
            ">40": 22,
        },
        {
            month: "December",
            "20-30": 30,
            "30-40": 28,
            ">40": 24,
        },
    ];

    return (
        <ResponsiveContainer width="100%" height={250} className={skeleton}>
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="month" stroke="#FFFFFF" />
                <YAxis stroke="#FFFFFF" />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="20-30" stroke="#8884d8" />
                <Line type="monotone" dataKey="30-40" stroke="#2384d8" />
                <Line type="monotone" dataKey=">40" stroke="#81ca2d" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default AgeChart;
