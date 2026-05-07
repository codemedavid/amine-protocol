import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const faqs = [
  {
    question: 'Are these peptides for human use?',
    answer: 'No. All compounds sold by NextGen Peptides are intended strictly for laboratory research purposes only. They are not approved for human or veterinary use, consumption, or self-administration of any kind.',
  },
  {
    question: 'How are quality standards maintained?',
    answer: 'Every compound we carry is independently tested by accredited third-party laboratories before distribution. Testing includes HPLC purity analysis, mass spectrometry identity confirmation, heavy metals screening, and endotoxin testing. Batch-specific COAs are available for every product.',
  },
  {
    question: 'Can I purchase peptides in bulk?',
    answer: 'Yes. We offer tiered wholesale and bulk pricing for qualified research organizations and volume buyers. Visit our wholesale page or contact us directly to discuss available quantities and pricing structures.',
  },
  {
    question: 'How should I store peptides?',
    answer: 'Lyophilized peptides should be stored at -20°C in a dry, dark environment. Once reconstituted, store at 4°C and use within a timeframe appropriate to your research protocol. Avoid repeated freeze-thaw cycles to preserve compound integrity.',
  },
  {
    question: 'Do you ship internationally?',
    answer: 'We currently ship within the United States. Contact our support team for inquiries regarding international availability to your specific region.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="w-full py-16 lg:py-24 bg-white" id="faq">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Title */}
          <div>
            <ScrollReveal>
              <span className="text-sm font-medium text-secondary mb-2 block">FAQ</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-primary leading-tight mb-4">
                Have Questions?<br />We Have Answers
              </h2>
              <p className="text-muted-foreground max-w-sm">
                Find quick answers to the most common inquiries about our chemical supply services.
              </p>
            </ScrollReveal>
          </div>

          {/* Right Accordion */}
          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50/50 transition-colors"
                  >
                    <span className="font-medium text-primary text-sm pr-4">{faq.question}</span>
                    <span className={`shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      openIndex === i ? 'bg-primary border-primary' : 'border-gray-300'
                    }`}>
                      {openIndex === i ? (
                        <X className="w-3.5 h-3.5 text-white" />
                      ) : (
                        <Plus className="w-3.5 h-3.5 text-primary" />
                      )}
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openIndex === i ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-5 pb-5">
                      <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
