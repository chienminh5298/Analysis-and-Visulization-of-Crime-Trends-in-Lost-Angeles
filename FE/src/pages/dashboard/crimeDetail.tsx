import React from "react";
import styles from "@src/pages/dashboard/dashboard.module.scss";
import { useNavigate } from "react-router-dom";

const CrimeDetail = ({ reportId }: { reportId: string }) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/detailCrime?reportId=${reportId}`);
    };
    return (
        <div className={styles.crimeDetail} onClick={handleNavigate}>
            <div className={styles.describe}>{reportId}</div>
        </div>
    );
};

export default CrimeDetail;
