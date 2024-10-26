export interface LogsResponse {
	resourceLogs: ResourceLog[];
}

export interface ResourceLog {
	resource: Resource;
	scopeLogs: ScopeLog[];
}

export interface Resource {
	droppedAttributesCount: number;
	attributes: Attribute[];
}

export interface Attribute {
	key: string;
	value: Value;
}

export interface Value {
	stringValue: string;
}

export interface ScopeLog {
	scope: Scope;
	logRecords: LogRecord[];
}

export interface Scope {
	droppedAttributesCount: number;
	attributes: Attribute2[];
	name: string;
}

export interface Attribute2 {
	key: string;
	value: Value2;
}

export interface Value2 {
	stringValue: string;
}

export interface LogRecord {
	timeUnixNano: string;
	observedTimeUnixNano: string;
	severityNumber: number;
	severityText: string;
	body: Body;
	attributes: unknown[];
	droppedAttributesCount: number;
}

export interface Body {
	stringValue: string;
}
