import LoadingScreen from "./components/LoadingScreen";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import SocialProofBar from "./components/SocialProofBar";
import PainPoints from "./components/PainPoints";
import Solution from "./components/Solution";
import Benefits from "./components/Benefits";
import CaseStudies from "./components/CaseStudies";
import Process from "./components/Process";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Nav />
      <main>
        <Hero />
        <SocialProofBar />
        <PainPoints />
        <Solution />
        <Benefits />
        <CaseStudies />
        <Process />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
