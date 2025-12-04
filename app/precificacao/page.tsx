// src/app/precificacao/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Calculator, DollarSign, Percent, AlertCircle } from "lucide-react";

export default function PrecificacaoPage() {
  // Inputs
  const [custoProduto, setCustoProduto] = useState<number>(0);
  const [despesasFixas, setDespesasFixas] = useState<number>(0); // Em valor
  const [impostos, setImpostos] = useState<number>(0); // Em %
  const [margemLucro, setMargemLucro] = useState<number>(0); // Em %

  // Outputs (Resultados)
  const [precoVenda, setPrecoVenda] = useState<number>(0);
  const [lucroLiquido, setLucroLiquido] = useState<number>(0);

  // Recalcular sempre que algo mudar
  useEffect(() => {
    // Fórmula Básica de Markup:
    // Preço = (Custo + Despesas) / (1 - ((Imposto + Margem) / 100))
    
    const taxasTotais = impostos + margemLucro;
    
    if (taxasTotais >= 100) {
      setPrecoVenda(0); // Evitar divisão por zero ou negativa
      return;
    }

    const divisor = 1 - (taxasTotais / 100);
    const custoTotal = custoProduto + despesasFixas;
    const precoSugerido = custoTotal / divisor;

    setPrecoVenda(precoSugerido);
    setLucroLiquido(precoSugerido * (margemLucro / 100));

  }, [custoProduto, despesasFixas, impostos, margemLucro]);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-800 mb-2 flex items-center gap-2">
        🧮 Calculadora de Precificação
      </h1>
      <p className="text-gray-500 mb-8">Defina o preço ideal para seus produtos ou serviços.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Lado Esquerdo: Inputs */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6">
          <h2 className="font-bold text-lg text-slate-700 border-b pb-2">Dados de Custo</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Custo do Produto/Hora (R$)</label>
            <div className="relative">
              <DollarSign size={16} className="absolute left-3 top-3 text-gray-400"/>
              <input type="number" className="w-full pl-10 p-2 border rounded-lg" value={custoProduto || ''} onChange={e => setCustoProduto(Number(e.target.value))} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Despesas Fixas Rateadas (R$)</label>
            <div className="relative">
              <DollarSign size={16} className="absolute left-3 top-3 text-gray-400"/>
              <input type="number" className="w-full pl-10 p-2 border rounded-lg" value={despesasFixas || ''} onChange={e => setDespesasFixas(Number(e.target.value))} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Impostos (%)</label>
              <div className="relative">
                <Percent size={16} className="absolute left-3 top-3 text-gray-400"/>
                <input type="number" className="w-full pl-10 p-2 border rounded-lg" value={impostos || ''} onChange={e => setImpostos(Number(e.target.value))} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Margem de Lucro (%)</label>
              <div className="relative">
                <Percent size={16} className="absolute left-3 top-3 text-gray-400"/>
                <input type="number" className="w-full pl-10 p-2 border rounded-lg" value={margemLucro || ''} onChange={e => setMargemLucro(Number(e.target.value))} />
              </div>
            </div>
          </div>
        </div>

        {/* Lado Direito: Resultados */}
        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-8 rounded-xl shadow-xl">
            <p className="text-slate-400 text-sm uppercase font-bold tracking-wider">Preço de Venda Sugerido</p>
            <p className="text-4xl font-bold mt-2 text-green-400">
              {precoVenda > 0 ? `R$ ${precoVenda.toFixed(2)}` : '---'}
            </p>
            
            <div className="mt-6 pt-6 border-t border-slate-700 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-400">Lucro Líquido Estimado</p>
                <p className="text-xl font-bold text-emerald-400">R$ {lucroLiquido.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Impostos a Pagar</p>
                <p className="text-xl font-bold text-rose-400">R$ {(precoVenda * (impostos/100)).toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg flex gap-3 text-amber-800 text-sm">
            <AlertCircle className="shrink-0" />
            <p>Lembre-se: Este cálculo considera que as despesas fixas estão sendo cobertas proporcionalmente por unidade vendida.</p>
          </div>
        </div>

      </div>
    </div>
  );
}