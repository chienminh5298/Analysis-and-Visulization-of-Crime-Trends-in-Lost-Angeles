import React, { Fragment } from "react";
import styles from "@src/pages/dashboard/dashboard.module.scss";
import { useQuery } from "@tanstack/react-query";
import { fetchCaseNumberTrend } from "@src/http";
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const CaseNumberTrend = ({ coordinate }: { coordinate: { lat: number; lng: number } }) => {
    const {
        data: dataQuery,
        isFetching,
        isError,
    } = useQuery({
        queryKey: ["caseNumberTrend", coordinate],
        queryFn: () => fetchCaseNumberTrend(coordinate.lat, coordinate.lng),
        staleTime: 300000,
    });

    let skeleton = isFetching ? styles.skeleton : "";

    const data = [
        {
            month: "January",
            caseNums: 2400,
        },
        {
            month: "February",
            caseNums: 1398,
        },
        {
            month: "March",
            caseNums: 9800,
        },
        {
            month: "April",
            caseNums: 3908,
        },
        {
            month: "May",
            caseNums: 4800,
        },
        {
            month: "June",
            caseNums: 3800,
        },
        {
            month: "July",
            caseNums: 4300,
        },
    ];

    return (
        <ResponsiveContainer width="100%" height={150} className={skeleton}>
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <XAxis dataKey="month" stroke="#FFFFFF" />
                <YAxis />
                <Area type="monotone" dataKey="caseNums" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default CaseNumberTrend;
