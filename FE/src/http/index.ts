import axiosService from "../axiosService";
import { BACKEND_URL } from "../setting";

const getYear = () => {
    let year = sessionStorage.getItem("year");
    return parseInt(year);
};

export const fetchGender = async (lat: number, lng: number) => {
    const year = getYear();
    const response = await axiosService.get(`${BACKEND_URL}/byGender?lat=${lat}&lng=${lng}&year=${year}`);
    return response.data;

    //** Data expect */
    const data = [
        {
            month: "January",
            male: 120,
            female: 110,
            x: 245,
        },
        {
            month: "February",
            male: 130,
            female: 115,
            x: 260,
        },
        {
            month: "March",
            male: 125,
            female: 120,
            x: 270,
        },
        {
            month: "April",
            male: 135,
            female: 125,
            x: 280,
        },
        {
            month: "May",
            male: 140,
            female: 130,
            x: 290,
        },
        {
            month: "June",
            male: 145,
            female: 135,
            x: 300,
        },
        {
            month: "July",
            male: 150,
            female: 140,
            x: 310,
        },
        {
            month: "August",
            male: 155,
            female: 145,
            x: 320,
        },
        {
            month: "September",
            male: 160,
            female: 150,
            x: 330,
        },
        {
            month: "October",
            male: 165,
            female: 155,
            x: 340,
        },
        {
            month: "November",
            male: 170,
            female: 160,
            x: 350,
        },
        {
            month: "December",
            male: 175,
            female: 165,
            x: 360,
        },
    ];
};

export const fetchAge = async (lat: number, lng: number) => {
    const year = getYear();
    const response = await axiosService.get(`${BACKEND_URL}/byAge?lat=${lat}&lng=${lng}&year=${year}`);
    return response.data;

    //** Data expect */
    const data = [
        {
            month: "January",
            age: 28,
        },
        {
            month: "January",
            age: 29,
        },
        {
            month: "January",
            age: 30,
        },
    ];
};

export const fetchWeapon = async (lat: number, lng: number) => {
    const year = getYear();
    const response = await axiosService.get(`${BACKEND_URL}/byWeapon?lat=${lat}&lng=${lng}&year=${year}`);
    return response.data;

    //** Data expect */
    const data = [
        {
            month: "January",
            weapon: 24,
            noWeapon: 40,
        },
        {
            month: "Febuarary",
            weapon: 24,
            noWeapon: 40,
        },
        {
            month: "March",
            weapon: 24,
            noWeapon: 40,
        },
    ];
};

export const fetchCaseNumberTrend = async (lat: number, lng: number) => {
    const year = getYear();
    const response = await axiosService.get(`${BACKEND_URL}/caseNumberTrend?lat=${lat}&lng=${lng}&year=${year}`);
    return response.data;

    const data = [
        {
            name: "January",
            caseNums: 2400,
        },
        {
            name: "February",
            caseNums: 1398,
        },
        {
            name: "March",
            caseNums: 9800,
        },
        {
            name: "April",
            caseNums: 3908,
        },
        {
            name: "May",
            caseNums: 4800,
        },
        {
            name: "June",
            caseNums: 3800,
        },
        {
            name: "July",
            caseNums: 4300,
        },
    ];
};

export const fetchRace = async (lat: number, lng: number) => {
    const year = getYear();
    const response = await axiosService.get(`${BACKEND_URL}/byRace?lat=${lat}&lng=${lng}&year=${year}`);
    return response.data;

    //** Data expect */
    const data = [
        {
            month: "January",
            black: 300,
            asian: 327,
            hispanic: 44,
            white: 10,
            nativeAmerican: 185,
            other: 50,
        },
        {
            month: "February",
            black: 482,
            asian: 361,
            hispanic: 17,
            white: 31,
            nativeAmerican: 298,
            other: 24,
        },
        {
            month: "March",
            black: 396,
            asian: 347,
            hispanic: 36,
            white: 15,
            nativeAmerican: 199,
            other: 31,
        },
        {
            month: "April",
            black: 352,
            asian: 145,
            hispanic: 22,
            white: 17,
            nativeAmerican: 179,
            other: 14,
        },
        {
            month: "May",
            black: 357,
            asian: 210,
            hispanic: 16,
            white: 36,
            nativeAmerican: 284,
            other: 36,
        },
        {
            month: "June",
            black: 123,
            asian: 405,
            hispanic: 19,
            white: 27,
            nativeAmerican: 221,
            other: 49,
        },
        {
            month: "July",
            black: 275,
            asian: 183,
            hispanic: 20,
            white: 18,
            nativeAmerican: 233,
            other: 28,
        },
        {
            month: "August",
            black: 488,
            asian: 153,
            hispanic: 12,
            white: 40,
            nativeAmerican: 256,
            other: 39,
        },
        {
            month: "September",
            black: 189,
            asian: 267,
            hispanic: 25,
            white: 13,
            nativeAmerican: 287,
            other: 42,
        },
        {
            month: "October",
            black: 467,
            asian: 392,
            hispanic: 21,
            white: 22,
            nativeAmerican: 163,
            other: 33,
        },
        {
            month: "November",
            black: 412,
            asian: 252,
            hispanic: 13,
            white: 16,
            nativeAmerican: 276,
            other: 18,
        },
        {
            month: "December",
            black: 345,
            asian: 198,
            hispanic: 18,
            white: 11,
            nativeAmerican: 194,
            other: 44,
        },
    ];
};

export const fetchCrimeList = async (lat: number, lng: number) => {
    const year = getYear();
    const response = await axiosService.get(`${BACKEND_URL}/crimeList?lat=${lat}&lng=${lng}&year=${year}`);
    return response.data;

    //** Data expect */
    const data = []; // Array of reports number
};

export const fetchCrimeDetail = async (caseId: number) => {
    const year = getYear();
    const response = await axiosService.get(`${BACKEND_URL}/crimeDetail?caseId=${caseId}`);
    return response.data;

    //** Data expect */
    const data = {
        caseId: 1234567, //report number
        happenedDate: "Monday, Feb 3rd, 2024",
        happenedTime: "12:30 AM",
        gender: "Male",
        age: 23,
        nation: "Black",
        happenedLat: "12.242432",
        happenedLng: "12.242432",
        weaponCode: 255,
    };
};
