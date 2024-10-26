"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { LogsResponse } from "@/services/api.types";
import { prepareChartData } from "@/utils/chart";
import dayjs from "dayjs";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

interface HistogramChartProps {
	data: LogsResponse;
}

export const HistogramChart = ({ data }: HistogramChartProps) => {
	const config = {
		count: {
			label: "count",
			color: "#2563eb",
		},
	} satisfies ChartConfig;

	const chartData = prepareChartData(data);

	return (
		<Card className="my-5">
			<CardHeader>
				<CardTitle>Logs</CardTitle>
			</CardHeader>
			<CardContent>
				<ChartContainer
					config={config}
					className="aspect-auto h-[200px] w-full"
				>
					<BarChart data={chartData}>
						<ChartTooltip content={<ChartTooltipContent />} />
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey={"time"}
							tickFormatter={(value) =>
								dayjs(value).format("MMM DD")
							}
						/>
						<Bar
							dataKey={"count"}
							stackId={"a"}
							fill="var(--color-count)"
							radius={[4, 4, 0, 0]}
						/>
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
};
