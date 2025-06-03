import { Sidebar } from "@/components/sidebar/sidebar";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-100 flex">
        <Sidebar/>
        <main>
          {children}          
        </main>
      </body>
    </html>
  );
}
