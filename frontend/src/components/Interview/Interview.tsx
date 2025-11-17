import type React from "react";
import { Send, Mic, Paperclip, MoreVertical, Sparkles } from 'lucide-react';
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useLocation } from "react-router-dom";

type role = "user" | "assistant"
interface Messages {
    role: role,
    content: string
}
const Interview: React.FC = () => {
    const [messages, setMessages] = useState<Messages[]>([])
    const [userResponse, setUserResponse] = useState<string>("");
    const path = useLocation();
    useEffect(() => {
        const interview_id = path.pathname.split('/').at(-1);
        try {
            const loaderIndex = messages.length + 1;
            setMessages(prev => [...prev, { role: "assistant", content: "..." }]);
            fetch(import.meta.env.VITE_BACKEND_URL + '/api/v1/interview/start/' + interview_id, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    deails: messages
                })
            }).then(async (res: Response) => {
                const data = await res.json()
                console.log(data)
                if (data.valid) {
                    setMessages(prev => {
                        const updated = [...prev];
                        updated[loaderIndex] = {
                            role: "assistant",
                            content: data.ai_response
                        };
                        return updated;
                    });
                } else {
                    alert("Byeee bhai")
                }
            })
        } catch (error) {
            console.log(error)

        }
    }, [])



    return (
        <div className="flex flex-col h-screen w-full bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-gray-900/50 backdrop-blur-sm border-b border-gray-800">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-lime-400 to-lime-600 flex items-center justify-center">
                            <Sparkles className="w-6 h-6 text-gray-900" />
                        </div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-lime-400 rounded-full border-2 border-gray-900"></div>
                    </div>
                    <div>
                        <h2 className="text-white font-semibold text-lg">AI Interviewer</h2>
                        <p className="text-lime-400 text-sm flex items-center gap-1">
                            <span className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></span>
                            Active now
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg border border-gray-700">
                        <svg className="w-5 h-5 text-lime-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-lime-400 font-mono text-lg font-semibold">15:23</span>
                    </div>
                    <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                        <MoreVertical className="w-5 h-5 text-gray-400" />
                    </button>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                {messages.map((message, index) => (
                    <div
                        key={`${message.role}_${index}`}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-[fadeIn_0.3s_ease-in]`}
                    >
                        <div className={`flex gap-3 max-w-2xl ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                            {message.role === "assistant" && (
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-lime-400 to-lime-600 flex items-center justify-center flex-shrink-0">
                                    <Sparkles className="w-5 h-5 text-gray-900" />
                                </div>
                            )}
                            {message.role === 'user' && (
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center flex-shrink-0">
                                    <span className="text-white font-semibold">You</span>
                                </div>
                            )}
                            <div className="flex flex-col gap-1">
                                <div
                                    className={`px-5 py-3 rounded-2xl ${message.role === 'user'
                                        ? 'bg-lime-500 text-gray-900 rounded-tr-sm'
                                        : 'bg-gray-800 text-white rounded-tl-sm'
                                        } shadow-lg`}
                                >
                                    {message.content === "..." ? (
                                        <div className="flex gap-1">
                                            <span className="w-2 h-2 rounded-full bg-lime-400 animate-bounce"></span>
                                            <span className="w-2 h-2 rounded-full bg-lime-400 animate-bounce delay-150"></span>
                                            <span className="w-2 h-2 rounded-full bg-lime-400 animate-bounce delay-300"></span>
                                        </div>
                                    ) : (
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                            {message.content}
                                        </ReactMarkdown>
                                    )}
                                </div>
                                <span className={`text-xs text-gray-500 ${message.role === 'user' ? 'text-right' : 'text-left'} px-2`}>

                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Input Area */}
            <div className="px-6 py-4 bg-gray-900/50 backdrop-blur-sm border-t border-gray-800">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-end gap-3">
                        <button className="p-3 hover:bg-gray-800 rounded-xl transition-all hover:scale-110 group">
                            <Paperclip className="w-5 h-5 text-gray-400 group-hover:text-lime-400 transition-colors" />
                        </button>

                        <div className="flex-1 bg-gray-800 rounded-2xl border-2 border-gray-700 focus-within:border-lime-400 transition-all">
                            <textarea
                                onChange={(e) => setUserResponse(e.target.value)}
                                value={userResponse}
                                placeholder="Type your response..."
                                rows={1}
                                className="w-full px-5 py-3 bg-transparent text-white placeholder-gray-500 resize-none focus:outline-none"
                            />
                        </div>

                        <button className="p-3 hover:bg-gray-800 rounded-xl transition-all hover:scale-110 group">
                            <Mic className="w-5 h-5 text-gray-400 group-hover:text-lime-400 transition-colors" />
                        </button>

                        <button
                            onClick={() => {
                                if (!userResponse.trim()) return;

                                // Add user message immediately
                                setMessages(prev => [...prev, { role: "user", content: userResponse }]);
                                setUserResponse("");


                                // Add AI loader message
                                const loaderIndex = messages.length + 1;
                                setMessages(prev => [...prev, { role: "assistant", content: "..." }]);
                                const interview_id = path.pathname.split('/').at(-1);

                                fetch(import.meta.env.VITE_BACKEND_URL + '/api/v1/interview/start/' + interview_id, {
                                    method: 'POST',
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({
                                        deails: [...messages, { role: "user", content: userResponse }]
                                    })
                                })
                                    .then(async (res: Response) => {
                                        const data = await res.json();
                                        if (!data.valid) {
                                            alert("Byeee bhai");

                                            return;
                                        }
                                        setMessages(prev => {
                                            const updated = [...prev];
                                            updated[loaderIndex] = {
                                                role: "assistant",
                                                content: data.ai_response
                                            };
                                            return updated;
                                        });
                                    })
                                    .catch(err => {
                                        console.log(err);

                                    });
                            }}


                            className="p-3 bg-lime-500 hover:bg-lime-400 rounded-xl transition-all hover:scale-110 shadow-lg shadow-lime-500/50">
                            <Send className="w-5 h-5 text-gray-900" />
                        </button>
                    </div>

                    <p className="text-xs text-gray-500 mt-3 text-center">
                        Press <kbd className="px-2 py-1 bg-gray-800 rounded text-lime-400">Enter</kbd> to send • <kbd className="px-2 py-1 bg-gray-800 rounded text-lime-400">Shift + Enter</kbd> for new line
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Interview