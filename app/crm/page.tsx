"use client";

import { useState, useEffect } from "react";
import { Search, Plus, Trash2, User, Phone, Mail, Edit, Save, X, Loader2 } from "lucide-react";
// Importamos a conexão que criamos
import { supabase } from "../lib/supabase"; 

type Cliente = {
  id: number;
  nome: string;
  cpf: string;
  celular: string;
  email: string;
  created_at?: string; // Supabase cria isso automaticamente
};

export default function CRMPage() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);

  // Estado do Formulário
  const [form, setForm] = useState<Partial<Cliente>>({});
  const [modoEdicao, setModoEdicao] = useState<number | null>(null);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [busca, setBusca] = useState("");

  // 1. BUSCAR DADOS DO SUPABASE (SELECT)
  const fetchClientes = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('clientes')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      console.error('Erro ao buscar clientes:', error);
      alert('Erro ao carregar clientes.');
    } else {
      setClientes(data || []);
    }
    setLoading(false);
  };

  // Carregar dados ao iniciar a página
  useEffect(() => {
    fetchClientes();
  }, []);

  // 2. SALVAR OU ATUALIZAR (INSERT / UPDATE)
  const salvarCliente = async () => {
    if (!form.nome || !form.cpf) return alert("Nome e CPF são obrigatórios");

    const dadosCliente = {
      nome: form.nome,
      cpf: form.cpf,
      celular: form.celular || "",
      email: form.email || "",
    };

    if (modoEdicao) {
      // Editar Existente no Supabase
      const { error } = await supabase
        .from('clientes')
        .update(dadosCliente)
        .eq('id', modoEdicao);

      if (error) return alert("Erro ao atualizar: " + error.message);

    } else {
      // Criar Novo no Supabase
      const { error } = await supabase
        .from('clientes')
        .insert([dadosCliente]);

      if (error) return alert("Erro ao criar: " + error.message);
    }

    // Limpar e Recarregar
    setForm({});
    setModoEdicao(null);
    setMostrarForm(false);
    fetchClientes(); // Atualiza a lista na tela
  };

  const prepararEdicao = (cliente: Cliente) => {
    setForm(cliente);
    setModoEdicao(cliente.id);
    setMostrarForm(true);
  };

  // 3. REMOVER (DELETE)
  const removerCliente = async (id: number) => {
    if(confirm("Tem certeza que deseja excluir este cliente do banco de dados?")) {
      const { error } = await supabase
        .from('clientes')
        .delete()
        .eq('id', id);

      if (error) {
        alert("Erro ao apagar");
      } else {
        fetchClientes(); // Atualiza a lista
      }
    }
  };

  // Função de Busca (Front-end filtering)
  const clientesFiltrados = clientes.filter(c => 
    c.nome.toLowerCase().includes(busca.toLowerCase()) || 
    (c.cpf && c.cpf.includes(busca))
  );

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
        <div className="bg-white p-6 rounded-xl shadow-md border border-blue-100 mb-8 animate-in slide-in-from-top-2">
          <h3 className="font-bold text-slate-700 mb-4">{modoEdicao ? "Editar Cliente" : "Cadastrar Cliente"}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <input placeholder="Nome Completo" className="border p-2 rounded" value={form.nome || ""} onChange={e => setForm({...form, nome: e.target.value})} />
            <input placeholder="CPF (000.000.000-00)" className="border p-2 rounded" value={form.cpf || ""} onChange={e => setForm({...form, cpf: e.target.value})} />
            <input placeholder="Celular" className="border p-2 rounded" value={form.celular || ""} onChange={e => setForm({...form, celular: e.target.value})} />
            <input placeholder="Email" className="border p-2 rounded" value={form.email || ""} onChange={e => setForm({...form, email: e.target.value})} />
          </div>
          <button onClick={salvarCliente} className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 w-full md:w-auto flex items-center justify-center gap-2">
            <Save size={18}/> Salvar no Banco
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

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center p-10 text-gray-500">
          <Loader2 className="animate-spin mr-2"/> Carregando dados...
        </div>
      )}

      {/* Lista */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {!loading && clientesFiltrados.map((cliente) => (
          <div key={cliente.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative group hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                <User size={24} />
              </div>
              {/* Data formatada */}
              <span className="text-xs text-gray-400">
                {cliente.created_at ? new Date(cliente.created_at).toLocaleDateString('pt-BR') : '-'}
              </span>
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