// src/app/ia/page.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, Send, User, Sparkles, StopCircle } from "lucide-react";

type Mensagem = {
  id: number;
  texto: string;
  origem: "usuario" | "bot";
};

export default function IAPage() {
  const [mensagens, setMensagens] = useState<Mensagem[]>([
    { id: 1, texto: "Olá! Sou a I.A. da sua empresa. Como posso ajudar a analisar seus dados hoje?", origem: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [carregando, setCarregando] = useState(false);
  
  // Referência para rolar o chat para baixo automaticamente
  const fimDoChatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fimDoChatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensagens]);

  const enviarMensagem = () => {
    if (!input.trim()) return;

    const novaMensagemUsuario: Mensagem = {
      id: Date.now(),
      texto: input,
      origem: "usuario"
    };

    setMensagens((prev) => [...prev, novaMensagemUsuario]);
    setInput("");
    setCarregando(true);

    // Simulação de resposta da IA (Futuramente aqui entrará a conexão com ChatGPT)
    setTimeout(() => {
      const respostaBot: Mensagem = {
        id: Date.now() + 1,
        texto: gerarRespostaSimulada(novaMensagemUsuario.texto),
        origem: "bot"
      };
      setMensagens((prev) => [...prev, respostaBot]);
      setCarregando(false);
    }, 1500);
  };

  // Função simples para fingir inteligência por enquanto
  const gerarRespostaSimulada = (texto: string) => {
    const t = texto.toLowerCase();
    if (t.includes("lucro") || t.includes("faturamento")) return "Com base nos dados registrados, seu lucro líquido este mês está projetado em R$ 105.000, um aumento de 12% em relação ao mês anterior.";
    if (t.includes("gasto") || t.includes("despesa")) return "Suas maiores despesas atuais são com 'Marketing' e 'Infraestrutura'. Recomendo revisar o contrato de servidores.";
    if (t.includes("venda")) return "A equipe de vendas fechou 124 contratos este mês. A meta foi batida!";
    return "Entendi. Estou processando essa informação nos arquivos da empresa. Posso ajudar com mais alguma análise financeira?";
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
          <Sparkles className="text-purple-600" /> Inteligência Artificial
        </h1>
        <p className="text-gray-500">Faça perguntas sobre o desempenho da sua empresa.</p>
      </div>

      {/* Área do Chat */}
      <div className="flex-1 bg-white border border-gray-200 rounded-xl p-4 overflow-y-auto shadow-sm flex flex-col gap-4">
        {mensagens.map((msg) => (
          <div key={msg.id} className={`flex ${msg.origem === 'usuario' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex items-start gap-3 max-w-[80%] ${msg.origem === 'usuario' ? 'flex-row-reverse' : ''}`}>
              
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.origem === 'usuario' ? 'bg-blue-600' : 'bg-purple-600'}`}>
                {msg.origem === 'usuario' ? <User size={16} className="text-white"/> : <Bot size={16} className="text-white"/>}
              </div>

              {/* Balão de Fala */}
              <div className={`p-3 rounded-2xl text-sm leading-relaxed ${
                msg.origem === 'usuario' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-gray-100 text-slate-800 rounded-tl-none'
              }`}>
                {msg.texto}
              </div>
            </div>
          </div>
        ))}
        
        {carregando && (
          <div className="flex justify-start">
            <div className="bg-gray-100 p-3 rounded-2xl rounded-tl-none flex gap-1 items-center">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
            </div>
          </div>
        )}
        <div ref={fimDoChatRef} />
      </div>

      {/* Área de Input */}
      <div className="mt-4">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Pergunte sobre vendas, gastos ou lucros..." 
            className="w-full border border-gray-300 rounded-xl py-4 pl-4 pr-14 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && enviarMensagem()}
            disabled={carregando}
          />
          <button 
            onClick={enviarMensagem}
            disabled={carregando || !input.trim()}
            className="absolute right-2 top-2 p-2 bg-slate-900 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50 transition-colors"
          >
            {carregando ? <StopCircle size={20} /> : <Send size={20} />}
          </button>
        </div>
        <p className="text-xs text-center text-gray-400 mt-2">
          A I.A. pode cometer erros. Verifique as informações importantes.
        </p>
      </div>
    </div>
  );
}