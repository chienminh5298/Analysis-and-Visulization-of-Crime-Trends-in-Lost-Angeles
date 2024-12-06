import React from "react";
import styles from "@src/pages/detailCrime/detailCrime.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullseye, faCircleCheck, faCircleInfo, faGun, faIdCard, faInfo, faMars, faVenus } from "@fortawesome/free-solid-svg-icons";
import maleAvatar from "@src/asset/maleAvatar.webp";
import location from "@src/asset/location.png";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { GOOGLE_MAPS_API_KEY } from "@src/setting";
const detailCrime = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.frame}>
                <div className={styles.row1}>
                    <div className={styles.leftSide}>
                        <div className={styles.overview}>
                            <div className={styles.topOverview}>
                                <h1>Crime Detail Page</h1>
                                <h3>Report No. #1234215125</h3>
                            </div>
                            <div className={styles.bottomOverview}>
                                <div className={styles.leftSideBottom}>
                                    <div className={styles.description}>
                                        <p>
                                            {" "}
                                            The incident occurred on <strong>Monday, February 3rd, 2024</strong>, at <strong>12:30 AM</strong> with authorities actively seeking information and reviewing evidence to identify and apprehend the suspect.{" "}
                                        </p>
                                    </div>
                                    <div className={styles.crimeType}>
                                        <div className={styles.typeWrapper}>
                                             {/** If weapon used -> extremly else -> serious */}
                                            <p className={styles.checked}>Extremly Serious</p>
                                            <p>Serious</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.rightSideBottom}>
                                    <div className={styles.sexWrapper}>
                                        <div className={styles.sexDetailWrapper}>
                                            <div className={`${styles.sexIconWrapper} ${styles.active}`}>
                                                <FontAwesomeIcon icon={faMars} className={`${styles.sex} ${styles.male}`} />
                                            </div>
                                            <p>Male</p>
                                        </div>
                                        <div className={styles.sexDetailWrapper}>
                                            <div className={`${styles.sexIconWrapper}`}>
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
                                            Age: <strong>23</strong>
                                        </p>
                                    </div>
                                    <div className={styles.row}>
                                        <p>
                                            Gender: <strong>Male</strong> <FontAwesomeIcon icon={faMars} className={styles.icon} />
                                        </p>
                                    </div>
                                    <div className={styles.row}>
                                        <p>
                                            Nation: <strong>Black</strong>
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
                                            <strong>12.321.4242</strong>
                                        </div>
                                        <div className={styles.row}>
                                            <p>Longtitue:</p>
                                            <strong>12.321.4242</strong>
                                        </div>
                                    </div>
                                    <div className={styles.image}>
                                        <img src={location} alt="Location" />
                                    </div>
                                </div>

                            </div>
                            <div className={styles.bottomSide}>
                                <h3>WEAPON CODE</h3>
                                <div className={styles.codeWrapper}>
                                    <h1>255</h1>
          
                                </div>
                                <h1 className={styles.isWeaponUsed}>WEAPON USED</h1>
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
                                            Latitue: <strong>12.242.232</strong>
                                        </p>
                                        <p>
                                            Longtitue: <strong>12.242.232</strong>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.body}>
                                <div className={styles.map}>
                                    <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
                                        <Map style={{ width: "100%", height: "50vh" }} defaultCenter={{ lat: 22.54992, lng: 0 }} defaultZoom={6} gestureHandling={"greedy"} disableDefaultUI={true}>
                                            <Marker position={{ lat: 22.54992, lng: 0 }} />
                                        </Map>
                                    </APIProvider>
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
