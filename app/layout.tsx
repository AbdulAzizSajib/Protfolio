import type { Metadata } from "next";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import Providers from "./providers";
import Navbar from "../src/Components/Layout/Navbar/Navbar";
import Footer from "../src/Components/Layout/Footer/Footer";
import ThemeRoot from "../src/Components/ThemeProvider/ThemeRoot";
import VenetianPreloader from "../src/Components/Preloader/VenetianPreloader";
import ScrollToTop from "../src/Components/ScrollToTop/ScrollToTop";

export const metadata: Metadata = {
  title: "Sajib | Portfolio",
  description: "Personal portfolio website - Full Stack Developer",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
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
            <ScrollToTop />
          </ThemeRoot>
        </Providers>
      </body>
    </html>
  );
}
