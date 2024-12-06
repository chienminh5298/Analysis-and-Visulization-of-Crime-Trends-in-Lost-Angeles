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
        <ResponsiveContainer width="100%" height={250} className={skeleton}>
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
