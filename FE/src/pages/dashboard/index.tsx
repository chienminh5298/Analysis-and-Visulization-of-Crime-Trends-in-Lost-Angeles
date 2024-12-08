import { Fragment, useCallback, useEffect, useState } from "react";
import styles from "@src/pages/dashboard/dashboard.module.scss";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { GOOGLE_MAPS_API_KEY } from "@src/setting";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import lineChart from "@src/asset/linechart.png";

import Heatmap from "./heatmap";
import { FeatureCollection, Point, GeoJsonProperties } from "geojson";
import CaseNumberTrend from "./caseNumberTrend";
import CrimeList from "./crimeList";
import AgeChart from "@src/charts/ageChart";
import GenderChart from "@src/charts/genderChart";
import WeaponChart from "@src/charts/weaponChart";
import RaceChart from "@src/charts/raceChart";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchHeatmap, getYear } from "@src/http";

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
    const year = getYear()
    const { data: dataQuery, isFetching } = useQuery({
        queryKey: ["heatmap", year],
        queryFn: () => fetchHeatmap(),
        staleTime: 300000,
    });

    console.log(dataQuery)
    const [center, setCenter] = useState(INITIAL_CENTER);
    const [imediatelyCenter, setImediatelyCenter] = useState(INITIAL_CENTER);
    const crimeData: FeatureCollection<Point, GeoJsonProperties> = {
        type: "FeatureCollection",
        features: [
            { type: "Feature", geometry: { type: "Point", coordinates: [-118.243683, 34.052235] }, properties: { mag: 3.0 } }, // Downtown LA
            { type: "Feature", geometry: { type: "Point", coordinates: [-118.281693, 34.020161] }, properties: { mag: 2.5 } }, // West Adams
            { type: "Feature", geometry: { type: "Point", coordinates: [-118.395233, 33.994881] }, properties: { mag: 4.0 } }, // Marina Del Rey
            { type: "Feature", geometry: { type: "Point", coordinates: [-118.328661, 34.092809] }, properties: { mag: 2.0 } }, // Hollywood
            { type: "Feature", geometry: { type: "Point", coordinates: [-118.406837, 34.069339] }, properties: { mag: 1.8 } }, // Bel Air
            { type: "Feature", geometry: { type: "Point", coordinates: [-118.256775, 34.040713] }, properties: { mag: 3.8 } }, // Arts District
            { type: "Feature", geometry: { type: "Point", coordinates: [-118.289098, 34.029542] }, properties: { mag: 2.9 } }, // University Park
            { type: "Feature", geometry: { type: "Point", coordinates: [-118.451357, 34.068921] }, properties: { mag: 3.5 } }, // UCLA
            { type: "Feature", geometry: { type: "Point", coordinates: [-118.472736, 34.009242] }, properties: { mag: 2.7 } }, // Santa Monica Pier
            { type: "Feature", geometry: { type: "Point", coordinates: [-118.248403, 34.056218] }, properties: { mag: 3.2 } }, // Walt Disney Concert Hall
            { type: "Feature", geometry: { type: "Point", coordinates: [-118.340628, 34.100157] }, properties: { mag: 4.0 } }, // Griffith Observatory
            { type: "Feature", geometry: { type: "Point", coordinates: [-118.337654, 34.134115] }, properties: { mag: 3.1 } }, // LA Zoo
            { type: "Feature", geometry: { type: "Point", coordinates: [-118.296046, 34.181717] }, properties: { mag: 3.6 } }, // Burbank Airport
            { type: "Feature", geometry: { type: "Point", coordinates: [-118.466472, 33.985047] }, properties: { mag: 3.8 } }, // Venice Beach
            { type: "Feature", geometry: { type: "Point", coordinates: [-118.451357, 34.066687] }, properties: { mag: 4.2 } }, // Getty Center
            { type: "Feature", geometry: { type: "Point", coordinates: [-118.288418, 34.067458] }, properties: { mag: 2.4 } }, // Koreatown
            { type: "Feature", geometry: { type: "Point", coordinates: [-118.272537, 34.063536] }, properties: { mag: 3.0 } }, // Echo Park
            { type: "Feature", geometry: { type: "Point", coordinates: [-118.284512, 34.118434] }, properties: { mag: 3.7 } }, // Los Feliz
            { type: "Feature", geometry: { type: "Point", coordinates: [-118.44312, 34.052362] }, properties: { mag: 4.5 } }, // Westwood Village
            { type: "Feature", geometry: { type: "Point", coordinates: [-118.25375, 34.064073] }, properties: { mag: 3.1 } }, // Chinatown
            { type: "Feature", geometry: { type: "Point", coordinates: [-118.377243, 34.07092] }, properties: { mag: 2.9 } }, // Century City
            { type: "Feature", geometry: { type: "Point", coordinates: [-118.333237, 34.069227] }, properties: { mag: 2.8 } }, // Beverly Grove
            { type: "Feature", geometry: { type: "Point", coordinates: [-118.352039, 34.052339] }, properties: { mag: 3.4 } }, // Mid-Wilshire
            { type: "Feature", geometry: { type: "Point", coordinates: [-118.321548, 34.066577] }, properties: { mag: 3.5 } }, // Fairfax
            { type: "Feature", geometry: { type: "Point", coordinates: [-118.452057, 34.03698] }, properties: { mag: 4.1 } }, // Palms
            { type: "Feature", geometry: { type: "Point", coordinates: [-118.487198, 33.970452] }, properties: { mag: 3.3 } }, // Playa Del Rey
            { type: "Feature", geometry: { type: "Point", coordinates: [-118.429227, 34.031678] }, properties: { mag: 2.6 } }, // Culver City
            { type: "Feature", geometry: { type: "Point", coordinates: [-118.256558, 34.048672] }, properties: { mag: 3.8 } }, // Little Tokyo
            { type: "Feature", geometry: { type: "Point", coordinates: [-118.281735, 34.072086] }, properties: { mag: 3.0 } }, // MacArthur Park
            { type: "Feature", geometry: { type: "Point", coordinates: [-118.250394, 34.042849] }, properties: { mag: 3.6 } }, // Fashion District
        ],
    };
    const [chartSelection, setChartSelection] = useState("age");

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

    const queryClient = useQueryClient();

    const submitCoordinate = (e: any) => {
        e.preventDefault();
        const location = e.target;
        const year = parseFloat(location[0].value); // Convert to number

        // Verify if the inputs are valid coordinates
        if (verifyInput(year)) {
            sessionStorage.setItem("year", year.toString());
            alert("Update year success, you can move map!");
            queryClient.invalidateQueries(["ageChart", "genderChart", "raceChart", "weaponChart", "crimeList", "caseNumberTrend"]);
        } else {
            alert("Please enter valid year between 2020 to 2024.");
        }
    };

    let renderChart = <Fragment></Fragment>;
    switch (chartSelection) {
        case "gender":
            renderChart = <GenderChart coordinate={center} />;
            break;
        case "case":
            renderChart = <CaseNumberTrend coordinate={center} />;
            break;
        case "weapon":
            renderChart = <WeaponChart coordinate={center} />;
            break;
        case "race":
            renderChart = <RaceChart coordinate={center} />;
            break;
        default:
            renderChart = <AgeChart coordinate={center} />;
            break;
    }

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
                        <div className={styles.topleft}>
                            <form className={styles.searchByCoordinates} onSubmit={submitCoordinate}>
                                <div className={styles.inputWrapper}>
                                    <input id="year" type="text" name="lat" placeholder="Year 2020 - 2024" />
                                </div>
                                <div className={styles.search}>
                                    <button type="submit">
                                        <FontAwesomeIcon icon={faSearch} className={styles.icon} />
                                        Set year
                                    </button>
                                </div>
                            </form>
                            <div className={styles.overview}>
                                <h1>Chart collection</h1>
                                <div className={`${styles.descent}`}>
                                    <div className={`${styles.chart} ${chartSelection === "age" && styles.selected}`} onClick={() => setChartSelection("age")}>
                                        <div className={styles.background}>
                                            <img src={lineChart} alt="background" />
                                        </div>
                                        <h2>By age</h2>
                                    </div>
                                    <div className={`${styles.chart} ${chartSelection === "gender" && styles.selected}`} onClick={() => setChartSelection("gender")}>
                                        <div className={styles.background}>
                                            <img src={lineChart} alt="background" />
                                        </div>
                                        <h2>By gender</h2>
                                    </div>
                                    <div className={`${styles.chart} ${chartSelection === "weapon" && styles.selected}`} onClick={() => setChartSelection("weapon")}>
                                        <div className={styles.background}>
                                            <img src={lineChart} alt="background" />
                                        </div>
                                        <h2>By weapon</h2>
                                    </div>
                                    <div className={`${styles.chart} ${chartSelection === "race" && styles.selected}`} onClick={() => setChartSelection("race")}>
                                        <div className={styles.background}>
                                            <img src={lineChart} alt="background" />
                                        </div>
                                        <h2>By Race</h2>
                                    </div>
                                    <div className={`${styles.chart} ${chartSelection === "case" && styles.selected}`} onClick={() => setChartSelection("case")}>
                                        <div className={styles.background}>
                                            <img src={lineChart} alt="background" />
                                        </div>
                                        <h2>By cases number</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.topright}>
                            <div className={styles.title}>
                                <h1>Analysis and Visulization of Crime Trends in Lost Angeles</h1>
                            </div>
                        </div>
                    </div>
                    <div className={styles.bottom}>
                        <div className={styles.background}></div>
                        {renderChart}
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
