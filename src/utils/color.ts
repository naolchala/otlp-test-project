import { BadgeProps } from "@/components/ui/badge";

export const StatusVariants: { [key: string]: BadgeProps["variant"] } = {
	INFO: "secondary",
	ERROR: "destructive",
	FATAL: "destructive",
	WARN: "secondary",
	DEBUG: "secondary",
	TRACE: "secondary",
	UNKNOWN: "outline",
	UNSPECIFIED: "outline",
};

export const getStatusColor = (status: string) => {
	return (
		StatusVariants[status.toUpperCase() as keyof typeof StatusVariants] ||
		"outline"
	);
};
