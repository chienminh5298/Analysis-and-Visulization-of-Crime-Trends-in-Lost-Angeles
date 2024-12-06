import React from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { fetchWeapon } from "../http";
import { useQuery } from "@tanstack/react-query";
import styles from "@src/pages/dashboard/dashboard.module.scss";

const WeaponChart = ({ coordinate }: { coordinate: { lat: number; lng: number } }) => {
    const {
        data: dataQuery,
        isFetching,
        isError,
    } = useQuery({
        queryKey: ["weaponChart", coordinate],
        queryFn: () => fetchWeapon(coordinate.lat, coordinate.lng),
        staleTime: 300000,
    });

    let skeleton = isFetching ? styles.skeleton : "";
    const data = [
        {
            month: "January",
            weapon: 24,
            noWeapon: 40,
        },
        {
            month: "February",
            weapon: 28,
            noWeapon: 35,
        },
        {
            month: "March",
            weapon: 22,
            noWeapon: 38,
        },
        {
            month: "April",
            weapon: 26,
            noWeapon: 42,
        },
        {
            month: "May",
            weapon: 30,
            noWeapon: 36,
        },
        {
            month: "June",
            weapon: 35,
            noWeapon: 40,
        },
        {
            month: "July",
            weapon: 38,
            noWeapon: 34,
        },
        {
            month: "August",
            weapon: 40,
            noWeapon: 30,
        },
        {
            month: "September",
            weapon: 34,
            noWeapon: 38,
        },
        {
            month: "October",
            weapon: 32,
            noWeapon: 35,
        },
        {
            month: "November",
            weapon: 28,
            noWeapon: 36,
        },
        {
            month: "December",
            weapon: 26,
            noWeapon: 38,
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
                <Line type="monotone" dataKey="weapon" stroke="#2384d8" />
                <Line type="monotone" dataKey="noWeapon" stroke="#81ca2d" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default WeaponChart;
