import HeroSection from "./_component/HeroSection";
import MainFeatures from "./_component/MainFeatures";
import CalltoActionSection from "./_component/CTA";
import Footer from "./_component/Footer";
import React from "react";

const LandingPage = () => {
  return (
    <>
      <HeroSection
        title="Permissionless Incentivization and Coordination"
        description="A protocol for autonomous task creation, prioritization, validation, and incentivization to supercharge contribution across the Web3 ecosystem and beyond."
        image="/mockups/1.png"
      />
      <MainFeatures />
      <CalltoActionSection />
      <Footer />
    </>
  );
};

export default LandingPage;
