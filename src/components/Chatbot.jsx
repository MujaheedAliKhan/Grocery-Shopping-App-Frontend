import React, { useState } from "react";
import { askChatbotApi } from "../api/chatbotApi";
import {MessageCircle, X} from "lucide-react";

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [reply, setReply] = useState("");

  const handleAsk = async () => {
    if (!message.trim()) return;

    try {
      setLoading(true);

      const data = await askChatbotApi(message);

      setReply(data.reply);
      setMessage("");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
     {/* Floating Chat Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-amber-600 text-white p-4 rounded-full shadow-lg hover:bg-amber-500 transition z-50 animate-bounce"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
   

    {/* Chat Box */}
      <div
        className={`fixed bottom-24 right-6 w-80 bg-white shadow-2xl rounded-xl border border-gray-300 z-50 transform transition-all duration-300 ${
          isOpen
            ? "scale-100 opacity-100"
            : "scale-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-amber-600 text-white p-3 rounded-t-xl">
          <h2 className="font-semibold">
            Grocery AI Assistant 🤖
          </h2>
        </div>

        <div className="p-4 max-h-75 overflow-y-auto">
          {reply ? (
            <p className="text-sm text-gray-700">
              {reply}
            </p>
          ) : (
            <p className="text-sm text-gray-400">
              Ask me about groceries,
              recipes, or healthy foods.
            </p>
          )}
        </div>

        <div className="p-3 border-t flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            placeholder="Ask something..."
            className="flex-1 border rounded-md px-3 py-2 text-sm outline-none"
          />

          <button
            onClick={handleAsk}
            className="bg-amber-600 text-white px-4 rounded-md hover:bg-amber-500"
          >
            {loading ? "..." : "Send"}
          </button>
        </div>
      </div>
     </>
  );
};

export default Chatbot;