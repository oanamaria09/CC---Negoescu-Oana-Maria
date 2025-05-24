import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Alerte Meteo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro">
      <body>
        <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-4 text-center shadow">
          <Link href="/" className="mx-4 font-semibold hover:underline">
            ➕ Adaugă alertă
          </Link>
          <Link href="/verifica" className="mx-4 font-semibold hover:underline">
            🔍 Verifică alertele
          </Link>
        </div>
        {children}
      </body>
    </html>
  );
}
