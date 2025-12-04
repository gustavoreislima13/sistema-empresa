// src/app/vendas/page.tsx
"use client";

import { useState } from "react";
import { ShoppingBag, Plus, User, Calendar, CheckCircle, Clock } from "lucide-react";

type Venda = {
  id: number;
  cliente: string;
  produto: string;
  valor: number;
  status: "pago" | "pendente";
  data: string;
};

export default function VendasPage() {
  // Lista fictícia de clientes (futuramente virá do Banco de Dados)
  const clientesDisponiveis = ["Carlos Silva", "Ana Pereira", "Tech Soluções", "Marketing Ltda"];

  const [vendas, setVendas] = useState<Venda[]>([
    { id: 1, cliente: "Carlos Silva", produto: "Consultoria SEO", valor: 1500, status: "pago", data: "2024-05-10" },
    { id: 2, cliente: "Tech Soluções", produto: "Website Institucional", valor: 4500, status: "pendente", data: "2024-05-12" },
  ]);

  const [novaVenda, setNovaVenda] = useState({ cliente: "", produto: "", valor: "", status: "pendente" });

  const registrarVenda = () => {
    if (!novaVenda.cliente || !novaVenda.produto || !novaVenda.valor) return alert("Preencha todos os campos!");

    const venda: Venda = {
      id: Date.now(),
      cliente: novaVenda.cliente,
      produto: novaVenda.produto,
      valor: Number(novaVenda.valor),
      status: novaVenda.status as "pago" | "pendente",
      data: new Date().toISOString().split('T')[0] // Data de hoje formatada
    };

    setVendas([venda, ...vendas]);
    setNovaVenda({ cliente: "", produto: "", valor: "", status: "pendente" });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
        👥 Gestão de Vendas
      </h1>

      {/* Formulário de Nova Venda */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-sm font-bold text-gray-500 uppercase mb-4">Registrar Nova Venda</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          
          <div>
            <label className="text-xs font-semibold text-gray-500">Cliente</label>
            <select 
              className="w-full border p-2.5 rounded-lg bg-white"
              value={novaVenda.cliente}
              onChange={e => setNovaVenda({...novaVenda, cliente: e.target.value})}
            >
              <option value="">Selecione...</option>
              {clientesDisponiveis.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500">Produto/Serviço</label>
            <input 
              type="text" 
              placeholder="Ex: Criação de Logo" 
              className="w-full border p-2.5 rounded-lg"
              value={novaVenda.produto}
              onChange={e => setNovaVenda({...novaVenda, produto: e.target.value})}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500">Valor (R$)</label>
            <input 
              type="number" 
              placeholder="0.00" 
              className="w-full border p-2.5 rounded-lg"
              value={novaVenda.valor}
              onChange={e => setNovaVenda({...novaVenda, valor: e.target.value})}
            />
          </div>

          <button 
            onClick={registrarVenda}
            className="bg-blue-600 text-white p-2.5 rounded-lg hover:bg-blue-700 flex justify-center items-center gap-2 font-medium"
          >
            <Plus size={20} /> Registrar
          </button>
        </div>
      </div>

      {/* Lista de Vendas Recentes */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-medium text-gray-500">Cliente</th>
              <th className="p-4 font-medium text-gray-500">Serviço</th>
              <th className="p-4 font-medium text-gray-500">Data</th>
              <th className="p-4 font-medium text-gray-500">Valor</th>
              <th className="p-4 font-medium text-gray-500">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {vendas.map((v) => (
              <tr key={v.id} className="hover:bg-gray-50">
                <td className="p-4 flex items-center gap-2 font-medium text-slate-700">
                  <User size={16} className="text-gray-400"/> {v.cliente}
                </td>
                <td className="p-4 text-gray-600">{v.produto}</td>
                <td className="p-4 text-gray-500 text-sm flex items-center gap-1">
                  <Calendar size={14}/> {v.data}
                </td>
                <td className="p-4 font-bold text-slate-700">R$ {v.valor.toFixed(2)}</td>
                <td className="p-4">
                  <span className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full w-fit ${
                    v.status === 'pago' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {v.status === 'pago' ? <CheckCircle size={12}/> : <Clock size={12}/>}
                    {v.status.toUpperCase()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}