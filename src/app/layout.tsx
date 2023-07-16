"use client";
import { Inter } from "next/font/google";
import "./global.css";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import { useEffect } from "react";

// react-alertの設定
const options = {
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: "30px",
  transition: transitions.SCALE,
};

const AlertTemplate = () => (
  <div className="mt-6 bg-red-400 px-4 py-3 rounded-2xl">
    <p className="">「マジすか」を検出しました</p>
  </div>
);
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AlertProvider template={AlertTemplate} {...options}>
          {children}
        </AlertProvider>
      </body>
    </html>
  );
}
