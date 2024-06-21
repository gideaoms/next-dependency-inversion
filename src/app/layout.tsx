import "./globals.css";
import { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { RepositoriesProvider } from "@/providers/repositories";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function Layout(props: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RepositoriesProvider>{props.children}</RepositoriesProvider>
      </body>
    </html>
  );
}
