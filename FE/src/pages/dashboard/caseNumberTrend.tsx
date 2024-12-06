import React, { Fragment } from "react";
import styles from "@src/pages/dashboard/dashboard.module.scss";
import MonthlyArea from "@src/charts/monthlyArea";
import { useQuery } from "@tanstack/react-query";
import { fetchCaseNumberTrend } from "@src/http";

const CaseNumberTrend = ({ coordinate }: { coordinate: { lat: number; lng: number } }) => {
    const { data, isFetching, isError } = useQuery({
        queryKey: ["overviewRadar", coordinate],
        queryFn: () => fetchCaseNumberTrend(coordinate.lat, coordinate.lng),
        staleTime: 300000,
    });

    let skeleton = isFetching ? styles.skeleton : "";

    return (
        <Fragment>
            <div className={styles.header}>
                <h2>Cases number trend</h2>
                <p className={`${styles.normal} ${skeleton}`}>Normal</p>
            </div>
            <div className={`${styles.chart} ${skeleton}`}>
                <MonthlyArea />
            </div>
        </Fragment>
    );
};

export default CaseNumberTrend;
