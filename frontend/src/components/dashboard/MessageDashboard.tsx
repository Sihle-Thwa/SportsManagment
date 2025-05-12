import { useState } from "react";
import { MoreHorizontal, CheckCircle } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";

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
        online: true
      },
      message: "Looks good!",
      timestamp: "now",
      read: false
    },
    {
      id: 2,
      sender: {
        name: "Lana Steiner",
        username: "@lana",
        avatar: "/api/placeholder/100/100",
        online: true
      },
      message: "Thanks so much, happy with that.",
      timestamp: "2 m ago",
      read: true
    },
    {
      id: 3,
      sender: {
        name: "Demi Wikinson",
        username: "@demi",
        avatar: "/api/placeholder/100/100",
        online: false
      },
      message: "",
      timestamp: "2 m ago",
      read: false
    },
    {
      id: 4,
      sender: {
        name: "Demi Wikinson",
        username: "@demi",
        avatar: "/api/placeholder/100/100",
        online: false
      },
      message: "",
      timestamp: "2 m ago",
      read: false
    },
    {
      id: 5,
      sender: {
        name: "Demi Wikinson",
        username: "@demi",
        avatar: "/api/placeholder/100/100",
        online: false
      },
      message: "",
      timestamp: "2 m ago",
      read: false
    }
  ];

  return (
    <div className="flex flex-col w-80 h-80 max-w-80 py-3 px-6 border rounded-lg overflow-hidden bg-white shadow-sm">
      <div className="flex items-center justify-between p-3 border-b">
        <h2 className="text-xl font-bold text-slate-800">Messages</h2>
        <Button variant={"outline"} className="p-2 border-0 hover:bg-slate-100">
          <MoreHorizontal size={24} className="text-slate-600" />
        </Button>
      </div>

      <ScrollArea className="h-90">
        {messageData.map((msg) => (
          <div 
            key={msg.id}
            className={`flex items-start p-4 border-b hover:bg-slate-50 cursor-pointer ${
              selectedConversation === msg.id ? "bg-slate-50" : ""
            }`}
            onClick={() => setSelectedConversation(msg.id)}
          >
            <div className="relative mr-3">
              <Avatar className="h-12 w-12">
                <img 
                  src={msg.sender.avatar} 
                  alt={msg.sender.name} 
                  className="h-full w-full object-cover rounded-full"
                />
              </Avatar>
              {msg.sender.online && (
                <span className="absolute bottom-0 right-0 block w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-around mb-1">
                <h3 className="text-lg font-medium text-slate-800">{msg.sender.name}</h3>
                <span className="text-sm text-slate-500">{msg.timestamp}</span>
              </div>
              <p className="mt-1 text-slate-700">{msg.message}</p>
            </div>

            {msg.read ? (
              <CheckCircle size={16} className="text-green-500 mt-2 ml-2" />
            ) : (
              <Badge className="mt-2 ml-2 bg-green-500" variant="default" />
            )}
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};

export default MessageDashboard;