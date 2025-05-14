import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


const MessageDashboard = ({ messages = [] }) => {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);

  // If no messages provided, use sample data
  const messageData = messages.length > 0 ? messages : [
    {
      id: 1,
      sender: {
        name: "Phoenix Baker",
        username: "@phoenix",
        avatar: "/api/placeholder/100/100",
      },
      message: "Looks good!",
      timestamp: "now",
    },
    {
      id: 2,
      sender: {
        name: "Lana Steiner",
        username: "@lana",
        avatar: "/api/placeholder/100/100",
      },
      message: "Thanks so much, happy with that.",
      timestamp: "2 m ago",
    },
    {
      id: 3,
      sender: {
        name: "Demi Wikinson",
        username: "@demi",
        avatar: "/api/placeholder/100/100",
      },
      message: "Looks good!",
      timestamp: "2 m ago",
    },
    {
      id: 4,
      sender: {
        name: "Demi Wikinson",
        username: "@demi",
        avatar: "/api/placeholder/100/100",
      },
      message: "Looks good!",
      timestamp: "2 m ago",
    },
    {
      id: 5,
      sender: {
        name: "Demi Wikinson",
        username: "@demi",
        avatar: "/api/placeholder/100/100",
      },
      message: "Looks good!",
      timestamp: "2 m ago",
    }
  ];

  return (
    <Card className="flex flex-col w-full h-fit py-3 px-6 border rounded-lg overflow-hidden bg-white shadow-sm">
      <CardHeader className="flex items-center justify-between p-3 border-b">
        <CardTitle className="text-xl font-bold text-slate-800">Messages</CardTitle>
        <Button variant={"outline"} className="p-2 border-0 hover:bg-slate-100">
          <MoreHorizontal size={24} className="text-slate-600" />
        </Button>
      </CardHeader>
      <ScrollArea className="flex h-68 w-full overflow-y-auto">
        <CardContent className="flex flex-col items-start justify-center mb-2">
          {messageData.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 self-stretch p-3  mb-2 border-b hover:bg-slate-50 cursor-pointer" ${selectedConversation === msg.id ? "bg-slate-50" : ""
                }`}
              onClick={() => setSelectedConversation(msg.id)}
            >
              <div className="flex flex-col gap-2 items-start mb-2">
                <div className="flex items-center gap-2 self-stretch">
                  <Avatar className="flex w-12 h-12 justify-end items-center" >
                    <img
                      src={msg.sender.avatar}
                      alt={msg.sender.name}
                    />
                  </Avatar>

                  <div className="flex flex-col items-start gap-3 ">
                    <div className="flex flex-col items-start self-stretch">
                      <h3 className="text-xl font-medium text-slate-800">{msg.sender.name}</h3>
                      <span className="grid items-center justify-end text-sm text-slate-500">{msg.timestamp}</span>
                    </div>
                    <p className="text-base text-slate-700">{msg.message}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </ScrollArea>
    </Card>
  );
};

export default MessageDashboard;