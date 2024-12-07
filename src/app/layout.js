import localFont from "next/font/local";
import "./globals.css";

/*const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
 /* src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});*/

export const metadata = {
  title: "Poesía",
  description: "Creado por Daniel Villagrán",
};
export default function RootLayout({ children }) {
  return (
    <html lang="es">
    <body className={'flex flex-col h-full bg-black text-white p-0' } style={{minHeight: '100vh'}}>
    <header className={'flex bg-white p-6'}>
      <h1 className={'flex-grow-0 text-black font-serif text-3xl font-bold uppercase'}><i>Poesía</i>
      </h1>
    </header>

    <main className="flex justify-around flex-col column flex-wrap flex-1">
      {children}
    </main>
    </body>
    </html>
  );
}

