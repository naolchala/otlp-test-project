import { DataTable } from "@/app/_components/data-table";
import { getLogs } from "@/services/api";

export default async function Home() {
	const data = await getLogs();
	return (
		<div className="container mx-auto mt-10">
			<header className="mb-5">
				<h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
					OpenTelemetry Logs
				</h1>
				<p className="mt-1 text-muted-foreground">
					Here are list of logs from OpenTelemetry
				</p>
			</header>
			<DataTable data={data} />
		</div>
	);
}
