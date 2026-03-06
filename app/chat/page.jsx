"use client";

import { useState, useEffect, useRef } from "react";

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Ref for auto-scrolling to the bottom
  const scrollRef = useRef(null);

  // Auto-scroll effect whenever messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!message.trim() || loading) return;

    const userMessage = { sender: "user", text: message };
    
    // Clear input and add user message immediately
    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/chatbot/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) throw new Error("Server error");

      const data = await res.json();
      const botMessage = { sender: "bot", text: data.reply };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Error connecting to server. Please try again later." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Handle "Enter" key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl flex flex-col h-[600px] overflow-hidden">
        
        {/* Header */}
        <div className="bg-green-600 p-4 text-white text-center">
          <h2 className="text-xl font-bold">Ripuraj AI Assistant 🌾</h2>
          <p className="text-xs opacity-80">Expert advice on rice cultivation</p>
        </div>

        {/* Chat Window */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 space-y-4 bg-white"
        >
          {messages.length === 0 && (
            <p className="text-center text-gray-400 mt-10">Ask me anything about rice farming!</p>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`p-3 rounded-2xl max-w-[85%] text-sm shadow-sm ${
                  msg.sender === "user"
                    ? "bg-green-500 text-white rounded-tr-none"
                    : "bg-gray-100 text-gray-800 rounded-tl-none border border-gray-200"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-500 p-3 rounded-2xl rounded-tl-none text-sm animate-pulse">
                Typing...
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-100 flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about rice..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 outline-none focus:border-green-500 transition-colors"
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className={`bg-green-600 text-white p-2 px-5 rounded-full font-medium transition-all ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700 active:scale-95"
            }`}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}