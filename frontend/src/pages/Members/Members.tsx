import { useState } from "react";
import MembersTable from "../../components/Table/MembersTable";
import "./members.css";
import { membersMockData } from "../../routes/membersmockdata";

export default function Members() {
	const [members] = useState(membersMockData);

	return (
		<div className="membersRoot">
			<div className="membersHeader" aria-labelledby="members-header">
				<div className="membersTitle" id="members-title">
					Members
				</div>
				<div className="membersSubtitle">
					View and Manage all members of your organisation
				</div>
			</div>

			<section className="membersContainer" aria-label="Members editor">
				<div className="membersContent">
					<MembersTable data={members} />
				</div>
			</section>
		</div>
	);
}
