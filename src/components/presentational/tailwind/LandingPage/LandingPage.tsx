import Testimonials from './Testimonials';
import HeroSection from './HeroSection';
import TrustedCompanies from './TrustedCompanies';
import AllFeatures from './AllFeatures';
import MainFeatures from './MainFeatures';
import CTA from './CTA';
import Footer from './Footer';

export const LandingPage = () => {
  return (
    <>
      <HeroSection
        title="Permissionless Incentivization and Coordination"
        description="A protocol for autonomous task creation, prioritization, validation, and incentivization to supercharge contribution across the Web3 ecosystem and beyond."
        image="/mockups/1.png"
      />
      {/* <TrustedCompanies /> */}
      {/* <AllFeatures /> */}
      <MainFeatures />
      {/* <Testimonials /> */}
      <CTA />
      <Footer />
    </>
  );
};
