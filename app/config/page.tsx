// src/app/config/page.tsx
"use client";

import { useState } from "react";
import { 
  Save, User, Building, CreditCard, Users, Briefcase, 
  UploadCloud, FileSpreadsheet, FileText, Trash2, Plus, CheckCircle 
} from "lucide-react";

export default function ConfigPage() {
  const [activeTab, setActiveTab] = useState<"geral" | "cadastros" | "importacao">("geral");
  const [loading, setLoading] = useState(false);

  // --- ESTADOS PARA CADASTROS AUXILIARES ---
  const [vendedores, setVendedores] = useState(["João Silva", "Maria Oliveira"]);
  const [novoVendedor, setNovoVendedor] = useState("");

  const [bancos, setBancos] = useState(["Itaú - Ag 0000", "Nubank - PJ"]);
  const [novoBanco, setNovoBanco] = useState("");

  const [servicos, setServicos] = useState(["Consultoria Empresarial", "Criação de Site"]);
  const [novoServico, setNovoServico] = useState("");

  // Funções de Adicionar/Remover
  const addItem = (lista: string[], setLista: any, item: string, setItem: any) => {
    if (!item) return;
    setLista([...lista, item]);
    setItem("");
  };

  const removeItem = (lista: string[], setLista: any, index: number) => {
    setLista(lista.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Configurações e cadastros salvos com sucesso!");
    }, 1000);
  };

  return (
    <div className="max-w-5xl mx-auto pb-10">
      
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
            ⚙️ Configurações do Sistema
          </h1>
          <p className="text-gray-500">Gerencie dados da empresa, cadastros básicos e importações.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 font-medium disabled:opacity-70 w-full md:w-auto justify-center"
        >
          {loading ? "Salvando..." : <><Save size={18} /> Salvar Tudo</>}
        </button>
      </div>

      {/* Navegação de Abas */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 border-b border-gray-200">
        <button 
          onClick={() => setActiveTab("geral")}
          className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 whitespace-nowrap transition-colors ${activeTab === 'geral' ? 'bg-slate-800 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
        >
          <Building size={18}/> Geral & Empresa
        </button>
        <button 
          onClick={() => setActiveTab("cadastros")}
          className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 whitespace-nowrap transition-colors ${activeTab === 'cadastros' ? 'bg-slate-800 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
        >
          <Users size={18}/> Cadastros Auxiliares
        </button>
        <button 
          onClick={() => setActiveTab("importacao")}
          className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 whitespace-nowrap transition-colors ${activeTab === 'importacao' ? 'bg-slate-800 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
        >
          <UploadCloud size={18}/> Importar Dados
        </button>
      </div>

      {/* CONTEÚDO DAS ABAS */}
      
      {/* 1. ABA GERAL (Dados da Empresa) */}
      {activeTab === "geral" && (
        <div className="space-y-6 animate-in fade-in slide-in-from-left-4">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2">
              <User size={20} className="text-blue-500"/> Dados de Acesso
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Admin</label>
                <input type="text" defaultValue="Admin CMG" className="w-full border p-2 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Principal</label>
                <input type="email" defaultValue="admin@cmg.com" className="w-full border p-2 rounded-lg bg-gray-50 text-gray-500" disabled />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2">
              <Building size={20} className="text-blue-500"/> Dados da Empresa (CMG)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Razão Social</label>
                <input type="text" defaultValue="CMG Soluções Ltda" className="w-full border p-2 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CNPJ</label>
                <input type="text" defaultValue="00.000.000/0001-99" className="w-full border p-2 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                <input type="text" defaultValue="(11) 99999-9999" className="w-full border p-2 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. ABA CADASTROS (Vendedores, Bancos, Serviços) */}
      {activeTab === "cadastros" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-right-4">
          
          {/* Card Vendedores */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-fit">
            <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2 border-b pb-2">
              <Users size={20} className="text-green-600"/> Vendedores
            </h3>
            <div className="flex gap-2 mb-4">
              <input 
                placeholder="Nome..." 
                className="border p-2 rounded w-full text-sm"
                value={novoVendedor}
                onChange={e => setNovoVendedor(e.target.value)}
              />
              <button onClick={() => addItem(vendedores, setVendedores, novoVendedor, setNovoVendedor)} className="bg-green-600 text-white p-2 rounded hover:bg-green-700"><Plus size={18}/></button>
            </div>
            <ul className="space-y-2 max-h-48 overflow-y-auto">
              {vendedores.map((v, i) => (
                <li key={i} className="flex justify-between items-center bg-gray-50 p-2 rounded text-sm">
                  <span>{v}</span>
                  <button onClick={() => removeItem(vendedores, setVendedores, i)} className="text-red-400 hover:text-red-600"><Trash2 size={16}/></button>
                </li>
              ))}
            </ul>
          </div>

          {/* Card Bancos */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-fit">
            <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2 border-b pb-2">
              <CreditCard size={20} className="text-blue-600"/> Contas Bancárias
            </h3>
            <div className="flex gap-2 mb-4">
              <input 
                placeholder="Banco - Agência..." 
                className="border p-2 rounded w-full text-sm"
                value={novoBanco}
                onChange={e => setNovoBanco(e.target.value)}
              />
              <button onClick={() => addItem(bancos, setBancos, novoBanco, setNovoBanco)} className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"><Plus size={18}/></button>
            </div>
            <ul className="space-y-2 max-h-48 overflow-y-auto">
              {bancos.map((b, i) => (
                <li key={i} className="flex justify-between items-center bg-gray-50 p-2 rounded text-sm">
                  <span>{b}</span>
                  <button onClick={() => removeItem(bancos, setBancos, i)} className="text-red-400 hover:text-red-600"><Trash2 size={16}/></button>
                </li>
              ))}
            </ul>
          </div>

          {/* Card Serviços */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-fit">
            <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2 border-b pb-2">
              <Briefcase size={20} className="text-purple-600"/> Tipos de Serviços
            </h3>
            <div className="flex gap-2 mb-4">
              <input 
                placeholder="Nome do Serviço..." 
                className="border p-2 rounded w-full text-sm"
                value={novoServico}
                onChange={e => setNovoServico(e.target.value)}
              />
              <button onClick={() => addItem(servicos, setServicos, novoServico, setNovoServico)} className="bg-purple-600 text-white p-2 rounded hover:bg-purple-700"><Plus size={18}/></button>
            </div>
            <ul className="space-y-2 max-h-48 overflow-y-auto">
              {servicos.map((s, i) => (
                <li key={i} className="flex justify-between items-center bg-gray-50 p-2 rounded text-sm">
                  <span>{s}</span>
                  <button onClick={() => removeItem(servicos, setServicos, i)} className="text-red-400 hover:text-red-600"><Trash2 size={16}/></button>
                </li>
              ))}
            </ul>
          </div>

        </div>
      )}

      {/* 3. ABA IMPORTAÇÃO */}
      {activeTab === "importacao" && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl flex items-start gap-3">
            <CheckCircle className="text-blue-600 mt-1" />
            <div>
              <p className="font-bold text-blue-800">Migração de Sistema Antigo</p>
              <p className="text-sm text-blue-700">Use esta área para importar dados históricos. Os arquivos serão processados e adicionados ao banco de dados.</p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-gray-50 transition-all cursor-pointer text-center group">
            <div className="flex justify-center gap-4 mb-4">
              <FileSpreadsheet size={40} className="text-green-600 group-hover:scale-110 transition-transform"/>
              <FileText size={40} className="text-red-600 group-hover:scale-110 transition-transform"/>
            </div>
            <h3 className="text-xl font-bold text-slate-700">Arraste arquivos Excel ou PDF aqui</h3>
            <p className="text-gray-500 mt-2">Suporta .xlsx, .csv e .pdf (Máx 50MB)</p>
            <button className="mt-6 bg-slate-900 text-white px-6 py-2 rounded-lg hover:bg-slate-800">
              Selecionar Arquivos no Computador
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-slate-700 mb-4">Histórico de Importações</h3>
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th className="p-3">Arquivo</th>
                  <th className="p-3">Data</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="p-3 flex items-center gap-2"><FileSpreadsheet size={16} className="text-green-600"/> clientes_antigos.xlsx</td>
                  <td className="p-3 text-gray-500">10/05/2024</td>
                  <td className="p-3"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">CONCLUÍDO</span></td>
                </tr>
                <tr>
                  <td className="p-3 flex items-center gap-2"><FileText size={16} className="text-red-600"/> relatorio_2023.pdf</td>
                  <td className="p-3 text-gray-500">12/05/2024</td>
                  <td className="p-3"><span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-bold">PROCESSANDO IA</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}