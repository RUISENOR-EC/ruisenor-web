import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'
import { CatalogSection } from '../components/sections/CatalogSection'
import { ContactSection } from '../components/sections/ContactSection'
import { FairSection } from '../components/sections/FairSection'
import { HeroSection } from '../components/sections/HeroSection'
import { ProductLinesSection } from '../components/sections/ProductLinesSection'
import { SocialSection } from '../components/sections/SocialSection'
import { StorySection } from '../components/sections/StorySection'

export function HomePage() {
  return (
    <>
      <Header />
      <main id="contenido" tabIndex={-1}>
        <HeroSection />
        <ProductLinesSection />
        <CatalogSection />
        <StorySection />
        <FairSection />
        <SocialSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
