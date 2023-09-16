"use client";
import { Provider } from "@/components";
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
    <html lang="en">
      <body>
        <Provider>
          <div className="relative">
            <Sidebar />
            {children}
          </div>
        </Provider>
      </body>
    </html>
  );
}
