"use client";

import { useState } from "react";
import { Search, Plus, Trash2, User, Phone, Mail, Edit, Save, X } from "lucide-react";

type Cliente = {
  id: number;
  nome: string;
  cpf: string;
  celular: string;
  email: string;
  dataCadastro: string;
};

export default function CRMPage() {
  // Lista inicial
  const [clientes, setClientes] = useState<Cliente[]>([
    { id: 1, nome: "Carlos Silva", cpf: "123.456.789-00", celular: "11 99999-0000", email: "carlos@email.com", dataCadastro: "2024-01-15" },
    { id: 2, nome: "Ana Pereira", cpf: "987.654.321-11", celular: "11 98888-1111", email: "ana@email.com", dataCadastro: "2024-02-20" },
  ]);

  // Estado do Formulário
  const [form, setForm] = useState<Partial<Cliente>>({});
  const [modoEdicao, setModoEdicao] = useState<number | null>(null);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [busca, setBusca] = useState("");

  // Função de Busca (Nome ou CPF)
  const clientesFiltrados = clientes.filter(c => 
    c.nome.toLowerCase().includes(busca.toLowerCase()) || 
    c.cpf.includes(busca)
  );

  const salvarCliente = () => {
    if (!form.nome || !form.cpf) return alert("Nome e CPF são obrigatórios");

    if (modoEdicao) {
      // Editar Existente
      setClientes(clientes.map(c => c.id === modoEdicao ? { ...c, ...form } as Cliente : c));
      setModoEdicao(null);
    } else {
      // Criar Novo
      const novo: Cliente = {
        id: Date.now(),
        nome: form.nome!,
        cpf: form.cpf!,
        celular: form.celular || "",
        email: form.email || "",
        dataCadastro: new Date().toISOString().split("T")[0] // Data de hoje
      };
      setClientes([...clientes, novo]);
    }
    setForm({});
    setMostrarForm(false);
  };

  const prepararEdicao = (cliente: Cliente) => {
    setForm(cliente);
    setModoEdicao(cliente.id);
    setMostrarForm(true);
  };

  const removerCliente = (id: number) => {
    if(confirm("Tem certeza que deseja excluir este cliente?")) {
      setClientes(clientes.filter(c => c.id !== id));
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">📇 CRM de Clientes</h1>
        <button 
          onClick={() => { setForm({}); setModoEdicao(null); setMostrarForm(!mostrarForm); }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          {mostrarForm ? <X size={20}/> : <Plus size={20} />} {mostrarForm ? "Cancelar" : "Novo Cliente"}
        </button>
      </div>

      {/* Formulário */}
      {mostrarForm && (
        <div className="bg-white p-6 rounded-xl shadow-md border border-blue-100 mb-8">
          <h3 className="font-bold text-slate-700 mb-4">{modoEdicao ? "Editar Cliente" : "Cadastrar Cliente"}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <input placeholder="Nome Completo" className="border p-2 rounded" value={form.nome || ""} onChange={e => setForm({...form, nome: e.target.value})} />
            <input placeholder="CPF (000.000.000-00)" className="border p-2 rounded" value={form.cpf || ""} onChange={e => setForm({...form, cpf: e.target.value})} />
            <input placeholder="Celular" className="border p-2 rounded" value={form.celular || ""} onChange={e => setForm({...form, celular: e.target.value})} />
            <input placeholder="Email" className="border p-2 rounded" value={form.email || ""} onChange={e => setForm({...form, email: e.target.value})} />
          </div>
          <button onClick={salvarCliente} className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 w-full md:w-auto flex items-center justify-center gap-2">
            <Save size={18}/> Salvar
          </button>
        </div>
      )}

      {/* Busca */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        <input 
          type="text" 
          placeholder="Buscar por Nome ou CPF..." 
          className="w-full pl-10 p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      {/* Lista */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clientesFiltrados.map((cliente) => (
          <div key={cliente.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative group hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                <User size={24} />
              </div>
              <span className="text-xs text-gray-400">Desde: {cliente.dataCadastro}</span>
            </div>
            
            <h3 className="font-bold text-lg text-slate-800">{cliente.nome}</h3>
            <p className="text-sm text-slate-500 font-mono bg-slate-100 px-2 py-1 rounded w-fit mt-1 mb-3">{cliente.cpf}</p>
            
            <div className="space-y-1 text-sm text-slate-600">
              <p className="flex items-center gap-2"><Mail size={16} className="text-gray-400"/> {cliente.email}</p>
              <p className="flex items-center gap-2"><Phone size={16} className="text-gray-400"/> {cliente.celular}</p>
            </div>

            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => prepararEdicao(cliente)} className="text-blue-400 hover:text-blue-600"><Edit size={18} /></button>
              <button onClick={() => removerCliente(cliente.id)} className="text-gray-300 hover:text-red-500"><Trash2 size={18} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}