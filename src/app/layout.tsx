import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
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
export const metadata: Metadata = {
  title: "Virtual Classroom",
  description: "Your informal learning platform",
};
import SessionWrapper from "@/helper/SessionWrapper";
import Navbar from "@/components/Navbar";
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
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
