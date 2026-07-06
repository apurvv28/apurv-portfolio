import AboutSection from "@/components/AboutSection";
import AchievementsSection from "@/components/AchievementsSection";
import ContactForm from "@/components/ContactForm";
import EducationSection from "@/components/EducationSection";
import ExperienceSection from "@/components/ExperienceSection";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import ProjectSection from "@/components/ProjectSection";
import Testimonials from "@/components/Testimonials";

export default function HomePage(): JSX.Element {
  return (
    <>
      <Hero />
      <AboutSection />
      <Skills />
      <EducationSection />
      <ExperienceSection />
      <ProjectSection />
      <AchievementsSection />
      <Testimonials />
      <ContactForm />
    </>
  );
}
