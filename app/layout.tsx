import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// Importante: Estamos a chamar o componente que gere o Menu
import AdminLayout from "../components/AdminLayout"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sistema CMG",
  description: "Gestão completa da empresa CMG",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={inter.className}>
        {/* Aqui usamos o AdminLayout para envolver tudo. 
            É ele que vai desenhar a barra lateral UMA VEZ só. */}
        <AdminLayout>
          {children}
        </AdminLayout>
      </body>
    </html>
  );
}