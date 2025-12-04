export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6">
      
      {/* Cabeçalho */}
      <div className="flex justify-between items-end border-b pb-4 border-gray-200">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">📊 Dashboard Geral</h1>
          <p className="text-gray-500 mt-1">Visão geral do desempenho da empresa</p>
        </div>
        <span className="text-xs bg-slate-200 px-3 py-1 rounded-full text-slate-600 font-medium">
          Atualizado agora
        </span>
      </div>

      {/* Cartões de KPI */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <CardResumo titulo="Receita Total" valor="R$ 150.000" cor="bg-blue-600" />
        <CardResumo titulo="Despesas" valor="R$ 45.000" cor="bg-rose-500" />
        <CardResumo titulo="Vendas Mês" valor="124" cor="bg-violet-600" />
        <CardResumo titulo="Lucro Líquido" valor="R$ 105.000" cor="bg-emerald-600" />
      </div>

      {/* Seção de Mural e Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2">
        
        {/* Aviso / Mural */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-bold mb-4 text-slate-700">📢 Mural de Avisos</h2>
          <div className="space-y-4">
            <div className="p-4 bg-amber-50 border-l-4 border-amber-400 text-amber-900 rounded-r-md">
              <p className="font-bold text-sm uppercase mb-1">⚠️ Importante</p>
              <p className="text-sm">Reunião de alinhamento amanhã às 10h na sala principal.</p>
            </div>
            <div className="p-4 bg-sky-50 border-l-4 border-sky-400 text-sky-900 rounded-r-md">
              <p className="font-bold text-sm uppercase mb-1">🎉 Meta Batida</p>
              <p className="text-sm">Parabéns equipa! Atingimos 100% da meta de vendas semanal.</p>
            </div>
          </div>
        </div>

        {/* Placeholder para Gráfico */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center justify-center text-center">
          <h2 className="text-lg font-bold mb-2 text-slate-700 w-full text-left">📈 Crescimento</h2>
          <div className="h-40 w-full bg-slate-50 rounded-lg border border-dashed border-slate-300 flex items-center justify-center text-slate-400 mt-2">
            [Gráfico de Vendas será carregado aqui]
          </div>
          <p className="text-xs text-gray-400 mt-4">Aguardando conexão com banco de dados...</p>
        </div>

      </div>
    </div>
  );
}

function CardResumo({ titulo, valor, cor }: { titulo: string, valor: string, cor: string }) {
  return (
    <div className={`${cor} p-6 rounded-xl text-white shadow-lg shadow-gray-200/50 hover:-translate-y-1 transition-transform cursor-default`}>
      <p className="text-xs opacity-90 uppercase font-bold tracking-wider mb-2">{titulo}</p>
      <p className="text-3xl font-extrabold">{valor}</p>
    </div>
  );
}