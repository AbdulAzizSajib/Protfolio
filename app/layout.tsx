import type { Metadata } from "next";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import Providers from "./providers";
import Navbar from "../src/Components/Layout/Navbar/Navbar";
import Footer from "../src/Components/Layout/Footer/Footer";
import ThemeRoot from "../src/Components/ThemeProvider/ThemeRoot";
import VenetianPreloader from "../src/Components/Preloader/VenetianPreloader";

export const metadata: Metadata = {
  title: "Sajib | Portfolio",
  description: "Personal portfolio website - Full Stack Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <VenetianPreloader />
          <ThemeRoot>
            <Navbar />
            <main className="min-h-screen max-w-4xl mx-auto">{children}</main>
            <Footer />
          </ThemeRoot>
        </Providers>
      </body>
    </html>
  );
}
