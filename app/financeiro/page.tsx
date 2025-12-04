// src/app/financeiro/page.tsx
"use client";

import { useState } from "react";
import { PlusCircle, Trash2, Edit, Save, X, Paperclip, Search, ArrowRight, ArrowUpCircle, ArrowDownCircle, Briefcase } from "lucide-react";

type Transacao = {
  id: number;
  empresa: "CMG" | "Everton Guerra";
  tipo: "Receita" | "Despesa";
  
  // Campos Comuns
  descricao: string; 
  valor: number;
  data: string;
  obs: string;
  banco: string; 

  // Campos Específicos de DESPESA
  contaDestino?: string; 
  categoria?: string; 

  // Campos Específicos de VENDA (Receita)
  clienteNome?: string;
  clienteCpf?: string;
  servico?: string;
  consultor?: string; // NOVO CAMPO: Quem vendeu?
};

export default function FinanceiroPage() {
  // Lista de Consultores (Simulação - Futuramente virá do Banco de Dados)
  const consultoresDisponiveis = ["João Silva", "Maria Oliveira", "Pedro Santos", "Ana Costa"];

  const [transacoes, setTransacoes] = useState<Transacao[]>([
    { 
      id: 1, empresa: "CMG", tipo: "Despesa", descricao: "Conta de Luz", 
      valor: 350.50, data: "2024-05-15", banco: "Caixa Empresa", contaDestino: "CPFL", 
      categoria: "Infraestrutura", obs: "Ref. Maio" 
    },
    { 
      id: 2, empresa: "Everton Guerra", tipo: "Receita", descricao: "Venda Consultoria", 
      valor: 5000.00, data: "2024-05-16", banco: "Itaú", clienteNome: "Carlos Souza", 
      servico: "Mentoria Empresarial", consultor: "João Silva", obs: "Primeira parcela" 
    }
  ]);

  const [form, setForm] = useState<Partial<Transacao>>({ empresa: "CMG", tipo: "Receita" });
  const [modoEdicao, setModoEdicao] = useState<number | null>(null);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [busca, setBusca] = useState("");

  // Busca Inteligente
  const transacoesFiltradas = transacoes.filter(t => 
    t.descricao.toLowerCase().includes(busca.toLowerCase()) || 
    t.clienteNome?.toLowerCase().includes(busca.toLowerCase()) ||
    t.consultor?.toLowerCase().includes(busca.toLowerCase()) || // Busca também por consultor
    t.empresa.toLowerCase().includes(busca.toLowerCase())
  );

  // Cálculos
  const totalReceitas = transacoesFiltradas.filter(t => t.tipo === "Receita").reduce((acc, t) => acc + t.valor, 0);
  const totalDespesas = transacoesFiltradas.filter(t => t.tipo === "Despesa").reduce((acc, t) => acc + t.valor, 0);
  const saldo = totalReceitas - totalDespesas;

  const salvarTransacao = () => {
    if (!form.descricao || !form.valor || !form.banco) return alert("Preencha a descrição, valor e banco.");
    
    // Validação extra para receitas
    if (form.tipo === "Receita" && !form.consultor) return alert("Selecione o consultor responsável pela venda.");

    const nova: Transacao = {
      ...form,
      valor: Number(form.valor),
      id: modoEdicao || Date.now(),
      data: form.data || new Date().toISOString().split("T")[0],
      obs: form.obs || "",
    } as Transacao;

    if (modoEdicao) {
      setTransacoes(transacoes.map(t => t.id === modoEdicao ? nova : t));
      setModoEdicao(null);
    } else {
      setTransacoes([nova, ...transacoes]);
    }
    setForm({ empresa: "CMG", tipo: "Receita" });
    setMostrarForm(false);
  };

  const prepararEdicao = (t: Transacao) => {
    setForm(t);
    setModoEdicao(t.id);
    setMostrarForm(true);
  };

  const removerTransacao = (id: number) => {
    if(confirm("Remover este lançamento?")) setTransacoes(transacoes.filter(t => t.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Cabeçalho e Totais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center mb-4">
        <h1 className="text-3xl font-bold text-slate-800 col-span-1 md:col-span-4 lg:col-span-1">💰 Financeiro</h1>
        
        <div className="bg-green-100 p-3 rounded-lg border border-green-200 text-green-800 flex justify-between items-center">
          <span className="text-sm font-semibold">Entradas</span>
          <span className="font-bold">R$ {totalReceitas.toFixed(2)}</span>
        </div>
        <div className="bg-red-100 p-3 rounded-lg border border-red-200 text-red-800 flex justify-between items-center">
          <span className="text-sm font-semibold">Saídas</span>
          <span className="font-bold">R$ {totalDespesas.toFixed(2)}</span>
        </div>
        <div className={`p-3 rounded-lg border text-white flex justify-between items-center ${saldo >= 0 ? 'bg-slate-800' : 'bg-red-600'}`}>
          <span className="text-sm font-semibold">Saldo</span>
          <span className="font-bold">R$ {saldo.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex justify-end">
        <button onClick={() => { setForm({ empresa: "CMG", tipo: "Receita" }); setModoEdicao(null); setMostrarForm(!mostrarForm); }} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-all shadow-sm">
          {mostrarForm ? <X size={20}/> : <PlusCircle size={20} />} {mostrarForm ? "Cancelar" : "Novo Lançamento"}
        </button>
      </div>

      {/* FORMULÁRIO */}
      {mostrarForm && (
        <div className={`p-6 rounded-xl shadow-md border animate-in slide-in-from-top-4 ${form.tipo === 'Receita' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
          
          {/* Seleção de Tipo e Empresa */}
          <div className="flex flex-col md:flex-row justify-between mb-6 gap-4 border-b pb-4 border-gray-200/50">
            <div className="flex gap-4">
              <button onClick={() => setForm({...form, tipo: "Receita"})} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-colors ${form.tipo === "Receita" ? 'bg-green-600 text-white shadow-md' : 'bg-white text-gray-500'}`}>
                <ArrowUpCircle size={20}/> RECEITA (Venda)
              </button>
              <button onClick={() => setForm({...form, tipo: "Despesa"})} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-colors ${form.tipo === "Despesa" ? 'bg-red-600 text-white shadow-md' : 'bg-white text-gray-500'}`}>
                <ArrowDownCircle size={20}/> DESPESA (Pagto)
              </button>
            </div>

            <div className="flex gap-4 items-center bg-white px-4 py-2 rounded-lg border">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="empresa" checked={form.empresa === "CMG"} onChange={() => setForm({...form, empresa: "CMG"})} className="accent-blue-600 w-4 h-4"/>
                <span className="font-bold text-slate-700 text-sm">CMG</span>
              </label>
              <div className="h-4 w-px bg-gray-300"></div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="empresa" checked={form.empresa === "Everton Guerra"} onChange={() => setForm({...form, empresa: "Everton Guerra"})} className="accent-green-600 w-4 h-4"/>
                <span className="font-bold text-slate-700 text-sm">Everton Guerra</span>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Campos Comuns */}
            <div className="col-span-1 md:col-span-2">
              <label className="text-xs font-bold text-gray-500 uppercase">Descrição / Título</label>
              <input placeholder={form.tipo === "Receita" ? "Ex: Venda Site Institucional" : "Ex: Conta de Luz"} className="w-full border p-2 rounded bg-white" value={form.descricao || ""} onChange={e => setForm({...form, descricao: e.target.value})} />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase">Valor (R$)</label>
              <input type="number" className="w-full border p-2 rounded bg-white font-bold text-lg" value={form.valor || ""} onChange={e => setForm({...form, valor: Number(e.target.value)})} />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase">Data</label>
              <input type="date" className="w-full border p-2 rounded bg-white" value={form.data || ""} onChange={e => setForm({...form, data: e.target.value})} />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase">{form.tipo === "Receita" ? "Banco Entrada" : "Conta Origem (Saiu de)"}</label>
              <input placeholder="Ex: Itaú, Caixa, Cofre" className="w-full border p-2 rounded bg-white" value={form.banco || ""} onChange={e => setForm({...form, banco: e.target.value})} />
            </div>

            {/* CAMPOS ESPECÍFICOS: SE FOR RECEITA (Venda) */}
            {form.tipo === "Receita" && (
              <>
                <div className="bg-green-100/50 p-2 rounded border border-green-100">
                   <label className="text-xs font-bold text-green-700 uppercase">Nome do Cliente</label>
                   <input placeholder="Cliente..." className="w-full border p-2 rounded bg-white" value={form.clienteNome || ""} onChange={e => setForm({...form, clienteNome: e.target.value})} />
                </div>
                <div className="bg-green-100/50 p-2 rounded border border-green-100">
                   <label className="text-xs font-bold text-green-700 uppercase">CPF / CNPJ</label>
                   <input placeholder="000.000.000-00" className="w-full border p-2 rounded bg-white" value={form.clienteCpf || ""} onChange={e => setForm({...form, clienteCpf: e.target.value})} />
                </div>
                <div className="bg-green-100/50 p-2 rounded border border-green-100">
                   <label className="text-xs font-bold text-green-700 uppercase">Serviço / Produto</label>
                   <input placeholder="Ex: Consultoria" className="w-full border p-2 rounded bg-white" value={form.servico || ""} onChange={e => setForm({...form, servico: e.target.value})} />
                </div>
                {/* --- NOVO CAMPO DE CONSULTOR --- */}
                <div className="bg-green-100/50 p-2 rounded border border-green-100">
                   <label className="text-xs font-bold text-green-700 uppercase flex items-center gap-1"><Briefcase size={12}/> Consultor</label>
                   <select 
                      className="w-full border p-2 rounded bg-white"
                      value={form.consultor || ""}
                      onChange={e => setForm({...form, consultor: e.target.value})}
                   >
                      <option value="">Selecione...</option>
                      {consultoresDisponiveis.map(c => <option key={c} value={c}>{c}</option>)}
                   </select>
                </div>
              </>
            )}

            {/* CAMPOS ESPECÍFICOS: SE FOR DESPESA */}
            {form.tipo === "Despesa" && (
              <>
                <div className="col-span-1 md:col-span-2 bg-red-100/50 p-2 rounded border border-red-100">
                   <label className="text-xs font-bold text-red-700 uppercase">Conta Destino (Para quem?)</label>
                   <input placeholder="Fornecedor X" className="w-full border p-2 rounded bg-white" value={form.contaDestino || ""} onChange={e => setForm({...form, contaDestino: e.target.value})} />
                </div>
                <div className="col-span-1 md:col-span-2 bg-red-100/50 p-2 rounded border border-red-100">
                   <label className="text-xs font-bold text-red-700 uppercase">Categoria</label>
                   <input placeholder="Ex: Infraestrutura, Pessoal" className="w-full border p-2 rounded bg-white" value={form.categoria || ""} onChange={e => setForm({...form, categoria: e.target.value})} />
                </div>
              </>
            )}

            <div className="col-span-1 md:col-span-4">
               <label className="text-xs font-bold text-gray-500 uppercase">Observações</label>
               <input placeholder="Detalhes adicionais..." className="w-full border p-2 rounded bg-white" value={form.obs || ""} onChange={e => setForm({...form, obs: e.target.value})} />
            </div>

            <div className="col-span-1 md:col-span-4 border-2 border-dashed border-gray-300 p-3 rounded text-center text-sm text-gray-500 cursor-pointer hover:bg-white/80 transition-colors">
              <div className="flex justify-center items-center gap-2">
                <Paperclip size={18}/> {form.tipo === 'Receita' ? 'Anexar Contrato / Comprovante' : 'Anexar Boleto / Nota Fiscal'} (Simulação)
              </div>
            </div>
          </div>

          <button onClick={salvarTransacao} className={`mt-6 w-full py-3 rounded-lg text-white font-bold flex items-center justify-center gap-2 ${form.tipo === 'Receita' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}>
            <Save size={20}/> {form.tipo === 'Receita' ? 'Registrar Entrada' : 'Registrar Saída'}
          </button>
        </div>
      )}

      {/* Busca */}
      <div className="relative">
        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        <input type="text" placeholder="Buscar por descrição, cliente, consultor..." className="w-full pl-10 p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" value={busca} onChange={(e) => setBusca(e.target.value)} />
      </div>

      {/* Lista de Transações */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden overflow-x-auto">
        <table className="w-full text-left min-w-[900px]">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 text-sm font-semibold text-gray-600">Empresa / Data</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Descrição</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Detalhes</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Movimentação</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Valor</th>
              <th className="p-4 text-sm font-semibold text-gray-600 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {transacoesFiltradas.map((t) => (
              <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${t.empresa === 'CMG' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>{t.empresa}</span>
                  <div className="text-xs text-gray-400 mt-1">{t.data}</div>
                </td>
                
                <td className="p-4">
                  <div className="font-bold text-slate-700">{t.descricao}</div>
                  <div className="text-xs text-gray-500 italic">{t.obs}</div>
                </td>

                <td className="p-4 text-sm text-gray-600">
                  {t.tipo === "Receita" ? (
                    <div>
                      <div className="font-medium text-slate-800 flex items-center gap-1">👤 {t.clienteNome}</div>
                      <div className="text-xs mb-1">Serviço: {t.servico}</div>
                      {/* MOSTRANDO O CONSULTOR AQUI */}
                      <div className="text-xs bg-yellow-50 text-yellow-700 px-1 rounded w-fit flex items-center gap-1">
                         <Briefcase size={10}/> Vendedor: {t.consultor}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="font-medium text-slate-800">🏷️ {t.categoria}</div>
                      <div className="text-xs">Para: {t.contaDestino}</div>
                    </div>
                  )}
                </td>

                <td className="p-4 text-sm">
                  <div className="flex items-center gap-1 text-gray-600">
                    <span className="font-medium">{t.banco}</span>
                    {t.tipo === "Despesa" && <ArrowRight size={14}/>}
                    {t.tipo === "Despesa" && <span className="text-xs">{t.contaDestino}</span>}
                  </div>
                </td>

                <td className={`p-4 font-bold text-lg ${t.tipo === 'Receita' ? 'text-green-600' : 'text-red-600'}`}>
                  {t.tipo === 'Receita' ? '+' : '-'} R$ {t.valor.toFixed(2)}
                </td>

                <td className="p-4 text-right flex justify-end gap-2">
                  <button onClick={() => prepararEdicao(t)} className="text-blue-500 hover:text-blue-700 p-2 hover:bg-blue-50 rounded"><Edit size={18}/></button>
                  <button onClick={() => removerTransacao(t.id)} className="text-gray-400 hover:text-red-600 p-2 hover:bg-red-50 rounded"><Trash2 size={18}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}