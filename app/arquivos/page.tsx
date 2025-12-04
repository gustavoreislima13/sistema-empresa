"use client";

import { useState } from "react";
import { FolderOpen, UploadCloud, FileText, Image as ImageIcon, Film, Trash2, Search, User, Calendar } from "lucide-react";

type Arquivo = {
  id: number;
  nome: string;
  cliente: string; // Novo campo para busca
  tamanho: string;
  tipo: "pdf" | "img" | "video" | "outro";
  data: string;
};

export default function ArquivosPage() {
  // Dados simulados
  const [arquivos, setArquivos] = useState<Arquivo[]>([
    { id: 1, nome: "Contrato_Social.pdf", cliente: "CMG", tamanho: "2.4 MB", tipo: "pdf", data: "2024-05-10" },
    { id: 2, nome: "Logo_Versao_Final.png", cliente: "Everton Guerra", tamanho: "1.2 MB", tipo: "img", data: "2024-05-12" },
    { id: 3, nome: "Video_Institucional.mp4", cliente: "Tech Soluções", tamanho: "45.0 MB", tipo: "video", data: "2024-05-15" },
    { id: 4, nome: "Comprovante_Pagto.pdf", cliente: "Ana Pereira", tamanho: "0.5 MB", tipo: "pdf", data: "2024-05-18" },
  ]);

  const [busca, setBusca] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  // Lógica de Filtragem (Busca por Nome, Cliente ou Data)
  const arquivosFiltrados = arquivos.filter(arq => 
    arq.nome.toLowerCase().includes(busca.toLowerCase()) || 
    arq.cliente.toLowerCase().includes(busca.toLowerCase()) || 
    arq.data.includes(busca)
  );

  // Simulação de Upload
  const simularUpload = () => {
    const novoArquivo: Arquivo = {
      id: Date.now(),
      nome: "Novo_Documento_Digitalizado.pdf",
      cliente: "Sem Cliente Definido", // Padrão
      tamanho: "3.5 MB",
      tipo: "pdf",
      data: new Date().toISOString().split('T')[0] // Data formato YYYY-MM-DD
    };
    setArquivos([novoArquivo, ...arquivos]);
  };

  const getIcone = (tipo: string) => {
    if (tipo === "pdf") return <FileText className="text-red-500" />;
    if (tipo === "img") return <ImageIcon className="text-blue-500" />;
    if (tipo === "video") return <Film className="text-purple-500" />;
    return <FolderOpen className="text-gray-500" />;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
            📂 Gestor de Arquivos
          </h1>
          <p className="text-gray-500">Armazene e busque documentos por cliente ou data.</p>
        </div>
      </div>

      {/* Área de Dropzone (Upload) */}
      <div 
        className={`border-2 border-dashed rounded-xl p-10 text-center transition-all cursor-pointer group
          ${isDragging ? 'border-blue-500 bg-blue-50 scale-[1.01]' : 'border-gray-300 hover:border-blue-400 hover:bg-slate-50'}`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => { e.preventDefault(); setIsDragging(false); simularUpload(); }}
        onClick={simularUpload}
      >
        <div className="flex flex-col items-center justify-center gap-3 text-gray-500 group-hover:text-blue-600 transition-colors">
          <div className="bg-blue-100 p-4 rounded-full text-blue-600 mb-2">
            <UploadCloud size={32} />
          </div>
          <div>
            <p className="text-lg font-bold text-slate-700">Clique para enviar ou arraste aqui</p>
            <p className="text-sm">Suporta PDF, Imagens e Vídeos (Simulação)</p>
          </div>
        </div>
      </div>

      {/* Barra de Busca */}
      <div className="relative">
        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        <input 
          type="text" 
          placeholder="🔍 Buscar por nome do arquivo, nome do cliente ou data (ex: 2024-05)..." 
          className="w-full pl-10 p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm text-lg"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      {/* Lista de Arquivos */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
          <h3 className="font-semibold text-gray-700">Arquivos Recentes</h3>
          <span className="text-xs bg-white border px-2 py-1 rounded text-gray-500">
            {arquivosFiltrados.length} encontrados
          </span>
        </div>
        
        <div className="divide-y divide-gray-100">
          {arquivosFiltrados.map((arq) => (
            <div key={arq.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between hover:bg-blue-50/50 transition-colors gap-4">
              
              {/* Informações do Arquivo */}
              <div className="flex items-center gap-4 flex-1">
                <div className="bg-white border p-3 rounded-xl shadow-sm">
                  {getIcone(arq.tipo)}
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-lg">{arq.nome}</p>
                  <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                    <span className="flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded text-xs font-medium">
                      <User size={12} /> {arq.cliente}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={12} /> {arq.data}
                    </span>
                    <span>• {arq.tamanho}</span>
                  </div>
                </div>
              </div>
              
              {/* Ações */}
              <div className="flex items-center gap-3 md:border-l md:pl-6 border-gray-100">
                <button className="px-4 py-2 text-sm text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 font-medium transition-colors">
                  Baixar
                </button>
                <button 
                  onClick={() => setArquivos(arquivos.filter(a => a.id !== arq.id))} 
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Excluir Arquivo"
                >
                  <Trash2 size={20} />
                </button>
              </div>

            </div>
          ))}
          
          {arquivosFiltrados.length === 0 && (
            <div className="p-10 text-center text-gray-400">
              <FolderOpen size={40} className="mx-auto mb-2 opacity-20"/>
              <p>Nenhum arquivo encontrado para sua busca.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}