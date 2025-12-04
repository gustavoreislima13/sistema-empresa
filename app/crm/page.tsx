// src/app/crm/page.tsx
"use client";

import { useState } from "react";
import { Search, Plus, Trash2, User, Phone, Mail, Building } from "lucide-react";

type Cliente = {
  id: number;
  nome: string;
  empresa: string;
  email: string;
  telefone: string;
  status: "ativo" | "inativo";
};

export default function CRMPage() {
  // Dados iniciais (fictícios)
  const [clientes, setClientes] = useState<Cliente[]>([
    { id: 1, nome: "Carlos Silva", empresa: "Tech Soluções", email: "carlos@tech.com", telefone: "11 99999-0000", status: "ativo" },
    { id: 2, nome: "Ana Pereira", empresa: "Marketing Digital Ltda", email: "ana@mkt.com", telefone: "11 98888-1111", status: "ativo" },
  ]);

  // Estados do formulário
  const [novoCliente, setNovoCliente] = useState({ nome: "", empresa: "", email: "", telefone: "" });
  const [busca, setBusca] = useState("");
  const [mostrandoForm, setMostrandoForm] = useState(false);

  // Filtrar clientes na busca
  const clientesFiltrados = clientes.filter(c => 
    c.nome.toLowerCase().includes(busca.toLowerCase()) || 
    c.empresa.toLowerCase().includes(busca.toLowerCase())
  );

  const adicionarCliente = () => {
    if (!novoCliente.nome || !novoCliente.email) return alert("Preencha pelo menos Nome e Email.");
    
    setClientes([...clientes, { ...novoCliente, id: Date.now(), status: "ativo" }]);
    setNovoCliente({ nome: "", empresa: "", email: "", telefone: "" });
    setMostrandoForm(false);
  };

  const removerCliente = (id: number) => {
    if(confirm("Remover este cliente?")) {
      setClientes(clientes.filter(c => c.id !== id));
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
            📇 CRM de Clientes
          </h1>
          <p className="text-gray-500">Gerencie seus contatos e leads</p>
        </div>
        
        <button 
          onClick={() => setMostrandoForm(!mostrandoForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors"
        >
          <Plus size={20} /> {mostrandoForm ? "Cancelar" : "Novo Cliente"}
        </button>
      </div>

      {/* Formulário de Adição (Aparece só quando clica no botão) */}
      {mostrandoForm && (
        <div className="bg-white p-6 rounded-xl shadow-md border border-blue-100 mb-8 animate-in fade-in slide-in-from-top-4">
          <h3 className="font-bold text-slate-700 mb-4">Adicionar Novo Cliente</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input placeholder="Nome Completo" className="border p-2 rounded" value={novoCliente.nome} onChange={e => setNovoCliente({...novoCliente, nome: e.target.value})} />
            <input placeholder="Empresa" className="border p-2 rounded" value={novoCliente.empresa} onChange={e => setNovoCliente({...novoCliente, empresa: e.target.value})} />
            <input placeholder="Email" className="border p-2 rounded" value={novoCliente.email} onChange={e => setNovoCliente({...novoCliente, email: e.target.value})} />
            <input placeholder="Telefone" className="border p-2 rounded" value={novoCliente.telefone} onChange={e => setNovoCliente({...novoCliente, telefone: e.target.value})} />
          </div>
          <button onClick={adicionarCliente} className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 w-full md:w-auto">Salvar Cliente</button>
        </div>
      )}

      {/* Barra de Busca */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        <input 
          type="text" 
          placeholder="Buscar por nome ou empresa..." 
          className="w-full pl-10 p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      {/* Lista de Cards de Clientes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clientesFiltrados.map((cliente) => (
          <div key={cliente.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow relative group">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                <User size={24} />
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${cliente.status === 'ativo' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                {cliente.status.toUpperCase()}
              </span>
            </div>
            
            <h3 className="font-bold text-lg text-slate-800">{cliente.nome}</h3>
            <p className="text-sm text-gray-500 mb-4 flex items-center gap-1"><Building size={14}/> {cliente.empresa}</p>
            
            <div className="space-y-2 text-sm text-slate-600">
              <p className="flex items-center gap-2"><Mail size={16} className="text-gray-400"/> {cliente.email}</p>
              <p className="flex items-center gap-2"><Phone size={16} className="text-gray-400"/> {cliente.telefone}</p>
            </div>

            <button 
              onClick={() => removerCliente(cliente.id)}
              className="absolute top-4 right-4 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}