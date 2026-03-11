import React, { useState, useRef, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { MessageSquare, X, Send, Bot, Loader2 } from 'lucide-react';

const AiChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi! I'm your AI assistant. How can I help you today?", isUser: false }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const { axios: authAxios } = useContext(AuthContext);

    // Provide a fallback axios instance if authAxios is not available
    const api = authAxios || axios;

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = input.trim();
        setInput('');
        setMessages(prev => [...prev, { id: Date.now(), text: userMsg, isUser: true }]);
        setIsLoading(true);

        try {
            const res = await api.post('/api/ai/chat', { message: userMsg });
            if (res.data.success === false) {
                throw new Error(res.data.message || "Failed to get AI response");
            }
            setMessages(prev => [...prev, { id: Date.now() + 1, text: res.data.message, isUser: false }]);
        } catch (error) {
            console.error("AI Chat Error:", error);
            setMessages(prev => [...prev, { id: Date.now() + 1, text: error.message || "Sorry, I couldn't process that. Please try again.", isUser: false, isError: true }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Chat Window */}
            {isOpen && (
                <div className="absolute bottom-16 right-0 w-80 sm:w-96 bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[500px] max-h-[80vh] transition-all duration-300">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-orange-500 to-red-600 p-4 flex justify-between items-center text-white">
                        <div className="flex items-center gap-2">
                            <Bot size={20} />
                            <h3 className="font-semibold text-sm">Groq AI Assistant</h3>
                        </div>
                        <button 
                            onClick={() => setIsOpen(false)}
                            className="hover:bg-white/20 p-1 rounded-full transition-colors"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-4 overflow-y-auto bg-gray-900 space-y-4">
                        {messages.map((msg) => (
                            <div 
                                key={msg.id} 
                                className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                            >
                                <div 
                                    className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                                        msg.isUser 
                                            ? 'bg-orange-500 text-white rounded-br-none' 
                                            : msg.isError 
                                                ? 'bg-red-500/20 text-red-200 border border-red-500/50 rounded-bl-none'
                                                : 'bg-gray-800 text-gray-200 rounded-bl-none border border-gray-700'
                                    }`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                    <div className="bg-gray-800 border border-gray-700 rounded-2xl rounded-bl-none px-4 py-3 flex items-center gap-2">
                                        <Loader2 className="animate-spin text-orange-400" size={16} />
                                        <span className="text-xs text-gray-400">Thinking...</span>
                                    </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSend} className="p-3 bg-gray-800 border-t border-gray-700">
                        <div className="relative flex items-center">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask me anything..."
                                className="w-full bg-gray-900 border border-gray-700 text-white text-sm rounded-full pl-4 pr-12 py-3 focus:outline-none focus:border-orange-500 transition-colors"
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !input.trim()}
                                className="absolute right-2 p-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Send size={16} />
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center justify-center gap-3 px-5 py-3 rounded-full shadow-xl backdrop-blur-xl border transition-all duration-300 ${
                    isOpen 
                        ? 'bg-gray-800/80 border-gray-700/50 hover:bg-gray-700/80 text-gray-300' 
                        : 'bg-white/10 border-white/20 hover:bg-white/20 hover:scale-105 text-white shadow-orange-500/20'
                }`}
            >
                {isOpen ? <X size={24} /> : (
                    <>
                        <MessageSquare size={24} />
                        <span className="font-semibold tracking-wide text-sm whitespace-nowrap">AI Chat Available</span>
                    </>
                )}
            </button>
        </div>
    );
};

export default AiChat;
