// filepath: /C:/Users/lamph/OneDrive/Desktop/mma301/projectSWD392/SWD392-blindbox-mobile/api/api.jsx
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const baseUrl =
  "https://mysteryminis2-e9hwhhakhja3ggf0.australiacentral-01.azurewebsites.net/api/";

const config = {
  baseUrl,
  timeout: 3000000,
};
const api = axios.create(config);
api.defaults.baseURL = baseUrl;

const handleBefore = async (config) => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  } catch (error) {
    console.error("Error getting access token:", error);
  }
  return config;
};

const handleError = (error) => {
  console.error("API Error:", error);
  return Promise.reject(error);
};

api.interceptors.request.use(handleBefore, handleError);

export default api;
