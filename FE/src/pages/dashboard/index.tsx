import { useCallback, useEffect, useState } from "react";
import styles from "@src/pages/dashboard/dashboard.module.scss";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { GOOGLE_MAPS_API_KEY } from "@src/setting";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import Heatmap from "./heatmap";
import { FeatureCollection, Point, GeoJsonProperties } from "geojson";
import Overview from "./overview";
import CaseNumberTrend from "./caseNumberTrend";
import CrimeType from "./crimeType";
import CrimeList from "./crimeList";

const INITIAL_CENTER = { lat: 34.052235, lng: -118.243683 };
const verifyInput = (year: string): boolean => {
    try {
        const yr = parseInt(year);
        if (yr < 2020 || yr > 2024) {
            return false;
        } else {
            return true;
        }
    } catch {
        return false;
    }
};

const Dashboard = () => {
    const [center, setCenter] = useState(INITIAL_CENTER);
    const [imediatelyCenter, setImediatelyCenter] = useState(INITIAL_CENTER);
    const crimeData: FeatureCollection<Point, GeoJsonProperties> = {
        type: "FeatureCollection",
        features: [
            {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [-118.243683, 34.052235], // Los Angeles, Downtown
                },
                properties: {
                    mag: 3.0, // Crime severity/magnitude
                },
            },
            {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [-118.281693, 34.020161], // West Adams, Los Angeles
                },
                properties: {
                    mag: 2.5,
                },
            },
            {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [-118.395233, 33.994881], // Marina Del Rey, Los Angeles
                },
                properties: {
                    mag: 4.0,
                },
            },
            {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [-118.328661, 34.092809], // Hollywood, Los Angeles
                },
                properties: {
                    mag: 2.0,
                },
            },
            {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [-118.406837, 34.069339], // Bel Air, Los Angeles
                },
                properties: {
                    mag: 1.8,
                },
            },
            {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [-118.256775, 34.040713], // Arts District, Los Angeles
                },
                properties: {
                    mag: 3.8,
                },
            },
            {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [-118.289098, 34.029542], // University Park, Los Angeles
                },
                properties: {
                    mag: 2.9,
                },
            },
        ],
    };

    function debounce(func: any, timeout = 3000) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(this, args);
            }, timeout);
        };
    }

    const deboucedSetCenter = useCallback(debounce(setCenter, 1000), [setCenter]);

    const onBoundsChanged = useCallback(
        (map: any) => {
            if (map !== null) {
                const location = map.detail.center;
                setImediatelyCenter({
                    lat: location.lat,
                    lng: location.lng,
                });
                deboucedSetCenter({
                    lat: location.lat,
                    lng: location.lng,
                });
            }
        },
        [deboucedSetCenter]
    );

    const submitCoordinate = (e: any) => {
        e.preventDefault();
        const location = e.target;
        const year = parseFloat(location[0].value); // Convert to number

        // Verify if the inputs are valid coordinates
        if (verifyInput(year)) {
            sessionStorage.setItem("year", year.toString());
        } else {
            alert("Please enter valid year between 2020 to 2024.");
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.mapWrapper}>
                <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
                    <Map style={{ width: "100vw", height: "100vh" }} defaultCenter={center} defaultZoom={12} gestureHandling={"greedy"} disableDefaultUI={true} onBoundsChanged={(map) => onBoundsChanged(map)}>
                        <Heatmap geojson={crimeData} radius={20} opacity={0.6} />
                    </Map>
                </APIProvider>
            </div>
            <div className={styles.content}>
                <div className={styles.leftSide}>
                    <div className={styles.top}>
                        <form className={styles.searchByCoordinates} onSubmit={submitCoordinate}>
                            <div className={styles.inputWrapper}>
                                <input id="year" type="text" name="lat" placeholder="Year 2020 - 2024" />
                            </div>
                            <div className={styles.search}>
                                <button type="submit">
                                    <FontAwesomeIcon icon={faSearch} className={styles.icon} />
                                    Submit
                                </button>
                            </div>
                        </form>
                        <Overview coordinate={center} />
                    </div>
                    <div className={styles.bottom}>
                        <div className={styles.background}></div>
                        <CaseNumberTrend coordinate={center} />
                    </div>
                </div>
                <div className={styles.middleSide}>
                    <div className={styles.title}>
                        <h1>Analysis and Visulization of Crime Trends in Lost Angeles</h1>
                    </div>
                    <div className={styles.bottom}>
                        <div className={styles.upper}>
                            <div className={styles.background}></div>
                            <CrimeType coordinate={center} />
                        </div>
                    </div>
                </div>
                <div className={styles.rightSide}>
                    <div className={styles.coordinate}>
                        <div className={styles.coorWrapper}>
                            <div className={styles.background}></div>
                            <p>Latitue</p>
                            <strong>{parseFloat(imediatelyCenter.lat.toString()).toFixed(6)}</strong>
                        </div>
                        <div className={styles.coorWrapper}>
                            <div className={styles.background}></div>
                            <p>Longtitue</p>
                            <strong>{parseFloat(imediatelyCenter.lng.toString()).toFixed(6)}</strong>
                        </div>
                    </div>
                    <CrimeList coordinate={center} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
