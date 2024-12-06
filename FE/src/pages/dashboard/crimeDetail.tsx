import React from "react";
import styles from "@src/pages/dashboard/dashboard.module.scss";

const CrimeDetail = () => {
    return (
        <div className={styles.crimeDetail}>
            <div className={styles.code}>500</div>
            <div className={styles.describe}>THEFT OF IDENTITY</div>
            <div className={styles.status}>AO</div>
        </div>
    );
};

export default CrimeDetail;
