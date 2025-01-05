import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { Provider } from "@/components/ui/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GDG IIT Mandi",
  description: "Created by Vinamra Garg and Mehul Sharma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className={inter.className} suppressHydrationWarning>
        {/* <Navbar /> */}
        <Provider>{children}</Provider>
        {/* <Footer /> */}
      </div>
  );
}
