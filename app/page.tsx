"use client";
import "./globals.css";
import Hero from "./components/Hero";
import HorizontalScrollBackground from "./components/Gallery";
import WhatWeDo from "./components/WhatWeDo";
import Glimpse from "./components/Glimpse";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    toast(" KrackHack is on! Join the fun!", {
      duration: 5000,
      position: "top-center",
      style: {
        background: "linear-gradient(135deg, #ff7eb3, #ff758c)",
        color: "#fff",
        fontSize: "16px",
        fontWeight: "bold",
        margin: "20px",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        padding: "12px 20px",
      },
      icon: "🚀",
      iconTheme: {
        primary: "#fff",
        secondary: "#ff7eb3",
      },
      ariaProps: {
        role: "status",
        "aria-live": "polite",
      },
    });
  }, []);

  return (
    <main className="main">
      <div
        onClick={() => (window.location.href = "/Krackhack")}
        className="cursor-pointer">
        <Toaster />
      </div>
      <Hero />
      <WhatWeDo />
      <HorizontalScrollBackground />
      <Glimpse />
    </main>
  );
}
