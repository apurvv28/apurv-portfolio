import AboutSection from "@/components/AboutSection";
import ContactForm from "@/components/ContactForm";
import Hero from "@/components/Hero";
import ProjectSection from "@/components/ProjectSection";
import Skills from "@/components/Skills";
import Testimonials from "@/components/Testimonials";

export default function HomePage(): JSX.Element {
  return (
    <>
      <Hero />
      <AboutSection />
      <Skills />
      <ProjectSection />
      <Testimonials />
      <ContactForm />
    </>
  );
}
