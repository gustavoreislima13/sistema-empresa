// src/app/arquivos/page.tsx
"use client";

import { useState } from "react";
import { FolderOpen, UploadCloud, FileText, Image as ImageIcon, Film, Trash2 } from "lucide-react";

type Arquivo = {
  id: number;
  nome: string;
  tamanho: string;
  tipo: "pdf" | "img" | "video";
  data: string;
};

export default function ArquivosPage() {
  const [arquivos, setArquivos] = useState<Arquivo[]>([
    { id: 1, nome: "Contrato_Social.pdf", tamanho: "2.4 MB", tipo: "pdf", data: "10/05/2024" },
    { id: 2, nome: "Logo_Empresa.png", tamanho: "1.2 MB", tipo: "img", data: "11/05/2024" },
  ]);

  const [isDragging, setIsDragging] = useState(false);

  // Simulação de Upload (Apenas visual por enquanto)
  const simularUpload = () => {
    const novoArquivo: Arquivo = {
      id: Date.now(),
      nome: "Novo_Documento_Scan.pdf",
      tamanho: "3.5 MB",
      tipo: "pdf",
      data: new Date().toLocaleDateString()
    };
    setArquivos([novoArquivo, ...arquivos]);
  };

  const getIcone = (tipo: string) => {
    if (tipo === "pdf") return <FileText className="text-red-500" />;
    if (tipo === "img") return <ImageIcon className="text-blue-500" />;
    return <Film className="text-purple-500" />;
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        📂 Gestor de Arquivos
      </h1>

      {/* Área de Dropzone (Upload) */}
      <div 
        className={`border-2 border-dashed rounded-xl p-12 mb-8 text-center transition-colors cursor-pointer
          ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400 hover:bg-slate-50'}`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => { e.preventDefault(); setIsDragging(false); simularUpload(); }}
        onClick={simularUpload}
      >
        <div className="flex flex-col items-center justify-center gap-4 text-gray-500">
          <div className="bg-blue-100 p-4 rounded-full text-blue-600">
            <UploadCloud size={32} />
          </div>
          <div>
            <p className="text-lg font-semibold text-slate-700">Clique ou arraste arquivos aqui</p>
            <p className="text-sm">Suporta PDF, PNG, JPG (Simulação)</p>
          </div>
        </div>
      </div>

      {/* Lista de Arquivos */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 border-b font-semibold text-gray-700 flex justify-between items-center">
          <span>Arquivos Recentes</span>
          <span className="text-xs font-normal text-gray-500">{arquivos.length} itens</span>
        </div>
        <div className="divide-y">
          {arquivos.map((arq) => (
            <div key={arq.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center gap-4">
                <div className="bg-gray-100 p-2 rounded-lg">
                  {getIcone(arq.tipo)}
                </div>
                <div>
                  <p className="font-medium text-slate-800">{arq.nome}</p>
                  <p className="text-xs text-gray-500">{arq.tamanho} • {arq.data}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <button className="text-sm text-blue-600 hover:underline font-medium">Baixar</button>
                <button onClick={() => setArquivos(arquivos.filter(a => a.id !== arq.id))} className="text-gray-400 hover:text-red-500">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}