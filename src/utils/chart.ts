import { LogsResponse } from "@/services/api.types";
import { formatLogForChartDate } from "@/utils/date";

export const prepareChartData = (data: LogsResponse) => {
	const chartData = data.resourceLogs
		.flatMap((item) => {
			return item.scopeLogs.flatMap((scope) => {
				return scope.logRecords.map((log) => {
					return {
						time: formatLogForChartDate(log.timeUnixNano),
						count: 1,
					};
				});
			});
		})
		.reduce((acc: { time: string; count: number }[], item) => {
			const index = acc.findIndex((i) => i.time === item.time);
			if (index === -1) {
				acc.push({ ...item, count: 1 });
			} else {
				acc[index].count += 1;
			}
			return acc;
		}, [] as { time: string; count: number }[]);

	chartData.sort((a, b) => {
		return new Date(a.time).getTime() - new Date(b.time).getTime();
	});

	return chartData;
};
