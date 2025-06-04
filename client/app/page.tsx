import About from "./components/About";
import AllReview from "./components/AllReview";
import AllTeams from "./components/AllTeams";
import CounterSection from "./components/CounterSection";
import Courses from "./components/Courses";
import PricingSection from "./components/PriceSection";
import Section from "./components/Section";

export default function Home() {
  return (
    <div>
      <Section/>
      <CounterSection/>
      <About/>
      <AllTeams/>
      <Courses/>
      <AllReview/>
      <PricingSection/>
    </div>
  );
}
