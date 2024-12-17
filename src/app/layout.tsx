import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./extra.css";
import ThemeProvider from "@/components/theme-provider"
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
import Particles from "@/components/ui/particles";
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
import SessionWrapper from "@/helper/SessionWrapper";
import Navbar from "@/components/Navbar";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const [mounted, setMounted] = useState(false);

  // useEffect(() => {
  //   setMounted(true);
  // }, []);
  // if (!mounted) return null;
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg`}
      >
        <ThemeProvider attribute={"class"} defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
          <SessionWrapper>
            <Navbar />
           
            {children} 
          </SessionWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
