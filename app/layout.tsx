import type { Metadata } from "next";
import {
  Cinzel_Decorative,
  EB_Garamond,
  Cormorant_Garamond,
} from "next/font/google";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "./globals.css";

const fontHeading = Cinzel_Decorative({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const fontSubheading = EB_Garamond({
  variable: "--font-subheading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const fontBody = Cormorant_Garamond({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Elai — India's All-in-One Accessories Marketplace",
  description: "Elai is India's first dedicated accessories marketplace. Shop 40+ categories — fashion, ethnic, tech, luxury, beauty, and more. Elai style. Elai you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontHeading.variable} ${fontSubheading.variable} ${fontBody.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
