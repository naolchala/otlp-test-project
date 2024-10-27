import dayjs from "dayjs";

export const formatLogDate = (time: string) => {
	const date = dayjs.unix(parseFloat(time.substring(0, 10)));
	return date.format("DD-MM-YYYY / HH:mm:ss");
};

export const formatLogForChartDate = (time: string) => {
	const date = dayjs.unix(parseFloat(time.substring(0, 10)));
	return date.format("YYYY-MM-DD");
};
