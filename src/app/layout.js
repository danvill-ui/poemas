import localFont from "next/font/local";
import "./globals.css";
import LayoutClient from "./LayoutClient";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";




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
  description: "Creado por Daniel Villagrán"
};
export const viewport = {
  width: "device-width",
  initialScale: 1,
};





export default function RootLayout({ children }) {

  return (
    <html lang="es" className={`${title.variable} font-sans`}>
    <body className={'flex flex-col h-full bg-white p-0 bg-black' } style={{minHeight: '100vh'}}>
     
        <LayoutClient >
        {children}
      </LayoutClient>
    
    </body>
    </html>
  );
}

