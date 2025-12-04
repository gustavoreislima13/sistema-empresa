// src/app/page.tsx
"use client";

import { 
  TrendingUp, TrendingDown, DollarSign, Users, ShoppingBag, 
  Target, Activity, Calendar, ArrowRight 
} from "lucide-react";

export default function Dashboard() {
  // DADOS SIMULADOS (Futuramente virão do Supabase)
  const dados = {
    receitaTotal: 158400.00,
    despesasTotal: 42300.00,
    metaMensal: 200000.00,
    vendasQuantidade: 132,
    clientesAtivos: 45,
    crescimentoMes: 12.5, // % em relação ao mês anterior
  };

  // CÁLCULOS AUTOMÁTICOS DE SAÚDE DA EMPRESA
  const lucroLiquido = dados.receitaTotal - dados.despesasTotal;
  const ticketMedio = dados.receitaTotal / dados.vendasQuantidade; // Receita dividido por nº de vendas
  const porcentagemMeta = (dados.receitaTotal / dados.metaMensal) * 100;
  const margemLucro = (lucroLiquido / dados.receitaTotal) * 100;

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4">
      
      {/* Cabeçalho com Saudação e Data */}
      <div className="flex flex-col md:flex-row justify-between items-end border-b pb-4 border-gray-200">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">📊 Visão Geral</h1>
          <p className="text-gray-500 mt-1">Bem-vindo ao painel de controle da CMG.</p>
        </div>
        <div className="flex items-center gap-2 text-sm bg-white border px-3 py-1 rounded-lg text-gray-600 shadow-sm">
          <Calendar size={16} />
          <span>Maio, 2024</span>
        </div>
      </div>

      {/* LINHA 1: OS GRANDES NÚMEROS (KPIs) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Receita */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-bold text-gray-500 uppercase">Faturamento</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">R$ {dados.receitaTotal.toLocaleString('pt-BR')}</h3>
            </div>
            <div className="bg-green-100 p-2 rounded-lg text-green-600">
              <TrendingUp size={24} />
            </div>
          </div>
          <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
            +{dados.crescimentoMes}% vs mês anterior
          </span>
        </div>

        {/* Lucro Líquido */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-bold text-gray-500 uppercase">Lucro Líquido</p>
              <h3 className="text-2xl font-bold text-emerald-600 mt-1">R$ {lucroLiquido.toLocaleString('pt-BR')}</h3>
            </div>
            <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600">
              <DollarSign size={24} />
            </div>
          </div>
          <span className="text-xs font-medium text-gray-500">
            Margem de {margemLucro.toFixed(1)}%
          </span>
        </div>

        {/* Ticket Médio (Saúde das Vendas) */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-bold text-gray-500 uppercase">Ticket Médio</p>
              <h3 className="text-2xl font-bold text-blue-600 mt-1">R$ {ticketMedio.toFixed(2)}</h3>
            </div>
            <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
              <ShoppingBag size={24} />
            </div>
          </div>
          <p className="text-xs text-gray-400">Valor médio por venda realizada</p>
        </div>

        {/* Clientes Ativos */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-bold text-gray-500 uppercase">Clientes Ativos</p>
              <h3 className="text-2xl font-bold text-purple-600 mt-1">{dados.clientesAtivos}</h3>
            </div>
            <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
              <Users size={24} />
            </div>
          </div>
          <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded">
            +5 novos este mês
          </span>
        </div>
      </div>

      {/* LINHA 2: ESTRATÉGIA E GRÁFICO */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Painel da Meta (Coluna Esquerda) */}
        <div className="bg-slate-900 text-white p-6 rounded-xl shadow-xl col-span-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2 text-slate-300">
              <Target size={20} /> <span className="font-bold uppercase tracking-wider text-sm">Meta Mensal</span>
            </div>
            <h2 className="text-3xl font-bold text-white">R$ {dados.metaMensal.toLocaleString('pt-BR')}</h2>
            <p className="text-sm text-slate-400 mt-1">Faltam R$ {(dados.metaMensal - dados.receitaTotal).toLocaleString('pt-BR')} para atingir</p>
          </div>

          <div className="mt-8">
            <div className="flex justify-between text-sm mb-2 font-semibold">
              <span>Progresso</span>
              <span>{porcentagemMeta.toFixed(1)}%</span>
            </div>
            {/* Barra de Progresso */}
            <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-500 to-cyan-400 h-4 rounded-full transition-all duration-1000" 
                style={{ width: `${porcentagemMeta}%` }}
              ></div>
            </div>
            <p className="text-xs text-slate-500 mt-4 text-center">
              Ótimo trabalho! Continue assim para bater a meta.
            </p>
          </div>
        </div>

        {/* Gráfico Visual de Desempenho (Simulado com CSS) - Coluna Direita */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm col-span-1 lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-700 flex items-center gap-2">
              <Activity size={20} className="text-blue-500"/> Desempenho Semanal
            </h3>
            <select className="text-xs border p-1 rounded bg-gray-50 text-gray-600">
              <option>Últimos 7 dias</option>
              <option>Últimos 30 dias</option>
            </select>
          </div>

          {/* Gráfico de Barras CSS Puro */}
          <div className="flex items-end justify-between h-48 gap-2 md:gap-4 px-2">
            <Barra dia="Seg" altura="h-24" valor="R$ 2k" />
            <Barra dia="Ter" altura="h-32" valor="R$ 5k" cor="bg-blue-300"/>
            <Barra dia="Qua" altura="h-16" valor="R$ 1.5k" />
            <Barra dia="Qui" altura="h-40" valor="R$ 8k" cor="bg-blue-500"/>
            <Barra dia="Sex" altura="h-36" valor="R$ 6k" cor="bg-blue-400"/>
            <Barra dia="Sáb" altura="h-20" valor="R$ 3k" />
            <Barra dia="Dom" altura="h-10" valor="R$ 1k" />
          </div>
        </div>
      </div>

      {/* LINHA 3: LISTA RÁPIDA (Saúde Operacional) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-700">Movimentações Recentes</h3>
          <button className="text-sm text-blue-600 hover:underline flex items-center gap-1">
            Ver Financeiro <ArrowRight size={14}/>
          </button>
        </div>
        <div className="divide-y divide-gray-50">
          <ItemLista titulo="Venda - Consultoria CMG" tipo="entrada" valor="5.000,00" data="Hoje, 14:30" />
          <ItemLista titulo="Pagto. Servidor AWS" tipo="saida" valor="350,00" data="Hoje, 10:15" />
          <ItemLista titulo="Venda - Everton Guerra" tipo="entrada" valor="2.500,00" data="Ontem, 18:00" />
          <ItemLista titulo="Despesa - Marketing" tipo="saida" valor="1.200,00" data="Ontem, 09:00" />
        </div>
      </div>
    </div>
  );
}

// COMPONENTES AUXILIARES PARA O DASHBOARD
function Barra({ dia, altura, valor, cor = "bg-blue-200" }: { dia: string, altura: string, valor: string, cor?: string }) {
  return (
    <div className="flex flex-col items-center gap-2 group cursor-pointer w-full">
      <div className="opacity-0 group-hover:opacity-100 text-xs font-bold text-slate-600 mb-1 transition-opacity">
        {valor}
      </div>
      <div className={`w-full max-w-[40px] rounded-t-lg ${altura} ${cor} hover:bg-blue-600 transition-colors`}></div>
      <span className="text-xs text-gray-400 font-medium">{dia}</span>
    </div>
  );
}

function ItemLista({ titulo, tipo, valor, data }: { titulo: string, tipo: "entrada"|"saida", valor: string, data: string }) {
  return (
    <div className="p-4 flex justify-between items-center hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-full ${tipo === 'entrada' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
          {tipo === 'entrada' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
        </div>
        <div>
          <p className="font-semibold text-slate-700 text-sm">{titulo}</p>
          <p className="text-xs text-gray-400">{data}</p>
        </div>
      </div>
      <span className={`font-bold text-sm ${tipo === 'entrada' ? 'text-green-600' : 'text-red-600'}`}>
        {tipo === 'entrada' ? '+' : '-'} R$ {valor}
      </span>
    </div>
  );
}