// src/app/mural/page.tsx
"use client";

import { useState } from "react";
import { Pin, Plus, X } from "lucide-react";

type Aviso = {
  id: number;
  titulo: string;
  texto: string;
  cor: string;
};

export default function MuralPage() {
  const [avisos, setAvisos] = useState<Aviso[]>([
    { id: 1, titulo: "Bem-vindo!", texto: "Este é o novo sistema da empresa. Explore os menus.", cor: "bg-yellow-200" },
    { id: 2, titulo: "Feriado", texto: "Não haverá expediente na próxima sexta-feira.", cor: "bg-blue-200" },
  ]);

  const [novoTitulo, setNovoTitulo] = useState("");
  const [novoTexto, setNovoTexto] = useState("");
  const [corSelecionada, setCorSelecionada] = useState("bg-yellow-200");

  const cores = ["bg-yellow-200", "bg-blue-200", "bg-green-200", "bg-rose-200", "bg-purple-200"];

  const adicionarAviso = () => {
    if (!novoTitulo || !novoTexto) return;
    
    setAvisos([...avisos, {
      id: Date.now(),
      titulo: novoTitulo,
      texto: novoTexto,
      cor: corSelecionada
    }]);
    setNovoTitulo("");
    setNovoTexto("");
  };

  const removerAviso = (id: number) => {
    setAvisos(avisos.filter(a => a.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-800 mb-8 flex items-center gap-2">
        📢 Mural de Avisos
      </h1>

      {/* Área de Criação */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8 flex flex-col md:flex-row gap-4 items-start">
        <div className="flex-1 space-y-2 w-full">
          <input 
            placeholder="Título do Aviso" 
            className="w-full border p-2 rounded-lg font-bold"
            value={novoTitulo}
            onChange={e => setNovoTitulo(e.target.value)}
          />
          <textarea 
            placeholder="Escreva a mensagem..." 
            className="w-full border p-2 rounded-lg h-20 resize-none"
            value={novoTexto}
            onChange={e => setNovoTexto(e.target.value)}
          />
        </div>
        
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            {cores.map(cor => (
              <button 
                key={cor} 
                onClick={() => setCorSelecionada(cor)}
                className={`w-8 h-8 rounded-full border-2 ${cor} ${corSelecionada === cor ? 'border-black' : 'border-transparent'}`}
              />
            ))}
          </div>
          <button 
            onClick={adicionarAviso}
            className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 flex items-center justify-center gap-2"
          >
            <Plus size={18} /> Colar Aviso
          </button>
        </div>
      </div>

      {/* Grid de Post-its */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {avisos.map((aviso) => (
          <div 
            key={aviso.id} 
            className={`${aviso.cor} p-6 rounded-sm shadow-lg relative transform hover:-translate-y-1 transition-transform`}
            style={{ minHeight: '200px' }}
          >
            {/* Efeito de "Alfinete" visual */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-red-500 drop-shadow-md">
              <Pin size={24} fill="currentColor" />
            </div>

            <button 
              onClick={() => removerAviso(aviso.id)}
              className="absolute top-2 right-2 text-black/20 hover:text-black/60"
            >
              <X size={16} />
            </button>

            <h3 className="font-bold text-lg text-slate-800 mt-2 mb-2 leading-tight">{aviso.titulo}</h3>
            <p className="text-slate-700 text-sm font-medium handwriting">{aviso.texto}</p>
          </div>
        ))}
      </div>
    </div>
  );
}