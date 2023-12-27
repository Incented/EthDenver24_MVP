import HeroSection from "./component/HeroSection";
import MainFeatures from "./component/MainFeatures";
import CalltoActionSection from "./component/CTA";
import Footer from "./component/Footer";
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
