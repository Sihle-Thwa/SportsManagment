import { useState } from "react";
import { MoreHorizontal, Bell, Plus, Pencil, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const NoticeBoard = ({ notices = [] }) => {
  const [selectedNotice, setSelectedNotice] = useState<number | null>(null);

  // If no notices provided, use sample data
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
        <Bell size={24} className="text-amber-500" />
      </div>
    );
  };

  return (
    <div className="flex flex-col w-fit h-fit py-3 px-6 border rounded-lg overflow-hidden bg-white shadow-sm">
      <div className="flex items-center justify-between p-3 border-b">
        <h2 className="text-xl font-bold text-slate-800">Notice Board</h2>
        <Button variant={"outline"} className="p-2 border-0 hover:bg-slate-100">
          <MoreHorizontal size={24} className="text-slate-600" />
        </Button>
      </div>

      <ScrollArea className="flex h-40 p-3 ">
        <div className="flex flex-col items-center justify-center mb-2">
          {noticeData.map((notice) => (
            <Card
              key={notice.id}
              className={`grid items-start justify-center mb-3 border-b hover:bg-slate-50 cursor-pointer" ${selectedNotice === notice.id ? "bg-slate-50" : ""
                }`}
              onClick={() => setSelectedNotice(notice.id)}
            >
              <CardContent className="grid items-center ">
                <div className=" grid self-auto justify-start ">
                  {renderIcon()}
                </div>
                <div className="grid items-start justify-start mb-2">
                  <h3 className="text-xl font-medium text-slate-800">{notice.title}</h3>
                </div>

                <div className="grid items-start justify-start mb-2">
                  <p className="text-base text-slate-700">{notice.content}</p>
                </div>

              </CardContent>

            </Card>
          ))}
        </div>
      </ScrollArea>

      <div className="flex flex-wrap h-full justify-center items-center shrink-0 gap-3 p-3 border-t bg-white">
        <Button
          variant="outline"
          size="icon"
          className="w-9 h-9 bg-slate-800 hover:bg-slate-700 text-white rounded-lg border-none shadow-sm"
        >
          <Plus size={36} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="w-9 h-9 bg-slate-800 hover:bg-slate-700 text-white rounded-lg border-none shadow-sm"
        >
          <Pencil size={36} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="w-9 h-9 bg-slate-800 hover:bg-slate-700 text-white rounded-lg border-none shadow-sm"
        >
          <X size={36} />
        </Button>
      </div>
    </div>
  );
};

export default NoticeBoard;