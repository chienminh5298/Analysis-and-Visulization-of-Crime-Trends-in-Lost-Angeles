import React from "react";
import styles from "@src/pages/detailCrime/detailCrime.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullseye, faCircleCheck, faCircleInfo, faGun, faIdCard, faInfo, faMars, faVenus } from "@fortawesome/free-solid-svg-icons";
import maleAvatar from "@src/asset/maleAvatar.webp";
import location from "@src/asset/location.png";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { GOOGLE_MAPS_API_KEY } from "@src/setting";
import { useQuery } from "@tanstack/react-query";
import { fetchCrimeDetail } from "@src/http";

function formatDate(dateString: string) {
    const date = new Date(dateString);

    // Define arrays for weekday and month names
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // Get parts of the date
    const dayOfWeek = weekdays[date.getUTCDay()];
    const day = date.getUTCDate();
    const month = months[date.getUTCMonth()];
    const year = date.getUTCFullYear();

    // Add ordinal suffix to the day
    const suffix = (day) => {
        const lastDigit = day % 10;
        if (day >= 11 && day <= 13) return "th"; // Special case for 11th, 12th, 13th
        if (lastDigit === 1) return "st";
        if (lastDigit === 2) return "nd";
        if (lastDigit === 3) return "rd";
        return "th";
    };

    return `${dayOfWeek}, ${day}${suffix(day)} ${month} ${year}`;
}

// Example usage
const formattedDate = formatDate("2020-05-20T04:00:00.000Z");
console.log(formattedDate); // Output: "Wednesday, 20th May 2020"

const detailCrime = (reportId: string) => {
    const { data: dataQuery, isFetching } = useQuery({
        queryKey: ["crimeDetail", reportId],
        queryFn: () => fetchCrimeDetail("221607028"),
        staleTime: 300000,
    });

    return (
        <div className={styles.wrapper}>
            <div className={styles.frame}>
                <div className={styles.row1}>
                    <div className={styles.leftSide}>
                        <div className={styles.overview}>
                            <div className={styles.topOverview}>
                                <h1>Crime Detail Page</h1>
                                <h3>Report No. #{dataQuery && dataQuery.data.caseId}</h3>
                            </div>
                            <div className={styles.bottomOverview}>
                                <div className={styles.leftSideBottom}>
                                    <div className={styles.description}>
                                        <p>
                                            {" "}
                                            The incident occurred on <strong>{dataQuery && formatDate(dataQuery.data[0].happenedDate)}</strong>, at <strong>{dataQuery && dataQuery.data[0].happenedTime}</strong> with authorities actively seeking information and reviewing evidence to identify and apprehend the suspect.{" "}
                                        </p>
                                    </div>
                                    <div className={styles.crimeType}>
                                        <div className={styles.typeWrapper}>
                                            {/** If weapon used -> extremly else -> serious */}
                                            <p className={dataQuery && dataQuery.data[0].weaponCode !== null && styles.checked}>Extremly Serious</p>
                                            <p className={dataQuery && dataQuery.data[0].weaponCode == null && styles.checked}>Serious</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.rightSideBottom}>
                                    <div className={styles.sexWrapper}>
                                        <div className={styles.sexDetailWrapper}>
                                            <div className={`${styles.sexIconWrapper} ${dataQuery && dataQuery.data[0].gender === "Male" && styles.active}`}>
                                                <FontAwesomeIcon icon={faMars} className={`${styles.sex} ${styles.male}`} />
                                            </div>
                                            <p>Male</p>
                                        </div>
                                        <div className={styles.sexDetailWrapper}>
                                            <div className={`${styles.sexIconWrapper} ${dataQuery && dataQuery.data[0].gender === "Female" && styles.active}`}>
                                                <FontAwesomeIcon icon={faVenus} className={`${styles.sex} ${styles.female}`} />
                                            </div>
                                            <p>Female</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.rightSide}>
                        <div className={styles.crimeDetail}>
                            <div className={styles.header}>
                                <h1>Crime Detail</h1>
                                <FontAwesomeIcon icon={faBullseye} className={styles.icon} />
                            </div>
                            <div className={styles.body}>
                                <div className={styles.avatar}>
                                    <img src={maleAvatar} alt="avatar" />
                                </div>
                                <div className={styles.info}>
                                    <div className={styles.row}>
                                        <p>
                                            Age: <strong>{dataQuery && dataQuery.data[0].age}</strong>
                                        </p>
                                    </div>
                                    <div className={styles.row}>
                                        <p>
                                            Gender: <strong>{dataQuery && dataQuery.data[0].gender}</strong> {dataQuery && dataQuery.data[0].gender === "Male" ? <FontAwesomeIcon icon={faMars} className={styles.icon} /> : <FontAwesomeIcon icon={faVenus} className={styles.icon} />}
                                        </p>
                                    </div>
                                    <div className={styles.row}>
                                        <p>
                                            Nation: <strong>{dataQuery && dataQuery.data[0].nation}</strong>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.row2}>
                    <div className={styles.locationWrapper}>
                        <div className={styles.locationLeftSide}>
                            <div className={styles.topSide}>
                                <div className={styles.latLonWrapper}>
                                    <div className={styles.latLon}>
                                        <div className={styles.row}>
                                            <p>Latitue:</p>
                                            <strong>{dataQuery && dataQuery.data[0].happenedLat}</strong>
                                        </div>
                                        <div className={styles.row}>
                                            <p>Longtitue:</p>
                                            <strong>{dataQuery && dataQuery.data[0].happenedLon}</strong>
                                        </div>
                                    </div>
                                    <div className={styles.image}>
                                        <img src={location} alt="Location" />
                                    </div>
                                </div>
                            </div>
                            <div className={styles.bottomSide}>
                                <h3>WEAPON CODE</h3>
                                <div className={styles.codeWrapper}>{dataQuery && (dataQuery.data[0].weaponCode === null ? <h3> No weapon used</h3> : <h1>{dataQuery.data[0].weaponCode}</h1>)}</div>
                                {dataQuery && dataQuery.data[0].weaponCode !== null && <h1 className={styles.isWeaponUsed}>WEAPON USED</h1>}
                            </div>
                        </div>
                        <div className={styles.locationRightside}>
                            <div className={styles.header}>
                                <div className={styles.informationIcon}>
                                    <FontAwesomeIcon icon={faCircleInfo} className={styles.icon} />
                                </div>
                                <div className={styles.latLonWrapper}>
                                    <div className={styles.title}>
                                        <h1>Coordinates Information</h1>
                                    </div>
                                    <div className={styles.latLon}>
                                        <p>
                                            Latitue: <strong>{dataQuery && dataQuery.data[0].happenedLat}</strong>
                                        </p>
                                        <p>
                                            Longtitue: <strong>{dataQuery && dataQuery.data[0].happenedLon}</strong>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.body}>
                                <div className={styles.map}>
                                    {dataQuery && (
                                        <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
                                            <Map style={{ width: "100%", height: "50vh" }} defaultCenter={{ lat: dataQuery.data[0].happenedLat, lng: dataQuery.data[0].happenedLon }} defaultZoom={12} gestureHandling={"greedy"} disableDefaultUI={true}>
                                                <Marker position={{ lat: dataQuery.data[0].happenedLat, lng: dataQuery.data[0].happenedLon }} />
                                            </Map>
                                        </APIProvider>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default detailCrime;
