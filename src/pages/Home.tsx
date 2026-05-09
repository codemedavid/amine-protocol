import AnnouncementBar from '../sections/AnnouncementBar';
import Header from '../sections/Header';
import HeroSection from '../sections/HeroSection';
import GuaranteeSection from '../sections/GuaranteeSection';
import QualitySection from '../sections/QualitySection';
import WhyChooseSection from '../sections/WhyChooseSection';
import ProductGrid from '../sections/ProductGrid';
import SucceedSection from '../sections/SucceedSection';
import ProcessSection from '../sections/ProcessSection';
import AboutSection from '../sections/AboutSection';
import FAQSection from '../sections/FAQSection';
import Footer from '../sections/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar />
      <Header />
      <main className="flex flex-col">
        <div className="order-1"><HeroSection /></div>
        <div className="order-2 md:order-5"><ProductGrid /></div>
        <div className="order-3 md:order-2"><GuaranteeSection /></div>
        <div className="order-4 md:order-3"><QualitySection /></div>
        <div className="order-5 md:order-4"><WhyChooseSection /></div>
        <div className="order-6"><SucceedSection /></div>
        {/* <div className="order-7"><ProductionSection /></div> */}
        <div className="order-8"><ProcessSection /></div>
        <div className="order-9"><AboutSection /></div>
        <div className="order-10"><FAQSection /></div>
      </main>
      <Footer />
    </div>
  );
}
