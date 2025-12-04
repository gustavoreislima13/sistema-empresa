// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google"; // 1. Importar a fonte
import "./globals.css";
import Link from "next/link";
import { LayoutDashboard, Calculator, Contact, ShoppingBag, DollarSign, Pin, Settings, FolderOpen, Bot } from "lucide-react";

// 2. Configurar a fonte (Esta foi a linha que faltou)
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sistema Empresarial",
  description: "Gestão completa da empresa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const menuItems = [
    { name: "DASHBOARD", icon: <LayoutDashboard size={20} />, path: "/" },
    { name: "PRECIFICAÇÃO", icon: <Calculator size={20} />, path: "/precificacao" },
    { name: "CRM", icon: <Contact size={20} />, path: "/crm" },
    { name: "VENDAS", icon: <ShoppingBag size={20} />, path: "/vendas" },
    { name: "FINANCEIRO", icon: <DollarSign size={20} />, path: "/financeiro" },
    { name: "MURAL", icon: <Pin size={20} />, path: "/mural" },
    { name: "ARQUIVOS", icon: <FolderOpen size={20} />, path: "/arquivos" },
    { name: "I.A.", icon: <Bot size={20} />, path: "/ia" },
    { name: "CONFIG", icon: <Settings size={20} />, path: "/config" },
  ];

  return (
    // Adicionei o suppressHydrationWarning aqui também para garantir
    <html lang="pt-br" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="flex h-screen w-full bg-slate-50">
          
          {/* Barra Lateral Fixa */}
          <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-2xl shrink-0">
            <div className="p-6 text-2xl font-bold border-b border-slate-700 flex items-center gap-2">
              🚀 Empresa
            </div>
            
            <nav className="flex-1 overflow-y-auto py-4 scrollbar-thin">
              <ul className="space-y-1 px-3">
                {menuItems.map((item) => (
                  <li key={item.name}>
                    <Link 
                      href={item.path}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-600 transition-all hover:translate-x-1 group"
                    >
                      <span className="text-slate-400 group-hover:text-white transition-colors">
                        {item.icon}
                      </span>
                      <span className="font-medium text-sm tracking-wide">{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="p-4 border-t border-slate-700 text-xs text-slate-400 text-center">
              Sistema v1.0 &copy; 2024
            </div>
          </aside>

          {/* Área de Conteúdo Principal */}
          <main className="flex-1 overflow-auto p-8 relative">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}