import { Sidebar } from "@/components/sidebar/sidebar";
import "./globals.css";
import { NavBar } from "@/components/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex">
        <Sidebar/>
        <div className="flex flex-col w-full">
          <NavBar></NavBar>
          <main className="bg-slate-100 flex-1 overflow-y-auto pl-24">
            {children}          
          </main>          
        </div>
      </body>
    </html>
  );
}
