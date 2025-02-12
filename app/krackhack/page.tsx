"use client";
import Hero from "../components/khComponents/Hero";
import Sponsor from "../components/khComponents/Sponsor";
import AboutUs from "../components/khComponents/About";
import Gallery from "../components/khComponents/Gallery";
import ContactUs from "../components/khComponents/ContactUs";
import Winners from "../components/khComponents/Winner";
import Stats from "../components/khComponents/Statistics";
import SocialBar from "../components/khComponents/SocialBar";
import Timeline from "../components/khComponents/Timeline";
import Themes from "../components/khComponents/Themes";
import { ChakraProvider, Box, defaultSystem } from "@chakra-ui/react";

export default function KrackHack() {
  return (
    <ChakraProvider value={defaultSystem}>
      <main>
        <Hero />
        <SocialBar />
        <AboutUs />
        <Timeline />
        <Themes />
        <Stats />
        <Winners />
        <Gallery />
        <Sponsor />
        <ContactUs />
      </main>
    </ChakraProvider>
  );
}
