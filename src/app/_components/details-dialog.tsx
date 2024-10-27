"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { LogsResponse } from "@/services/api.types";
import { formatLogDate } from "@/utils/date";
import { DialogProps, DialogTitle } from "@radix-ui/react-dialog";

interface DetailsDialogProps extends DialogProps {
	data: LogsResponse;
	position?: {
		log: number;
		scope: number;
		resource: number;
	};
}
export const DetailsDialog = ({
	data,
	position,
	...props
}: DetailsDialogProps) => {
	if (!position) {
		return <></>;
	}

	const resource = data.resourceLogs[position.resource];
	const scope = resource?.scopeLogs[position.scope];
	const log = scope?.logRecords[position.log];

	return (
		<Dialog {...props}>
			<DialogContent className="lg:max-w-screen-lg overflow-y-auto max-h-screen">
				<DialogHeader>
					<DialogTitle className="font-bold text-xl">
						Log Details
					</DialogTitle>
				</DialogHeader>
				<div className="flex gap-5">
					<Card>
						<CardHeader>
							<CardTitle>Resource</CardTitle>
						</CardHeader>
						<CardContent className="flex flex-wrap gap-6">
							{resource?.resource.attributes.map((attribute) => (
								<div
									key={attribute.key}
									className="flex flex-col justify-between"
								>
									<span className="text-sm text-muted-foreground capitalize">
										{attribute.key.replace(/\./g, " ")}
									</span>
									<span className="capitalize">
										{attribute.value.stringValue}
									</span>
								</div>
							))}
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>Scope</CardTitle>
						</CardHeader>
						<CardContent className="flex flex-wrap gap-6">
							{scope?.scope.attributes.map((attribute) => (
								<div
									key={attribute.key}
									className="flex flex-col justify-between"
								>
									<span className="text-sm text-muted-foreground capitalize">
										{attribute.key.replace(/\./g, " ")}
									</span>
									<span className="capitalize">
										{attribute.value.stringValue}
									</span>
								</div>
							))}
						</CardContent>
					</Card>
				</div>

				<Card>
					<CardHeader>
						<CardTitle>Log</CardTitle>
					</CardHeader>
					<CardContent className="flex flex-row gap-10">
						<div className="flex flex-col flex-1">
							<div className="flex mb-5">
								<div className="flex flex-col justify-between flex-1">
									<span className="text-sm font-bold text-muted-foreground">
										Body
									</span>
									<span className="capitalize">
										{log.body.stringValue}
									</span>
								</div>
								<div className="flex flex-col justify-between">
									<span className="text-sm font-bold text-muted-foreground">
										Severity
									</span>
									<Badge>{log.severityText}</Badge>
								</div>
							</div>
							<div className="flex flex-col justify-between flex-1 mb-4">
								<span className="text-sm font-bold text-muted-foreground">
									Logged Time
								</span>
								<code className="capitalize">
									{formatLogDate(log.timeUnixNano)}
								</code>
							</div>
							<div className="flex flex-col justify-between flex-1 mb-4">
								<span className="text-sm font-semibold text-muted-foreground">
									Observed Log Time
								</span>
								<code className="capitalize ">
									{formatLogDate(log.observedTimeUnixNano)}
								</code>
							</div>
						</div>

						<div className="flex mb-5 flex-1">
							<div className="flex flex-col justify-between flex-1">
								<span className="text-sm font-bold text-muted-foreground">
									Attributes
								</span>
								{log.attributes.map((attribute, index) => (
									<span key={index}>
										{attribute as string}
									</span>
								))}
							</div>
						</div>
					</CardContent>
				</Card>
			</DialogContent>
		</Dialog>
	);
};
