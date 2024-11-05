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

    let renderSkeleton = isFetching && (
        <Fragment>
            <div className={styles.row}>
                <p className={skeleton}>231:</p>
                <p className={skeleton}>Assault</p>
            </div>
            <div className={styles.row}>
                <p className={skeleton}>231:</p>
                <p className={skeleton}>Assault</p>
            </div>
            <div className={styles.row}>
                <p className={skeleton}>231:</p>
                <p className={skeleton}>Assault</p>
            </div>
            <div className={styles.row}>
                <p className={skeleton}>231:</p>
                <p className={skeleton}>Assault</p>
            </div>
            <div className={styles.row}>
                <p className={skeleton}>231:</p>
                <p className={skeleton}>Assault</p>
            </div>
            <div className={styles.row}>
                <p className={skeleton}>231:</p>
                <p className={skeleton}>Assault</p>
            </div>
            <div className={styles.row}>
                <p className={skeleton}>231:</p>
                <p className={skeleton}>Assault</p>
            </div>
            <div className={styles.row}>
                <p className={skeleton}>231:</p>
                <p className={skeleton}>Assault</p>
            </div>
            <div className={styles.row}>
                <p className={skeleton}>231:</p>
                <p className={skeleton}>Assault</p>
            </div>
        </Fragment>
    );

    let renderData = !isFetching && (
        <Fragment>
            <div className={styles.row}>
                <p>111:</p>
                <p>Grand Theft Auto</p>
            </div>
            <div className={styles.row}>
                <p>231:</p>
                <p>Assault</p>
            </div>
            <div className={styles.row}>
                <p>321:</p>
                <p>Robbery</p>
            </div>
            <div className={styles.row}>
                <p>542:</p>
                <p>Fraud</p>
            </div>
            <div className={styles.row}>
                <p>572:</p>
                <p>Trespassing</p>
            </div>
            <div className={styles.row}>
                <p>742:</p>
                <p>Public Disturbance</p>
            </div>
        </Fragment>
    );
    return (
        <div className={styles.crimeTypeTitle}>
            <h1>Crime type</h1>
            <div className={styles.chartWrapper}>
                <div className={styles.leftChart}>
                    <div className={`${styles.chart} ${skeleton}`}>
                        <CrimeTypeBar />
                    </div>
                    <div className={styles.explainCode}>
                        {renderSkeleton}
                        {renderData}
                    </div>
                </div>
                <div className={`${styles.rightChart} ${skeleton}`}>
                    <CrimeTypePie />
                </div>
            </div>
        </div>
    );
};

export default CrimeType;
