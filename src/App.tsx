import AnnouncementBar from './sections/AnnouncementBar'
import Header from './sections/Header'
import HeroSection from './sections/HeroSection'
import GuaranteeSection from './sections/GuaranteeSection'
import QualitySection from './sections/QualitySection'
import WhyChooseSection from './sections/WhyChooseSection'
import ProductGrid from './sections/ProductGrid'
import SucceedSection from './sections/SucceedSection'
import ProductionSection from './sections/ProductionSection'
import ProcessSection from './sections/ProcessSection'
import AboutSection from './sections/AboutSection'
import FAQSection from './sections/FAQSection'
import Footer from './sections/Footer'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar />
      <Header />
      <main>
        <HeroSection />
        <GuaranteeSection />
        <QualitySection />
        <WhyChooseSection />
        <ProductGrid />
        <SucceedSection />
        <ProductionSection />
        <ProcessSection />
        <AboutSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  )
}

export default App