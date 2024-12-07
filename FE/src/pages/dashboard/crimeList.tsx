import React, { Fragment } from "react";
import styles from "@src/pages/dashboard/dashboard.module.scss";
import CrimeDetail from "./crimeDetail";
import { useQuery } from "@tanstack/react-query";
import { fetchCrimeList } from "@src/http";

const CrimeList = ({ coordinate }: { coordinate: { lat: number; lng: number } }) => {
    const { data, isFetching, isError } = useQuery({
        queryKey: ["crimeList", coordinate],
        queryFn: () => fetchCrimeList(coordinate.lat, coordinate.lng),
        staleTime: 300000,
    });

    console.log(data)

    let skeleton = isFetching ? styles.skeleton : "";

    const renderSkeleton = isFetching && (
        <Fragment>
            <div className={skeleton}>
                <CrimeDetail />
            </div>
            <div className={skeleton}>
                <CrimeDetail />
            </div>
            <div className={skeleton}>
                <CrimeDetail />
            </div>
            <div className={skeleton}>
                <CrimeDetail />
            </div>
            <div className={skeleton}>
                <CrimeDetail />
            </div>
            <div className={skeleton}>
                <CrimeDetail />
            </div>
            <div className={skeleton}>
                <CrimeDetail />
            </div>
            <div className={skeleton}>
                <CrimeDetail />
            </div>
        </Fragment>
    );
    return (
        <div className={styles.crimeList}>
            <div className={styles.background}></div>
            <div className={styles.title}>
                <h1>Crime list</h1>
            </div>
            <div className={styles.body}>
                {isFetching && renderSkeleton}
                {!isFetching && (
                    <Fragment>
                        <CrimeDetail />
                        <CrimeDetail />
                        <CrimeDetail />
                        <CrimeDetail />
                        <CrimeDetail />
                        <CrimeDetail />
                        <CrimeDetail />
                        <CrimeDetail />
                        <CrimeDetail />
                        <CrimeDetail />
                        <CrimeDetail />
                        <CrimeDetail />
                        <CrimeDetail />
                        <CrimeDetail />
                        <CrimeDetail />
                        <CrimeDetail />
                        <CrimeDetail />
                        <CrimeDetail />
                        <CrimeDetail />
                        <CrimeDetail />
                    </Fragment>
                )}
            </div>
        </div>
    );
};

export default CrimeList;
