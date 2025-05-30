import { useState } from "react";
import { MoreHorizontal, Bell, Plus, Pencil, X } from "lucide-react";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../common/Button";

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
      <div className="w-fit h-fit object-cover bg-amber-100 rounded-full">
        <Bell size={32} className="text-amber-500" />
      </div>
    );
  };

  return (
    <Card className="card-base flex flex-col max-h-[320px] w-full rounded-lg overflow-hidden">
      <CardHeader className="card-header flex flex-row items-start justify-between p-auto">
        <CardTitle className="card-title text-xl font-semibold text-slate-800">
          Notice Board
        </CardTitle>
        <Button className="btn-tertiary">
          <MoreHorizontal className="h-6 w-6 text-slate-600" />
        </Button>
      </CardHeader>
      <ScrollArea className="flex w-full  overflow-y-auto ">
        <CardContent className="card-body flex flex-col items-center justify-around w-full">
          {noticeData.map((notice) => (
            <div
              key={notice.id}
              className={`flex items-start mb-3 border-b hover:bg-slate-50 cursor-pointer" ${selectedNotice === notice.id ? "bg-slate-50" : ""
                }`}
              onClick={() => setSelectedNotice(notice.id)}
            >
              <div className="flex flex-col gap-3 items-start mb-3">
                <div className="flex flex-row items-start gap-3 self-stretch">
                  {renderIcon()}
                  <div className="flex flex-col items-start self-stretch">
                    <h3 className="text-xl font-medium text-slate-800">{notice.title}</h3>
                  </div>
                </div>
                <div className="flex flex-col items-start self-stretch">
                  <p className="text-base text-slate-700">{notice.content}</p>
                </div>

              </div>

            </div>
          ))}
        </CardContent>
      </ScrollArea>

      <CardFooter className="card-footer flex flex-row items-center justify-center gap-3 p-3  ">
        <Button
          withIcon={true}
          iconPosition="left"
          icon={<Plus />}
          fullWidth={false}
          className="btn-primary"
        >
        </Button>
        <Button
          withIcon={true}
          iconPosition="left"
          icon={<Pencil />}
          fullWidth={false}
          className="btn-primary"
        >

        </Button>
        <Button
          withIcon={true}
          iconPosition="left"
          icon={<X />}
          fullWidth={false}
          className="btn-primary"
        >
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NoticeBoard;