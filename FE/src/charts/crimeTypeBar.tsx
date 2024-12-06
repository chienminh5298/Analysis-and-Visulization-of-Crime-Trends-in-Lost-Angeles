import React from "react";
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const CrimeTypeBar = () => {
    const data = [
        {
            month: "January",
            black: 300,
            asian: 327,
            hispanic: 44,
            white: 10,
            nativeAmerican: 185,
            other: 50,
        },
        {
            month: "February",
            black: 482,
            asian: 361,
            hispanic: 17,
            white: 31,
            nativeAmerican: 298,
            other: 24,
        },
        {
            month: "March",
            black: 396,
            asian: 347,
            hispanic: 36,
            white: 15,
            nativeAmerican: 199,
            other: 31,
        },
        {
            month: "April",
            black: 352,
            asian: 145,
            hispanic: 22,
            white: 17,
            nativeAmerican: 179,
            other: 14,
        },
        {
            month: "May",
            black: 357,
            asian: 210,
            hispanic: 16,
            white: 36,
            nativeAmerican: 284,
            other: 36,
        },
        {
            month: "June",
            black: 123,
            asian: 405,
            hispanic: 19,
            white: 27,
            nativeAmerican: 221,
            other: 49,
        },
        {
            month: "July",
            black: 275,
            asian: 183,
            hispanic: 20,
            white: 18,
            nativeAmerican: 233,
            other: 28,
        },
        {
            month: "August",
            black: 488,
            asian: 153,
            hispanic: 12,
            white: 40,
            nativeAmerican: 256,
            other: 39,
        },
        {
            month: "September",
            black: 189,
            asian: 267,
            hispanic: 25,
            white: 13,
            nativeAmerican: 287,
            other: 42,
        },
        {
            month: "October",
            black: 467,
            asian: 392,
            hispanic: 21,
            white: 22,
            nativeAmerican: 163,
            other: 33,
        },
        {
            month: "November",
            black: 412,
            asian: 252,
            hispanic: 13,
            white: 16,
            nativeAmerican: 276,
            other: 18,
        },
        {
            month: "December",
            black: 345,
            asian: 198,
            hispanic: 18,
            white: 11,
            nativeAmerican: 194,
            other: 44,
        },
    ];

    return (
        <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                {/* <YAxis /> */}
                <Tooltip
                    contentStyle={{
                        backgroundColor: "#ffffff87", // Change tooltip background color
                        border: "1px solid #ccc", // Optional: Add border
                        borderRadius: "5px", // Optional: Add rounded corners
                    }}
                />
                {/* <Legend /> */}
                <Line type="monotone" dataKey="black" stroke="#8884d8" />
                <Line type="monotone" dataKey="asian" stroke="#82ca9d" />
                <Line type="monotone" dataKey="hispanic" stroke="#82cffe" />
                <Line type="monotone" dataKey="white" stroke="#82c23d" />
                <Line type="monotone" dataKey="nativeAmerican" stroke="#822a9d" />
                <Line type="monotone" dataKey="other" stroke="#52ca9d" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default CrimeTypeBar;
