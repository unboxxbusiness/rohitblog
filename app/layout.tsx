import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | LearnCode With RK",
    default: "LearnCode With RK | 20,000 Expert Guides",
  },
  description: "Learn to build products faster with 20,000 AI-generated tutorials tailored for students, freelancers, and founders.",
  metadataBase: new URL("https://example.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
