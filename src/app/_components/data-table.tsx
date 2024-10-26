"use client";

import { DetailsDialog } from "@/app/_components/details-dialog";
import { Badge } from "@/components/ui/badge";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { LogRecord, LogsResponse } from "@/services/api.types";
import dayjs from "dayjs";
import { Fragment, useState } from "react";

interface DataTableProps {
	data: LogsResponse;
}

export const DataTable = ({ data }: DataTableProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [log, setLog] = useState<LogRecord | undefined>(undefined);

	const handleClose = () => {
		setIsOpen(false);
	};

	return (
		<>
			<DetailsDialog open={isOpen} onOpenChange={handleClose} log={log} />
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Severity</TableHead>
							<TableHead>Time</TableHead>
							<TableHead>Body</TableHead>
							<TableHead>Resource</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{data.resourceLogs.map((item, itemIndex) => (
							<Fragment key={itemIndex}>
								{item.scopeLogs.map((scope, scopeIndex) => (
									<Fragment key={scopeIndex}>
										{scope.logRecords.map(
											(log, logIndex) => (
												<TableRow
													key={logIndex}
													className="cursor-pointer"
													onClick={() => {
														setLog(log);
														setIsOpen(true);
													}}
												>
													<TableCell>
														<Badge>
															{log.severityText}
														</Badge>
													</TableCell>
													<TableCell>
														{dayjs(
															log.timeUnixNano
														).format(
															"YYYY-MM-DD HH:mm:ss"
														)}
													</TableCell>
													<TableCell>
														{log.body.stringValue}
													</TableCell>
													<TableCell>
														{scope.scope.name}
													</TableCell>
												</TableRow>
											)
										)}
									</Fragment>
								))}
							</Fragment>
						))}
					</TableBody>
				</Table>
			</div>
		</>
	);
};
