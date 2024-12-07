import axiosService from "../axiosService";
import { BACKEND_URL } from "../setting";

const getYear = () => {
    let year = sessionStorage.getItem("year");
    return parseInt(year);
};

export const fetchGender = async (lat: number, lon: number) => {
    const year = getYear();
    const response = await axiosService.get(`${BACKEND_URL}/byGender?lat=${lat}&lon=${lon}&year=${year}`);
    return response.data;
};

export const fetchAge = async (lat: number, lon: number) => {
    const year = getYear();
    const response = await axiosService.get(`${BACKEND_URL}/byAge?lat=${lat}&lon=${lon}&year=${year}`);
    return response.data;
};

export const fetchWeapon = async (lat: number, lon: number) => {
    const year = getYear();
    const response = await axiosService.get(`${BACKEND_URL}/byWeapon?lat=${lat}&lon=${lon}&year=${year}`);
    return response.data;
};

export const fetchCaseNumberTrend = async (lat: number, lon: number) => {
    const year = getYear();
    const response = await axiosService.get(`${BACKEND_URL}/caseNumberTrend?lat=${lat}&lon=${lon}&year=${year}`);
    return response.data;
};

export const fetchRace = async (lat: number, lon: number) => {
    const year = getYear();
    const response = await axiosService.get(`${BACKEND_URL}/byRace?lat=${lat}&lon=${lon}&year=${year}`);
    return response.data;
};

export const fetchCrimeList = async (lat: number, lon: number) => {
    const year = getYear();
    const response = await axiosService.get(`${BACKEND_URL}/crimeList?lat=${lat}&lon=${lon}&year=${year}`);
    return response.data;
};

export const fetchCrimeDetail = async (caseId: string) => {
    const response = await axiosService.get(`${BACKEND_URL}/crimeDetail?caseId=${caseId}`);
    return response.data;
};
