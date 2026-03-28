"use client";

import { useState, useCallback } from "react";
import LoadingScreen from "./components/LoadingScreen";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import SocialProofBar from "./components/SocialProofBar";
import PainPoints from "./components/PainPoints";
import Solution from "./components/Solution";
import Integrations from "./components/Integrations";
import Benefits from "./components/Benefits";
import CaseStudies from "./components/CaseStudies";
import Testimonials from "./components/Testimonials";
import InlineCTA from "./components/InlineCTA";
import Process from "./components/Process";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import BookingForm from "./components/BookingForm";
import CookieBanner from "./components/CookieBanner";

export default function Home() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const openBooking = useCallback(() => setBookingOpen(true), []);
  const closeBooking = useCallback(() => setBookingOpen(false), []);

  return (
    <>
      <LoadingScreen />
      <Nav onBook={openBooking} />
      <main>
        <Hero onBook={openBooking} />
        <SocialProofBar />
        <PainPoints />
        <Solution />
        <Integrations />
        <Benefits />
        <CaseStudies />
        <Testimonials />
        <InlineCTA onBook={openBooking} />
        <Process />
        <FAQ />
      </main>
      <Footer onBook={openBooking} />
      <BookingForm isOpen={bookingOpen} onClose={closeBooking} />
      <CookieBanner />
    </>
  );
}
