import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TrafficFlow MW",
  description: "Real-time traffic reports for Malawi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
  }
