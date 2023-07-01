"use client";
import { Footer, Provider } from "@/components";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: "youizane-books",
  description: "create by ouizane younesse",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider>
      <html lang="en">
        <body>
          <div className="relative">
          <Sidebar />
          {children}
          </div>
        </body>
      </html>
    </Provider>
  );
}
