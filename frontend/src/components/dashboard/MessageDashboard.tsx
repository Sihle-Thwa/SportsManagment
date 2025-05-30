import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { Avatar } from "../../components/ui/avatar";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";


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
    <Card className="card-base">
      <CardHeader className="card-header flex flex-row items-start justify-between p-auto">
        <CardTitle className="card-title">
          Messages
        </CardTitle>
        <Button className="btn-tertiary">
          <MoreHorizontal className="h-6 w-6 text-slate-600" />
        </Button>
      </CardHeader>
      <ScrollArea className="flex w-full overflow-y-auto">
        <CardContent className="card-body flex flex-col  justify-around w-full">
          {messageData.map((msg) => (
            <div
              key={msg.id}
              className={`flex w-full items-start mb-3 border-b hover:bg-slate-50 cursor-pointer" ${selectedConversation === msg.id ? "bg-slate-50" : ""
                }`}
              onClick={() => setSelectedConversation(msg.id)}
            >
              <div className="flex flex-col gap-3 items-start mb-3">
                <div className="flex flex-row items-start gap-3 self-stretch">
                  <Avatar className="w-[32px] h-[32px] object-cover bg-amber-100 rounded-full" >
                    <img
                      src={msg.sender.avatar}
                      alt={msg.sender.name}
                    />
                  </Avatar>

                  <div className="flex flex-col items-start self-stretch">
                    <div className="flex flex-row items-start justify-between self-stretch">
                      <h3 className=" flex flex-col text-xl font-medium text-slate-800">{msg.sender.name}</h3>
                      <span className="flex flex-col text-sm text-slate-500">{msg.timestamp}</span>
                    </div>
                    <p className="flex flex-row text-base text-slate-700">{msg.message}</p>
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