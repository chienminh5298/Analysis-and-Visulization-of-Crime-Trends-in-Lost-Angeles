import axiosService from "../axiosService";

export const fetchOverviewRadar = async (lat: number, lng: number) => {
    const response = await axiosService.get(`/overviewRadar?lat=${lat}&lng=${lng}`);
    return response.data;

    //** Data expect */
    const data = [
        {
            subject: "Black",
            male: 120,
            female: 110,
        },
        {
            subject: "Hispanic",
            male: 98,
            female: 130,
        },
        {
            subject: "White",
            male: 86,
            female: 130,
        },
        {
            subject: "Asian",
            male: 99,
            female: 100,
        },
        {
            subject: "Unknown",
            male: 85,
            female: 90,
        },
    ];
};

export const fetchCaseNumberTrend = async (lat: number, lng: number) => {
    const response = await axiosService.get(`/caseNumberTrend?lat=${lat}&lng=${lng}`);
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

export const fetchCrimeType = async (lat: number, lng: number) => {
    const response = await axiosService.get(`/crimeType?lat=${lat}&lng=${lng}`);
    return response.data;

    //** Data expect */
    const data = {
        111: {
            crimeCode: 111,
            crimeTitle: "Trespassing",
            numCases: 5,
        },
        128: {
            crimeCode: 128,
            crimeTitle: "Public Disturbance",
            numCases: 7,
        },
    };
};

export const fetchCrimeList = async (lat: number, lng: number) => {
    const response = await axiosService.get(`/crimeList?lat=${lat}&lng=${lng}`);
    return response.data;

    //** Data expect */
    const data = [
        {
            caseId:1,
            crimeCode: 111,
            crimeTitle: "Trespassing",
            caseStatus: "AO",
        },
        {
            caseId:2,
            crimeCode: 131,
            crimeTitle: "Public Disturbance",
            caseStatus: "AO",
        },
    ]
};

export const fetchCrimeDetail = async (caseId:number) => {
    const response = await axiosService.get(`/crimeDetail?caseId=${caseId}`);
    return response.data

    //** Data expect */
    const data = {
        caseId: 1234567,
        happenedDate: "Monday, Feb 3rd, 2024",
        happenedTime: "12:30 AM",
        happenedLocation: "West Palm Beach",
        weaponUsed: "Knife",
        caseStatus: "IG", // IG = Investigate
        gender: "Male",
        crimeCode: 12345,
        age: 23,
        nation: "Black",
        happenedLat: "12.242432",
        happenedLng: "12.242432",
        weaponCode: 255,
    }
}
