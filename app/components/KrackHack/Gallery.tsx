"use client"
import { Code, SimpleGrid ,Box,Image} from "@chakra-ui/react";


import React from "react";

export const Gallery:React.FC = ()=>{
    return (
        <div id="gallery2023" className="animate-on-scroll">
            <div className="relative bg-black text-white py-20 px-5 md:px-10 lg:px-20 overflow-hidden">
            <div className="absolute inset-0 animate-bg-move opacity-30 z-0"></div>
            <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-6 text-center text-gradient font-arcade">
            <Code size={"lg"} className="font-arcade">Gallery</Code>
        </h2>
        <SimpleGrid columns={[2, null, 2]} gap="40px">
            <Image rounded="md" src="/galleryKH/gal1.jpeg" alt="2023 KrackHack" />
            <Image rounded="md" src="/galleryKH/gal2.jpeg" alt="2023 KrackHack" />
            <Image rounded="md" src="/galleryKH/gal3.jpeg" alt="2023 KrackHack" />
            <Image rounded="md" src="/galleryKH/gal4.jpeg" alt="2023 KrackHack" />
        </SimpleGrid>
      </div>
            </div>
        </div>
    )
};
