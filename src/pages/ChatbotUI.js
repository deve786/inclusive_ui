import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import { BASE_URL } from "../Constants";

const ChatbotUI = () => {
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState("");
    const messagesEndRef = useRef(null);
    const chatContainerRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        setTimeout(() => {
            setMessages((prev) =>
                prev.length === 0
                    ? [
                        ...prev,
                        {
                            text: "Inserisci qui il testo da analizzare",
                            sender: "ai",
                            timestamp: new Date(),
                        },
                    ]
                    : prev
            );
        }, 1000);
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (currentMessage.trim() === "" ) return;

        // Add user message
        setMessages(prev => [...prev, {
            text: currentMessage,
            sender: "user",
            timestamp: new Date()
        }]);
        
        setCurrentMessage("");
        

        try {
            const response = await axios.post(`${BASE_URL}/chatbot/analyze`, {
                text: currentMessage,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            // Access the parsed data directly
            const data = response.data; // Change this line
            console.log(data);
    
            setMessages((prev) => [
                ...prev,
                {
                    text: data.analysis,
                    sender: "ai",
                    timestamp: new Date(),
                },
            ]);
            console.log(messages);
        } catch (error) {
            console.error('Error:', error);
            setMessages((prev) => [
                ...prev,
                {
                    text: "Sorry, I encountered an error. Please try again.",
                    sender: "ai",
                    timestamp: new Date(),
                    isError: true,
                },
            ]);
        } finally {
            console.log("Message sent");
        }
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    };

    return (
        <div className="flex flex-col  bg-gray-50 h-[90vh]  w-full">
            <h1 className="md:text-3xl text-xl mx-4 sm:mx-10 font-semibold text-primaryColor">Chatbot</h1>
            <div className="flex-grow  flex flex-col overflow-hidden mt-1 mx-4 sm:mx-10 bg-white border-t-[12px] border-primaryColor border rounded-md">

                <div
                    ref={chatContainerRef}
                    className="flex-grow overflow-y-auto p-4 space-y-4"
                >
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`flex md:max-w-[75%] w-full ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
                            >
                                <div
                                    className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${message.sender === "user"
                                        ? "bg-primaryColor ml-2"
                                        : "bg-gray-300 mr-2"
                                        }`}
                                >
                                    {message.sender === "user" ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="white"
                                            className="w-5 h-5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="w-5 h-5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z"
                                            />
                                        </svg>
                                    )}
                                </div>
                                <div
                                    className={`px-4 py-2 rounded-lg shadow markdown-body  ${message.sender === "user"
                                        ? "bg-primaryColor text-white"
                                        : "bg-white text-gray-800"
                                        }`}
                                >
                                    {message.loading ? (
                                        <div className="flex flex-row gap-1">
                                            <div className="w-3 h-3 rounded-full bg-blue-700 animate-bounce"></div>
                                            <div className="w-3 h-3 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
                                            <div className="w-3 h-3 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
                                        </div>
                                    ) : (
                                        <Markdown className="text-sm">{message.text}</Markdown>
                                    )}
                                    <p
                                        className={`text-xs mt-1 ${message.sender === "user"
                                            ? "text-indigo-200"
                                            : "text-gray-500"
                                            }`}
                                    >
                                        {formatTime(message.timestamp)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                <form
                    onSubmit={handleSendMessage}
                    className="p-4 border-t border-gray-200"
                >
                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            value={currentMessage}
                            onChange={(e) => setCurrentMessage(e.target.value)}
                            placeholder="Type your message..."
                            className="flex w-full md:px-4 px-1 py-2 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primaryColor focus:border-transparent transition duration-150 placeholder:md:text-lg placeholder:text-xs"
                        />
                        <button
                            type="submit"
                            className="bg-primaryColor text-white rounded-full p-2 hover:bg-primaryColor focus:outline-none focus:ring-2 focus:ring-primaryColor focus:ring-offset-2 transition duration-150"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-5 h-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                                />
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};




export default ChatbotUI;