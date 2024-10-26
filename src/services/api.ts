import axiosClient from "@/configs/api.config";
import { LogsResponse } from "@/services/api.types";

const getLogs = async () => {
	const res = await axiosClient.get<LogsResponse>("/logs");
	return res.data;
};

export { getLogs };
