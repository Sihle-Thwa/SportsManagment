import { useState } from "react";
import FacilitiesTable from "../../components/Table/FacilitiesTable";
import { Facility } from "@/types/facility.types";

export default function Facilities() {
	const [facility] = useState<Facility[]>([
		{
			id: "1",
			name: "Main Sports Hall",
			location: "123 Main St",
			capacity: 100,
			status: "active",
		},

		{
			id: "2",
			name: "Secondary Gym",
			location: "456 Side Ave",
			capacity: 50,
			status: "maintenance",
		},
		{
			id: "3",
			name: "Tertiary Field",
			location: "789 Tertiary Rd",
			capacity: 75,
			status: "active",
		},
	]);

	return (
		<div className="space-y-6 p-6 ">
			<div className="mb-6 ">
				<h1>Facilities</h1>
				<p>View and Manage all facilities of your organisation</p>
			</div>

			<FacilitiesTable data={facility} />
		</div>
	);
}
