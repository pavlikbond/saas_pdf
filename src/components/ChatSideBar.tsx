"use client";
import { DrizzleChat } from "@/lib/db/schema";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { MessageCircle, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  chats: DrizzleChat[];
  chatId: number;
};

const ChatSideBar = ({ chats, chatId }: Props) => {
  return (
    <div className="w-full h-screen p-4 text-gray-200 bg-gray-800 ">
      <Link href="/">
        <Button className="w-full border-dashed border-2 border-slate-50">
          <PlusCircle className="mr-2 w-4 h-4" />
          New Chat
        </Button>
      </Link>
      <div className="flex flex-col gap-2 mt-4">
        {chats.map((chat) => (
          <Link href={`/chat/${chat.id}`} key={chat.id}>
            <div
              className={cn("rounded-lg p-3 text-slate-300 flex items-center", {
                "bg-blue-600 text-white": chat.id === chatId,
                "hover:text-white": !(chat.id === chatId),
              })}
            >
              <MessageCircle className="mr-2 w-4 h-4" />
              <p className="w-ful overflow-hidden text-sm truncate ">{chat.pdfName}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="absolute bottom-4 left-4">
        <div className="flex items-center gap-2 text-sm text-slate-400 flex-wrap">
          <Link href="/">Home</Link>
          <Link href="/">Source</Link>
        </div>
      </div>
    </div>
  );
};

export default ChatSideBar;
