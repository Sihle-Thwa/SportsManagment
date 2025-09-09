import { useState } from "react";
import { MoreHorizontal, Bell, Plus, Pencil, X } from "lucide-react";
import { ScrollArea } from "../../components/ui/scroll-area";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../../components/ui/card";

const NoticeBoard = ({ notices = [] }) => {
	const [selectedNotice, setSelectedNotice] = useState<number | null>(null);

	// If no notices provided from database, we used sample data
	const noticeData =
		notices.length > 0
			? notices
			: [
					{
						id: 1,
						title: "Sports Day Announcement",
						content:
							"The school's Annual Sports Day will be held on May 12, 2024. Mark your calendars!",
					},
					{
						id: 2,
						title: "Sports Day Announcement",
						content:
							"The school's Annual Sports Day will be held on May 12, 2024. Mark your calendars!",
					},
			  ];

	// Always render bell icon with amber color scheme
	const renderIcon = () => {
		return (
			<div className="w-fit h-fit object-cover">
				<Bell size={24} className="icon icon-primary" />
			</div>
		);
	};

	return (
		<Card className="card flex max-w-full max-h-[345px] h-full justify-between overflow-hidden">
			<CardHeader className="card-header flex flex-row items-start justify-between">
				<CardTitle className="card-header-title ">Notice Board</CardTitle>
				<button className="button button-primary button-icon-only">
					<MoreHorizontal />
				</button>
			</CardHeader>
			<ScrollArea className="flex w-full  overflow-y-auto ">
				<CardContent className="card-body flex flex-col w-full overflow-y-auto">
					{noticeData.map((notice) => (
						<div
							key={notice.id}
							className={`flex items-start mb-3 border-b b-border-default  cursor-pointer" ${
								selectedNotice === notice.id ? "bg-interactive-selected" : ""
							}`}
							onClick={() => setSelectedNotice(notice.id)}
						>
							<div className="flex flex-col gap-3 items-start mb-3">
								<div className="flex flex-row items-start gap-3 self-stretch">
									{renderIcon()}
									<div className="flex flex-col items-start self-stretch">
										<h5>{notice.title}</h5>
									</div>
								</div>
								<div className="flex flex-col items-start self-stretch">
									<p>{notice.content}</p>
								</div>
							</div>
						</div>
					))}
				</CardContent>
			</ScrollArea>

			<CardFooter className="card-footer flex flex-row items-end justify-center">
				<div className="flex flex-row w-fit h-fit gap-3">
					<button className="button button-primary button-icon-only">
						<Plus />
					</button>

					<button className="button button-primary button-icon-only">
						<Pencil />
					</button>
					<button className="button button-primary button-icon-only">
						<X />
					</button>
				</div>
			</CardFooter>
		</Card>
	);
};

export default NoticeBoard;
