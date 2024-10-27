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
import { LogsResponse } from "@/services/api.types";
import { getStatusColor } from "@/utils/color";
import { formatLogDate } from "@/utils/date";
import { Fragment, useState } from "react";

interface DataTableProps {
	data: LogsResponse;
}

export const DataTable = ({ data }: DataTableProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState<
		| {
				log: number;
				scope: number;
				resource: number;
		  }
		| undefined
	>();

	const handleClose = () => {
		setIsOpen(false);
	};

	return (
		<>
			<DetailsDialog
				open={isOpen}
				onOpenChange={handleClose}
				data={data}
				position={selectedItem}
			/>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Scope Name</TableHead>
							<TableHead>Body</TableHead>
							<TableHead>Time</TableHead>
							<TableHead className="text-center">
								Severity
							</TableHead>
							<TableHead className="text-right">
								Severity No.
							</TableHead>
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
														setSelectedItem({
															log: logIndex,
															resource: itemIndex,
															scope: scopeIndex,
														});
														setIsOpen(true);
													}}
												>
													<TableCell>
														{scope.scope.name}
													</TableCell>
													<TableCell className="first-letter:capitalize">
														{log.body.stringValue}
													</TableCell>
													<TableCell>
														{formatLogDate(
															log.timeUnixNano
														)}
													</TableCell>
													<TableCell align="center">
														<Badge
															variant={getStatusColor(
																log.severityText
															)}
														>
															{log.severityText}
														</Badge>
													</TableCell>
													<TableCell align="right">
														{log.severityNumber}
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
