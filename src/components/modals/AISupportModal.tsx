import React, { useState } from 'react';

interface AISupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
}

export const AISupportModal: React.FC<AISupportModalProps> = ({
  isOpen,
  onClose
}) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'PulseTech AI Specialist online. Running hardware diagnostics on connected fleet... How can I assist with your audio acoustics, GPU thermal curve, or order telemetry today?',
      time: 'Just now'
    }
  ]);

  if (!isOpen) return null;

  const handleSend = (textToSend?: string) => {
    const q = textToSend || input;
    if (!q.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: q,
      time: 'Just now'
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');

    // Generate intelligent hardware diagnostic answer
    setTimeout(() => {
      let reply = "I've analyzed your telemetry request. All parameters pass specification standards.";
      const lower = q.toLowerCase();

      if (lower.includes('ps5') || lower.includes('playstation') || lower.includes('console')) {
        reply = "Yes! The Apex Pro connects via the included low-latency 2.4GHz wireless dongle or 3.5mm gold jack into the DualSense controller with full 3D Tempest Audio support.";
      } else if (lower.includes('battery') || lower.includes('degradation') || lower.includes('charge')) {
        reply = "Hardware Telemetry report: Your registered MacBook Pro battery health is at 98% (optimal), and the Apex Pro retains 45h playtime with fast charge (15 min = 6h).";
      } else if (lower.includes('ldac') || lower.includes('codec') || lower.includes('aac')) {
        reply = "LDAC delivers up to 990 kbps at 24-bit/96kHz (true hi-res lossless), while standard AAC peaks at 256-320 kbps. The Apex Pro automatically renegotiates the highest bit-rate stream.";
      } else if (lower.includes('order') || lower.includes('delivery') || lower.includes('marcus')) {
        reply = "Active Dispatch FT-0982 is currently 1.4 miles away with Courier Marcus D. (Van #19). ETA is on track for 4:30 PM today.";
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: reply,
        time: 'Just now'
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="w-full max-w-md h-[78vh] bg-surface-container-low border border-primary-container/40 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="px-4 py-3 bg-surface-container-high border-b border-outline-variant/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary-container/20 text-primary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">smart_toy</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-[15px] font-bold text-on-surface">Pulse AI Specialist</h3>
              <span className="flex items-center gap-1 text-[10px] font-spec-code-sm text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Active Neural Diagnostic Engine
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary-container"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Quick prompt chips */}
        <div className="px-3 py-2 bg-surface-container border-b border-outline-variant/20 flex gap-2 overflow-x-auto no-scrollbar">
          {[
            'Is Apex Pro compatible with PS5?',
            'Check battery health status',
            'LDAC vs AAC sound quality?'
          ].map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSend(prompt)}
              className="shrink-0 px-2.5 py-1 rounded-full bg-surface-container-high text-[10px] font-body-sm text-primary hover:border-primary-container border border-outline-variant/40 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Messages List */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-surface-container-lowest">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-2xl text-[13px] leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-primary-container text-on-primary-fixed font-medium rounded-br-none shadow-md'
                    : 'bg-surface-container-high text-on-surface border border-outline-variant/30 rounded-bl-none'
                }`}
              >
                {m.text}
              </div>
              <span className="text-[9px] font-spec-code-sm text-outline mt-1 px-1">{m.time}</span>
            </div>
          ))}
        </div>

        {/* Input Dock */}
        <div className="p-3 bg-surface-container border-t border-outline-variant/30 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask AI hardware specialist..."
            className="flex-1 bg-surface-container-lowest border border-outline-variant/50 rounded-xl px-3.5 py-2 text-xs text-on-surface placeholder:text-outline focus:border-primary-container outline-none"
          />
          <button
            onClick={() => handleSend()}
            className="w-10 h-10 rounded-xl bg-primary-container text-on-primary-fixed flex items-center justify-center font-bold glow-cyan active:scale-90 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
          </button>
        </div>
      </div>
    </div>
  );
};
