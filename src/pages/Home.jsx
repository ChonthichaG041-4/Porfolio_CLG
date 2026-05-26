import { HeroSection }    from '@/sections/HeroSection'
import { FeaturedSection } from '@/sections/FeaturedSection'
import { SkillsSection }   from '@/sections/SkillsSection'
import { AboutSection }    from '@/sections/AboutSection'
import { ContactSection }  from '@/sections/ContactSection'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturedSection />
      <SkillsSection />
      <AboutSection />
      <ContactSection />
    </main>
  )
}
