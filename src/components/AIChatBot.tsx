import { useState, useRef, useEffect } from 'react';

const AIChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: string, text: string }[]>([
        { role: 'model', text: '¡Hola! Soy el Asistente AI de Permisos. Puedo ayudarte con el estado de las tramitaciones, analizar las curvas S, o consultar la base de datos de RCAs. ¿En qué te puedo ayudar hoy?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    const handleSendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMsgText = input.trim();
        setMessages(prev => [...prev, { role: 'user', text: userMsgText }]);
        setInput('');
        setIsLoading(true);

        // Simulate API delay
        setTimeout(() => {
            setMessages(prev => [...prev, { role: 'model', text: 'Esta es una respuesta simulada. Pronto conectaremos este chat con el microservicio RAG (FastAPI + LangChain) para darte respuestas reales sobre la base de datos.' }]);
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {isOpen ? (
                <div className="bg-surface-dark w-80 md:w-[400px] h-[600px] rounded-2xl shadow-2xl border border-border-dark flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">
                    <div className="p-4 bg-primary text-white flex justify-between items-center shrink-0">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined icon-fill">analytics</span>
                            <div className="flex flex-col">
                                <span className="font-bold text-sm leading-none">Asistente AI</span>
                                <span className="text-[9px] opacity-70 uppercase tracking-widest font-black mt-1">PMO Inteligente</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1.5 rounded transition-colors ml-1">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                    </div>

                    <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-background-dark/30 scroll-smooth">
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[90%] p-3.5 rounded-2xl text-[11px] leading-relaxed shadow-sm ${msg.role === 'user'
                                    ? 'bg-primary text-white rounded-tr-none font-medium'
                                    : 'bg-surface-dark text-slate-200 rounded-tl-none border border-border-dark'
                                    }`}>
                                    <div className="markdown-content">
                                        {msg.text}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-surface-dark p-3 rounded-2xl rounded-tl-none text-[10px] animate-pulse flex items-center gap-3 border border-border-dark">
                                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></span>
                                    <span className="text-text-secondary italic uppercase tracking-tighter font-bold">Procesando</span>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="p-4 border-t border-border-dark bg-surface-dark flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                            placeholder="Haz tu consulta..."
                            className="flex-1 bg-background-dark border border-border-dark text-white rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                        <button
                            onClick={handleSendMessage}
                            disabled={isLoading || !input.trim()}
                            className="bg-primary hover:bg-primary-hover text-white p-2.5 rounded-xl transition-all disabled:opacity-40 flex items-center justify-center shadow-lg"
                        >
                            <span className="material-symbols-outlined">send</span>
                        </button>
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-primary hover:bg-primary-hover text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 group"
                >
                    <span className="material-symbols-outlined text-3xl icon-fill">smart_toy</span>
                </button>
            )}
        </div>
    );
};

export default AIChatBot;
