import React, { Fragment } from "react";
import styles from "@src/pages/dashboard/dashboard.module.scss";
import CrimeTypeBar from "@src/charts/crimeTypeBar";
import CrimeTypePie from "@src/charts/crimeTypePie";
import { useQuery } from "@tanstack/react-query";
import { fetchCrimeType } from "@src/http";

const CrimeType = ({ coordinate }: { coordinate: { lat: number; lng: number } }) => {
    const { data, isFetching, isError } = useQuery({
        queryKey: ["crimeType", coordinate],
        queryFn: () => fetchCrimeType(coordinate.lat, coordinate.lng),
        staleTime: 300000,
    });

    let skeleton = isFetching ? styles.skeleton : "";

    return (
        <div className={styles.crimeTypeTitle}>
            <h1>Crime type</h1>
            <div className={styles.chartWrapper}>
                <div className={styles.leftChart}>
                    <div className={`${styles.chart} ${skeleton}`}>
                        <CrimeTypeBar />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CrimeType;
