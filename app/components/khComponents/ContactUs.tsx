import React from "react";
import { Box, Stack, Text, Mark } from "@chakra-ui/react";

const ContactUs: React.FC = () => {
  return (
    <section
      className="relative bg-black text-white py-20 px-5 md:px-10 lg:px-20 overflow-hidden animate-on-scroll"
      id="aboutUsSection">
      <div className="absolute inset-0 animate-bg-move opacity-30 z-0"></div>
      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-6 text-center text-gradient font-arcade">
          Contact Us
        </h2>
        <Box
          p="4"
          borderWidth="1px"
          borderColor="border.disabled"
          color="fg.disabled"
          overflowX="auto">
          <Stack
            direction={{ base: "column", md: "row" }}
            gap={{ base: "20px", md: "10%" }}
            justify="center"
            className="w-full">
            <Text>
              <Stack className="flex-col justify-start text-center sm:text-sm">
                <Mark>Aishal Gupta</Mark>
                <Text>+91 98141 33350</Text>
                <Text>b21084@students.iitmandi.ac.in</Text>
              </Stack>
            </Text>
            <Text>
              <Stack className="flex-col justify-start text-center sm:text-sm">
                <Mark>Mahir Jain</Mark>
                <Text>+91 6375 309 975</Text>
                <Text>b21199@students.iitmandi.ac.in</Text>
              </Stack>
            </Text>
          </Stack>
        </Box>
      </div>
    </section>
  );
};

export default ContactUs;
