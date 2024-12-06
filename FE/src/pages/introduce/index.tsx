import React from "react";
import styles from "@src/pages/introduce/introduce.module.scss";
import { Link } from "react-router-dom";

const Introduce = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <h1>ANALYSIS AND VISUALIZATION</h1>
                <h1>OF CRIME TRENDS IN LOS ANGELES</h1>
                <h3>CIS4301 Group 30</h3>
                <ul>
                    <li>Loubna Benchakouk </li>
                    <li>Lynn Chen</li>
                    <li>Minh Nguyen</li>
                    <li>Daniel Lai</li>
                </ul>
            </div>
            <div className={styles.skip}>
                <Link to="/dashboard">Skip intro</Link>
            </div>
            <div className={styles.flashLight}></div>
        </div>
    );
};

export default Introduce;
