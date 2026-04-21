import type { Metadata } from "next";
import { Urbanist, Manrope, Space_Mono } from "next/font/google";
import "./globals.css";

// Foundation Components
import BlueprintGrid from "../components/foundation/BlueprintGrid";
import GrainOverlay from "../components/foundation/GrainOverlay";
import TechnicalMargins from "../components/foundation/TechnicalMargins";
import ScanLine from "../components/foundation/ScanLine";
import { ThemeProvider } from "../components/foundation/ThemeProvider";
import Navbar from "../components/foundation/Navbar";
import Footer from "../components/foundation/Footer";

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Friehub TaaS | Institutional Oracle Infrastructure",
  description: "Verifiable Data and Sovereign Intelligence secured by EigenLayer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${urbanist.variable} ${manrope.variable} ${spaceMono.variable} font-sans selection:bg-primary/30 antialiased`}
      >
        <ThemeProvider
          attribute="class"
          forcedTheme="dark"
        >
          {/* Global UI Components */}
          <Navbar />
          <GrainOverlay />
          <TechnicalMargins />
          
          {/* Main Content Area */}
          <main className="relative min-h-screen">
            {children}
          </main>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
