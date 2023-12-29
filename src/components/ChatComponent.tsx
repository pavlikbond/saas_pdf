"use client";
import React from "react";
import { Input } from "./ui/input";
import { useChat } from "ai/react";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import MessageList from "./MessageList";
type Props = {};

const ChatComponent = (props: Props) => {
  const { input, handleInputChange, handleSubmit, messages } = useChat({
    api: "/api/chat",
  });
  return (
    <div className="relative max-h-screen ">
      <div className="sticky top-0 inset-x-0 p-2 bg-white h-fit">
        <h3>Chat</h3>
      </div>
      <MessageList messages={messages} />
      <form className="sticky bottom-0 inset-x-0 px-2 py-4 bg-white" onSubmit={handleSubmit}>
        <div className="flex">
          <Input placeholder="Ask any question..." className="w-full " value={input} onChange={handleInputChange} />
          <Button className="bg-blue-600 ml-2">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatComponent;
