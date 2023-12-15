import MainFeatures from "./MainFeatures";
import HeroSection from "./HeroSection";
import Footer from "./Footer";
import React from "react";
import CTA from "./CTA";

export const LandingPage = () => {
  return (
    <>
      <HeroSection
        title="Permissionless Incentivization and Coordination"
        description="A protocol for autonomous task creation, prioritization, validation, and incentivization to supercharge contribution across the Web3 ecosystem and beyond."
        image="/mockups/1.png"
      />
      <MainFeatures />
      <CTA />
      <Footer />
    </>
  );
};
