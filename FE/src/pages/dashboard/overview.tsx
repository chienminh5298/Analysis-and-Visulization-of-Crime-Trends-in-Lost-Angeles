import React, { useEffect } from "react";
import styles from "@src/pages/dashboard/dashboard.module.scss";
import OverviewRadar from "@src/charts/overviewRadar";
import { useQuery } from "@tanstack/react-query";
import { fetchOverviewRadar } from "@src/http";

const Overview = ({ coordinate }: { coordinate: { lat: number; lng: number } }) => {
    const { data, isFetching, isError } = useQuery({
        queryKey: ["overviewRadar", coordinate],
        queryFn: () => fetchOverviewRadar(coordinate.lat, coordinate.lng),
        staleTime: 300000,
    });

    let skeleton = isFetching ? styles.skeleton : "";

    return (
        <div className={styles.overview}>
            <h1>Overview</h1>
            <div className={`${styles.descent} ${skeleton}`}>
                <OverviewRadar />
            </div>
            <div className={styles.summary}>
                <h2>Detail</h2>
                <div className={styles.header}>
                    <div className={styles.row}>
                        <p>Total case:</p>
                        <strong className={skeleton}>2342</strong>
                    </div>
                </div>
                <div className={styles.body}>
                    <div className={styles.row}>
                        <p>Black:</p>
                        <p className={skeleton}>242</p>
                    </div>
                    <div className={styles.row}>
                        <p>Hispanic:</p>
                        <p className={skeleton}>242</p>
                    </div>
                    <div className={styles.row}>
                        <p>White:</p>
                        <p className={skeleton}>242</p>
                    </div>
                    <div className={styles.row}>
                        <p>Asian:</p>
                        <p className={skeleton}>242</p>
                    </div>
                    <div className={styles.row}>
                        <p>Unknown:</p>
                        <p className={skeleton}>242</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overview;
