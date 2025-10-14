import { useState } from "react";
import FacilitiesTable from "../../components/Table/FacilitiesTable";
import facilitiesmockdata from "../../routes/facilitiesmockdata";
import "./facilities.css";

export default function Facilities() {
	const [facilities] = useState(facilitiesmockdata);

	return (
		<div className="facilitiesRoot">
			<div className="facilitiesHeader" aria-labelledby="facilities-header">
				<div className="facilitiesTitle" id="facilities-title">
					Facilities
				</div>
				<div className="facilitiesSubtitle">
					View and Manage all facilities of your organisation
				</div>
			</div>
			<section className="facilitiesContainer" aria-label="Facilities editor">
				<div className="facilitiesContent">
					<FacilitiesTable data={facilities} />
				</div>
			</section>
		</div>
	);
}
