import { Card, Heading, Stack, Link } from "@chakra-ui/react";

import React from "react";
import { LuExternalLink } from "react-icons/lu";

const SubmissionStats: any = [
  { label: "No. of Participants(Checked in)", value: "1000+" },
  { label: "No. of Projects submitted", value: "300+" },
  { label: "Cash prizes given", value: "1.5L+" },
];

const Winners: React.FC = () => {
  return (
    <section
      className="relative bg-black text-white py-10 px-5 md:px-10 lg:px-20 overflow-hidden animate-on-scroll"
      id="aboutUsSection">
      <div className="absolute inset-0 animate-bg-move opacity-30 z-0"></div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className=" font-bold mb-6 text-center text-gradient">
          <Heading className="font-arcade sm:text-2xl text-3xl">
            KrackHack 2024 Winners
          </Heading>
        </h2>
        <Stack>
          <Card.Root size="md">
            <Card.Header>
              <Heading size="md">
                <Link href="https://devfolio.co/projects/iit-mandi-gymkhana-website-51f1">
                  IIT Mandi SNTC Approval System
                  <LuExternalLink></LuExternalLink>
                </Link>
              </Heading>
            </Card.Header>
            <Card.Body color="fg.muted">By : Dev 404</Card.Body>
          </Card.Root>

          <Card.Root size="md">
            <Card.Header>
              <Heading size="md">
                <Link href="https://devfolio.co/projects/smart-financeai-3b16">
                  Finance Manager<LuExternalLink></LuExternalLink>
                </Link>
              </Heading>
            </Card.Header>
            <Card.Body color="fg.muted">By : Krack Jack</Card.Body>
          </Card.Root>

          <Card.Root size="md">
            <Card.Header>
              <Heading size="md">
                <Link href="https://devfolio.co/projects/approval-automation-system-5521">
                  {" "}
                  Approval Automation System<LuExternalLink></LuExternalLink>
                </Link>
              </Heading>
            </Card.Header>
            <Card.Body color="fg.muted">By : Krackers</Card.Body>
          </Card.Root>
        </Stack>
      </div>
    </section>
  );
};

export default Winners;
