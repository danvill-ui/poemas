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

const title = localFont({
  src: [
    {
      path: '../../public/fonts/IBMPlexSerif-SemiBold.ttf',
      weight: '400'
    },
    {
      path: '../../public/fonts/IBMPlexSerif-Bold.ttf',
      weight: '700'
    }
  ],
  variable: '--font-title'
})
export const metadata = {
  title: "Poesía",
  description: "Creado por Daniel Villagrán",
};




export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${title.variable} font-sans`}>
    <body className={'flex flex-col h-full bg-black text-white p-0' } style={{minHeight: '100vh'}}>
    <header className={'flex p-6'}>
      <h1 className={'flex-grow-0 text-black font-serif text-3xl font-bold uppercase'}><i>Poemas al alimón</i>
      </h1>
    </header>

    <main className="flex justify-start flex-col column flex-wrap flex-1">
      {children}
    </main>
    </body>
    </html>
  );
}

