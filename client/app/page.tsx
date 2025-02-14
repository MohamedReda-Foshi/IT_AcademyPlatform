import About from "./components/About";
import AllReview from "./components/AllReview";
import Section from "./components/Section";
import StatsSec from "./components/StatsSec";

export default function Home() {
  return (
    <div>
      <Section/>
      <StatsSec/>
      <About/>
      <AllReview/>

    </div>
  );
}
