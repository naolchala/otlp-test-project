import { BASE_URL } from "@/configs/env.config";
import axios from "axios";

const axiosClient = axios.create({
	baseURL: BASE_URL,
});

export default axiosClient;
