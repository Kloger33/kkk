import React, { useState } from 'react';
import { MessageThread, Tutor } from '../data/tutorsData';
import { 
  X, 
  Send, 
  CheckCheck, 
  MessageSquare, 
  User, 
  Sparkles,
  Calendar
} from 'lucide-react';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  threads: MessageThread[];
  activeTutor: Tutor | null;
  onSendMessage: (threadId: string, text: string) => void;
  onBook: (tutor: Tutor) => void;
}

export const ChatModal: React.FC<ChatModalProps> = ({
  isOpen,
  onClose,
  threads,
  activeTutor,
  onSendMessage,
  onBook,
}) => {
  if (!isOpen) return null;

  const [selectedThreadId, setSelectedThreadId] = useState<string>(
    threads[0]?.id || 'thread-1'
  );
  const [inputText, setInputText] = useState('');

  const currentThread = threads.find((t) => t.id === selectedThreadId) || threads[0];

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || !currentThread) return;

    onSendMessage(currentThread.id, inputText.trim());
    setInputText('');
  };

  const quickReplies = [
    'Can we focus on ordering food in our next lesson?',
    'What time works best for you this Saturday?',
    'Could you send me the vocabulary flashcard for directions?',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-teal-600 text-white font-bold text-sm flex items-center justify-center">
              {currentThread?.tutorName.split(' ').map((n) => n[0]).join('')}
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-tight">
                {currentThread?.tutorName || 'Tutor Chat'}
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Active now · Usually replies in 15m</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Message Thread Selector (if multiple) */}
        {threads.length > 1 && (
          <div className="flex border-b border-slate-100 px-4 py-2 gap-2 bg-slate-50/40 overflow-x-auto text-xs shrink-0">
            {threads.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedThreadId(t.id)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors shrink-0 ${
                  selectedThreadId === t.id
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {t.tutorName}
              </button>
            ))}
          </div>
        )}

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/30">
          {currentThread?.messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed shadow-sm ${
                    isUser
                      ? 'bg-teal-600 text-white rounded-br-none'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
                <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1 font-mono">
                  <span>{msg.timestamp}</span>
                  {isUser && <CheckCheck className="w-3 h-3 text-teal-600" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center gap-2 overflow-x-auto text-xs shrink-0">
          <span className="text-[10px] uppercase font-bold text-slate-400 shrink-0">Quick Ask:</span>
          {quickReplies.map((qr, idx) => (
            <button
              key={idx}
              onClick={() => onSendMessage(currentThread.id, qr)}
              className="px-2.5 py-1 bg-white hover:bg-teal-50 hover:text-teal-700 hover:border-teal-300 text-slate-600 rounded-lg border border-slate-200 text-[11px] whitespace-nowrap shrink-0 transition-colors"
            >
              {qr}
            </button>
          ))}
        </div>

        {/* Message Input Box */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Message ${currentThread?.tutorName || 'tutor'}...`}
            className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-teal-500 transition-colors"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-2.5 bg-teal-600 hover:bg-teal-700 disabled:opacity-40 text-white rounded-xl shadow-sm transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
