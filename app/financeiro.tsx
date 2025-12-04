// src/app/financeiro/page.tsx
"use client"; // Isso permite que a página tenha interatividade (botões, cálculos)

import { useState } from "react";
import { PlusCircle, Trash2, TrendingUp, TrendingDown } from "lucide-react";

// Definindo o tipo de dado para uma transação
type Transacao = {
  id: number;
  descricao: string;
  valor: number;
  tipo: "entrada" | "saida";
};

export default function FinanceiroPage() {
  // Estado para guardar a lista de transações
  const [transacoes, setTransacoes] = useState<Transacao[]>([
    { id: 1, descricao: "Venda de Serviço", valor: 5000, tipo: "entrada" },
    { id: 2, descricao: "Conta de Luz", valor: 350, tipo: "saida" },
  ]);

  // Estados para os campos do formulário
  const [descInput, setDescInput] = useState("");
  const [valorInput, setValorInput] = useState("");
  const [tipoInput, setTipoInput] = useState<"entrada" | "saida">("entrada");

  // Função para adicionar nova transação
  const adicionarTransacao = () => {
    if (!descInput || !valorInput) return alert("Preencha todos os campos!");

    const nova: Transacao = {
      id: Date.now(),
      descricao: descInput,
      valor: Number(valorInput),
      tipo: tipoInput,
    };

    setTransacoes([...transacoes, nova]); // Adiciona à lista
    setDescInput(""); // Limpa o campo
    setValorInput(""); // Limpa o campo
  };

  // Função para remover transação
  const removerTransacao = (id: number) => {
    setTransacoes(transacoes.filter((t) => t.id !== id));
  };

  // Cálculos automáticos
  const entradas = transacoes.filter(t => t.tipo === "entrada").reduce((acc, t) => acc + t.valor, 0);
  const saidas = transacoes.filter(t => t.tipo === "saida").reduce((acc, t) => acc + t.valor, 0);
  const saldo = entradas - saidas;

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        💰 Controle Financeiro
      </h1>

      {/* Cartões de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-green-100 p-6 rounded-xl border border-green-200">
          <p className="text-green-700 font-semibold flex items-center gap-2"><TrendingUp size={18}/> Entradas</p>
          <p className="text-2xl font-bold text-green-800">R$ {entradas.toFixed(2)}</p>
        </div>
        <div className="bg-red-100 p-6 rounded-xl border border-red-200">
          <p className="text-red-700 font-semibold flex items-center gap-2"><TrendingDown size={18}/> Saídas</p>
          <p className="text-2xl font-bold text-red-800">R$ {saidas.toFixed(2)}</p>
        </div>
        <div className={`p-6 rounded-xl border text-white ${saldo >= 0 ? 'bg-slate-800' : 'bg-red-600'}`}>
          <p className="opacity-80 font-semibold">Saldo Total</p>
          <p className="text-2xl font-bold">R$ {saldo.toFixed(2)}</p>
        </div>
      </div>

      {/* Formulário de Adição */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
        <h2 className="text-lg font-bold mb-4">Nova Movimentação</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <input 
            type="text" 
            placeholder="Descrição (ex: Cliente X)" 
            className="border p-2 rounded flex-1"
            value={descInput}
            onChange={(e) => setDescInput(e.target.value)}
          />
          <input 
            type="number" 
            placeholder="Valor (R$)" 
            className="border p-2 rounded w-32"
            value={valorInput}
            onChange={(e) => setValorInput(e.target.value)}
          />
          <select 
            className="border p-2 rounded bg-white"
            value={tipoInput}
            onChange={(e) => setTipoInput(e.target.value as "entrada" | "saida")}
          >
            <option value="entrada">Entrada (+)</option>
            <option value="saida">Saída (-)</option>
          </select>
          <button 
            onClick={adicionarTransacao}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
          >
            <PlusCircle size={20} /> Adicionar
          </button>
        </div>
      </div>

      {/* Lista de Transações */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-semibold text-gray-600">Descrição</th>
              <th className="p-4 font-semibold text-gray-600">Tipo</th>
              <th className="p-4 font-semibold text-gray-600">Valor</th>
              <th className="p-4 font-semibold text-gray-600">Ação</th>
            </tr>
          </thead>
          <tbody>
            {transacoes.map((t) => (
              <tr key={t.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="p-4">{t.descricao}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${t.tipo === 'entrada' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {t.tipo.toUpperCase()}
                  </span>
                </td>
                <td className={`p-4 font-bold ${t.tipo === 'entrada' ? 'text-green-600' : 'text-red-600'}`}>
                  R$ {t.valor.toFixed(2)}
                </td>
                <td className="p-4">
                  <button onClick={() => removerTransacao(t.id)} className="text-red-500 hover:text-red-700">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {transacoes.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-500">
                  Nenhuma movimentação registrada ainda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}