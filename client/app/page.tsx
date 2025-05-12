import About from "./components/About";
import AllReview from "./components/AllReview";
import AllTeams from "./components/AllTeams";
import Courses from "./components/Courses";
import PricingSection from "./components/PriceSection";
import Section from "./components/Section";
import StatsSec from "./components/StatsSec";

export default function Home() {
  return (
    <div>
      <Section/>
      <StatsSec/>
      <About/>
      <AllTeams/>
      <Courses/>
      <AllReview/>
      <PricingSection/>
    </div>
  );
}
