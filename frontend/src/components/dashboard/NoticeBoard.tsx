import { useState } from "react";
import { MoreHorizontal, Bell, Plus, Pencil, X } from "lucide-react";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../common/Button/Button";

const NoticeBoard = ({ notices = [] }) => {
  const [selectedNotice, setSelectedNotice] = useState<number | null>(null);

  // If no notices provided from database, we used sample data
  const noticeData = notices.length > 0 ? notices : [
    {
      id: 1,
      title: "Sports Day Announcement",
      content: "The school's Annual Sports Day will be held on May 12, 2024. Mark your calendars!"
    },
    {
      id: 2,
      title: "Sports Day Announcement",
      content: "The school's Annual Sports Day will be held on May 12, 2024. Mark your calendars!"
    }
  ];

  // Always render bell icon with amber color scheme
  const renderIcon = () => {
    return (
      <div className="w-fit h-fit object-cover">
        <Bell size={32} className="icon icon-tertiary" />
      </div>
    );
  };

  return (
    <Card className="card flex max-w-full max-h-[345px] h-full justify-between overflow-hidden">
      <CardHeader className="card-header flex flex-row items-start justify-between">
        <CardTitle className="card-header-title ">
          Notice Board
        </CardTitle>
        <Button className="btn-base btn-tertiary ">
          <MoreHorizontal className="icon-base icon-tertiary" />
        </Button>
      </CardHeader>
      <ScrollArea className="flex w-full  overflow-y-auto ">
        <CardContent className="card-body flex flex-col  w-full overflow-y-auto">
          {noticeData.map((notice) => (
            <div
              key={notice.id}
              className={`flex items-start mb-3 border-b  cursor-pointer" ${selectedNotice === notice.id ? "bg-slate-50" : ""
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
          <Button
            variant="primary"
            size="md"
            fullWidth={false}
            iconPosition="center"
            className="btn--primary"
          >
            <Plus />
          </Button>
          <Button
            variant="primary"
            size="md"
            fullWidth={false}
            iconPosition="center"
            className="btn--primary"
          >
            <Pencil />
          </Button>
          <Button
            variant="primary"
            size="md"
            fullWidth={false}
            iconPosition="center"
            className="btn--primary"

          >
            <X />
          </Button>
        </div>

      </CardFooter>
    </Card>
  );
};

export default NoticeBoard;