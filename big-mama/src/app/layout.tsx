import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { Providers } from "./Providers";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Big Mama",
  description: "collaborative document editing",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light ">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
