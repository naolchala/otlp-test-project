"use client";

import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { LogRecord } from "@/services/api.types";
import { formatLogDate } from "@/utils/date";
import { DialogProps, DialogTitle } from "@radix-ui/react-dialog";

interface DetailsDialogProps extends DialogProps {
	log?: LogRecord;
}
export const DetailsDialog = ({ log, ...props }: DetailsDialogProps) => {
	if (!log) {
		return <></>;
	}

	return (
		<Dialog {...props}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="font-bold text-xl">
						Log Details
					</DialogTitle>
				</DialogHeader>
				<div className="flex-col ">
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
					<div className="flex mb-5">
						<div className="flex flex-col justify-between flex-1">
							<span className="text-sm font-bold text-muted-foreground">
								Logged Time
							</span>
							<code className="capitalize">
								{formatLogDate(log.timeUnixNano)}
							</code>
						</div>
						<div className="flex flex-col justify-between flex-1">
							<span className="text-sm font-semibold text-muted-foreground">
								Observed Log Time
							</span>
							<code className="capitalize ">
								{formatLogDate(log.observedTimeUnixNano)}
							</code>
						</div>
					</div>
					<div className="flex mb-5">
						<div className="flex flex-col justify-between flex-1">
							<span className="text-sm font-bold text-muted-foreground">
								Attributes
							</span>
							{log.attributes.map((attribute, index) => (
								<span key={index}>{attribute as string}</span>
							))}
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};
