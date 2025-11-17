"use client";
import React, { useEffect, useState, useRef } from "react";
import { FaRobot, FaTimes } from "react-icons/fa";

type Message = {
  from: "user" | "bot";
  text: string;
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          from: "bot",
          text: "Hi! I'm Abdellatyf's AI assistant. How can I help you learn more about his work and experience?",
        },
      ]);
    }
  }, [open, messages.length]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend() {
    const text = input.trim();
    if (!text || isTyping) return;

    // Build the message list including the new user message so the API receives the latest message
    const userMessage: Message = { from: "user", text };
    const newMessages = [...messages, userMessage];

    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      // Reveal the bot reply character-by-character to simulate human typing
      const reply: string = data.reply || "I'm sorry, I couldn't generate a response right now.";
      await revealReply(reply);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((m) => [
        ...m,
        {
          from: "bot",
          text: "I apologize, but I'm having trouble connecting to my AI service right now. Please try again later or use the WhatsApp button below to contact Abdellatyf directly.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  }

  // Reveal text with a small delay per character to feel human-like
  function revealReply(fullText: string) {
    return new Promise<void>((resolve) => {
      // Append an empty bot message slot
      setMessages((prev) => [...prev, { from: "bot", text: "" }]);
      let i = 0;
      const speed = 14; // ms per character (adjust for faster/slower typing)

      const interval = setInterval(() => {
        i += 1;
        setMessages((prev) => {
          // Replace last message with progressively longer slice
          const before = prev.slice(0, -1);
          return [...before, { from: "bot", text: fullText.slice(0, i) }];
        });

        if (i >= fullText.length) {
          clearInterval(interval);
          resolve();
        }
      }, speed);
    });
  }

  return (
    <>
      {/* Floating chatbot button placed above WhatsApp */}
      <div className="fixed z-60 bottom-[20%] right-10 flex flex-col items-end">
        <div className="relative">
          <button
            aria-label="Open chatbot"
            onClick={() => setOpen((o) => !o)}
            className="bg-[#00BD95] hover:bg-[#00a67f] text-white p-3 rounded-full shadow-lg focus:outline-none"
            style={{ boxShadow: "0 6px 18px rgba(0,0,0,0.2)" }}
          >
            <FaRobot className="w-5 h-5" />
          </button>
        </div>

        {open && (
          <div
            ref={panelRef}
            className="mt-3 w-80 max-w-[90vw] bg-white dark:bg-[#111318] text-black dark:text-white rounded-lg shadow-xl overflow-hidden"
          >
            <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <FaRobot />
                <div className="font-semibold">AI Assistant</div>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close" className="p-1">
                <FaTimes />
              </button>
            </div>

            <div className="p-3 h-72 overflow-y-auto space-y-3 bg-gray-50 dark:bg-[#0b0d0f]">
              {messages.map((m, i) => (
                <div key={i} className={m.from === "user" ? "text-right" : "text-left"}>
                  <div
                    className={`inline-block p-2 rounded-md max-w-[86%] text-sm ${
                      m.from === "user"
                        ? "bg-[#dcf8e8] text-black"
                        : "bg-white dark:bg-[#111318] text-black dark:text-white"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="text-left">
                  <div className="inline-block p-2 rounded-md bg-white dark:bg-[#111318] text-black dark:text-white">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="px-3 py-2 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-[#0b0d0f]">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  disabled={isTyping}
                  className="flex-1 px-3 py-2 rounded-md bg-gray-100 dark:bg-[#0b0d0f] text-sm outline-none disabled:opacity-50"
                  placeholder={isTyping ? "Please wait..." : "Ask about my experience, skills..."}
                />
                <button
                  onClick={handleSend}
                  disabled={isTyping}
                  className="bg-[#00BD95] hover:bg-[#00a67f] disabled:opacity-50 disabled:cursor-not-allowed text-white px-3 py-2 rounded-md text-sm"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
