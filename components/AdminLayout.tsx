"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, Calculator, Contact, ShoppingBag, DollarSign, 
  Pin, Settings, FolderOpen, Bot, Menu, X 
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: "DASHBOARD", icon: <LayoutDashboard size={20} />, path: "/" },
    { name: "PRECIFICAÇÃO", icon: <Calculator size={20} />, path: "/precificacao" },
    { name: "CRM", icon: <Contact size={20} />, path: "/crm" },
    
    { name: "Controle Finaceiro", icon: <DollarSign size={20} />, path: "/financeiro" },
    { name: "MURAL", icon: <Pin size={20} />, path: "/mural" },
    { name: "ARQUIVOS", icon: <FolderOpen size={20} />, path: "/arquivos" },
    { name: "I.A.", icon: <Bot size={20} />, path: "/ia" },
    { name: "CONFIG", icon: <Settings size={20} />, path: "/config" },
  ];

  return (
    // Fundo geral cinza claro (bg-slate-50) para não ficar preto
    <div className="flex h-screen w-full bg-slate-50">
      
      {/* 1. MENU MOBILE (Só aparece em telas pequenas 'md:hidden') */}
      <div className="md:hidden fixed top-0 w-full bg-slate-900 text-white z-50 flex items-center justify-between p-4 shadow-md h-16">
        <div className="font-bold text-xl flex items-center gap-2">🚀 CMG</div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* 2. BARRA LATERAL (Desktop: Fixa / Mobile: Deslizante) */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-40
        w-64 bg-slate-900 text-white flex flex-col shadow-2xl transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        md:h-screen pt-16 md:pt-0
      `}>
        <div className="hidden md:flex p-6 text-2xl font-bold border-b border-slate-700 items-center gap-2">
          🚀 CMG
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4 scrollbar-thin">
          <ul className="space-y-1 px-3">
            {menuItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <li key={item.name}>
                  <Link 
                    href={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all hover:translate-x-1 group
                      ${isActive ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-slate-800 text-slate-300'}
                    `}
                  >
                    <span className={`${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}>
                      {item.icon}
                    </span>
                    <span className="font-medium text-sm tracking-wide">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-slate-700 text-xs text-slate-500 text-center">
          Sistema CMG v1.0
        </div>
      </aside>

      {/* 3. ÁREA DE CONTEÚDO PRINCIPAL */}
      <main className="flex-1 overflow-auto p-4 md:p-8 relative mt-16 md:mt-0 bg-slate-50 text-slate-800">
        {/* Overlay escuro para quando o menu mobile está aberto */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        {children}
      </main>
    </div>
  );
}