import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const AIChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: string, text: string }[]>([
        { role: 'model', text: '¡Hola! Soy tu Asistente de PMO Inteligente. Puedo enrutar tu consulta automáticamente al agente más experto (Cumplimiento, Consultor, Medioambiente, Reliability, Riesgos o RSA), o puedes seleccionar uno manualmente en el menú de arriba. ¿En qué te puedo ayudar hoy?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const [selectedAgent, setSelectedAgent] = useState('auto');

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    const downloadPDF = (text: string) => {
        const doc = new jsPDF();
        const cleanText = text.replace(/\*\[.*?\]\*\n\n/, ''); // Quitar el prefijo del agente
        
        doc.setFontSize(16);
        doc.setTextColor(19, 91, 236); // Color primario #135bec
        doc.text('Informe de Gestión - Goldfields PMO', 20, 20);
        
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(`Fecha: ${new Date().toLocaleString()}`, 20, 30);
        
        const sections = cleanText.split('\n\n');
        let currentY = 40;

        sections.forEach((section) => {
            if (section.includes('|')) {
                // Es una tabla
                const rows = section.trim().split('\n');
                const headers = rows[0].split('|').filter(h => h.trim()).map(h => h.trim());
                const data = rows.slice(2).map(row => row.split('|').filter(c => c.trim()).map(c => c.trim()));
                
                autoTable(doc, {
                    head: [headers],
                    body: data,
                    startY: currentY,
                    theme: 'grid',
                    headStyles: { fillColor: [26, 34, 51], textColor: [255, 255, 255] },
                    alternateRowStyles: { fillColor: [245, 245, 245] },
                    styles: { fontSize: 8 }
                });
                currentY = (doc as any).lastAutoTable.finalY + 10;
            } else if (section.trim()) {
                // Es texto plano o títulos
                const textLines = doc.splitTextToSize(section.trim().replace(/[#*]/g, ''), 170);
                if (currentY + (textLines.length * 5) > 280) {
                    doc.addPage();
                    currentY = 20;
                }
                doc.setFontSize(section.startsWith('#') ? 12 : 10);
                doc.setTextColor(section.startsWith('#') ? 0 : 60);
                doc.text(textLines, 20, currentY);
                currentY += (textLines.length * 5) + 5;
            }
        });

        doc.save(`Informe_PMO_${new Date().getTime()}.pdf`);
    };

    const handleSendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMsgText = input.trim();
        setMessages(prev => [...prev, { role: 'user', text: userMsgText }]);
        setInput('');
        setIsLoading(true);

        const agentMap: Record<string, string> = {
            'auto': 'auto',
            'cumplimiento': 'compliance',
            'consultor': 'consulting-expert',
            'medioambiente': 'environment',
            'reliability': 'reliability',
            'riesgos': 'risk-analyst',
            'rsa': 'rsa'
        };
        const backendAgentId = agentMap[selectedAgent] || 'auto';

        try {
            const agentsBase = import.meta.env.VITE_AGENTS_URL || '/agents';
            const response = await fetch(`${agentsBase}/orchestrate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: userMsgText, agentId: backendAgentId })
            });

            if (!response.ok) {
                throw new Error('Error en la comunicación con el servidor');
            }

            const data = await response.json();
            const activeAgent = data.activeAgent || 'Agente';
            const responseText = data.finalReport || 'Sin respuesta.';

            setMessages(prev => [...prev, { role: 'model', text: `*[Respondiendo desde ${activeAgent}]*\n\n${responseText}` }]);
        } catch (error) {
            console.error('Error en Chatbot:', error);
            setMessages(prev => [...prev, { role: 'model', text: 'Lo siento, hubo un error de comunicación con el microservicio de agentes.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {isOpen ? (
                <div className="bg-surface-dark w-80 md:w-[400px] h-[600px] rounded-2xl shadow-2xl border border-border-dark flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">
                    <div className="p-4 bg-primary text-white flex justify-between items-center shrink-0">
                        <div className="flex items-center gap-3 flex-1">
                            <span className="material-symbols-outlined icon-fill text-3xl">smart_toy</span>
                            <div className="flex flex-col">
                                <span className="font-bold text-sm leading-none mb-1.5 flex items-center gap-2">
                                    PMO Inteligente
                                    <span className="bg-white/20 text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wider font-bold">Beta</span>
                                </span>
                                <select
                                    value={selectedAgent}
                                    onChange={(e) => setSelectedAgent(e.target.value)}
                                    className="bg-black/20 text-white text-xs rounded py-1 px-2 outline-none font-medium cursor-pointer border border-white/20 hover:bg-black/30 transition-colors focus:ring-1 focus:ring-white/50"
                                >
                                    <option value="auto" className="bg-surface-dark text-white">Automático (Mejor Agente)</option>
                                    <option value="cumplimiento" className="bg-surface-dark text-white">Agente de Cumplimiento</option>
                                    <option value="consultor" className="bg-surface-dark text-white">Agente Consultor</option>
                                    <option value="medioambiente" className="bg-surface-dark text-white">Agente de Medioambiente</option>
                                    <option value="reliability" className="bg-surface-dark text-white">Agente de Reliability</option>
                                    <option value="riesgos" className="bg-surface-dark text-white">Agente de Riesgos</option>
                                    <option value="rsa" className="bg-surface-dark text-white">Agente de Análisis RSA</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 self-start mt-1">
                            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition-colors flex items-center justify-center">
                                <span className="material-symbols-outlined text-lg">close</span>
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
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                            {msg.text.replace(/\\n/g, '\n')}
                                        </ReactMarkdown>
                                    </div>
                                    {msg.role === 'model' && msg.text.includes('|') && (
                                        <button 
                                            onClick={() => downloadPDF(msg.text)}
                                            className="mt-3 flex items-center gap-2 bg-white/10 hover:bg-white/20 text-[9px] uppercase tracking-wider font-bold py-1.5 px-3 rounded-lg border border-white/10 transition-colors"
                                        >
                                            <span className="material-symbols-outlined text-sm">picture_as_pdf</span>
                                            Descargar Informe PDF
                                        </button>
                                    )}
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
