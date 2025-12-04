// src/app/config/page.tsx
"use client";

import { useState } from "react";
import { Save, User, Building, Bell, Shield, Moon } from "lucide-react";

export default function ConfigPage() {
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    // Simula salvamento
    setTimeout(() => {
      setLoading(false);
      alert("Configurações salvas com sucesso!");
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto pb-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
            ⚙️ Configurações
          </h1>
          <p className="text-gray-500">Gerencie as preferências do sistema.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 font-medium disabled:opacity-70"
        >
          {loading ? "Salvando..." : <><Save size={18} /> Salvar Alterações</>}
        </button>
      </div>

      <div className="space-y-6">
        
        {/* Seção 1: Perfil */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2">
            <User size={20} className="text-blue-500"/> Seu Perfil
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
              <input type="text" defaultValue="Admin Usuário" className="w-full border p-2 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email de Acesso</label>
              <input type="email" defaultValue="admin@empresa.com" className="w-full border p-2 rounded-lg bg-gray-50 text-gray-500" disabled />
            </div>
          </div>
        </div>

        {/* Seção 2: Dados da Empresa */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2">
            <Building size={20} className="text-blue-500"/> Dados da Empresa
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome Fantasia</label>
              <input type="text" defaultValue="Minha Empresa S.A." className="w-full border p-2 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CNPJ / NIF</label>
              <input type="text" defaultValue="00.000.000/0001-99" className="w-full border p-2 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefone Comercial</label>
              <input type="text" defaultValue="+55 11 99999-9999" className="w-full border p-2 rounded-lg" />
            </div>
          </div>
        </div>

        {/* Seção 3: Preferências e Segurança */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2">
              <Bell size={20} className="text-orange-500"/> Notificações
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Receber alertas por email</span>
                <input type="checkbox" defaultChecked className="w-5 h-5 accent-blue-600" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Som de notificação</span>
                <input type="checkbox" defaultChecked className="w-5 h-5 accent-blue-600" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Resumo semanal</span>
                <input type="checkbox" className="w-5 h-5 accent-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2">
              <Shield size={20} className="text-green-600"/> Segurança
            </h2>
            <div className="space-y-4">
              <button className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                Alterar Senha
              </button>
              <button className="w-full border border-red-200 text-red-600 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium">
                Encerrar todas as sessões
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}