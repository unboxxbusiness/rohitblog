'use client';

import { useState } from 'react';

interface FaqItem {
  "@type": string;
  name: string;
  acceptedAnswer: {
    "@type": string;
    text: string;
  };
}

export default function FaqSection({ faq }: { faq: any }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!faq || !faq.mainEntity || !Array.isArray(faq.mainEntity)) return null;

  const faqs = faq.mainEntity as FaqItem[];

  return (
    <div className="mt-16 bg-[rgba(196,162,101,0.03)] border border-gold-border rounded-sm p-8">
      <h2 className="text-2xl font-header font-bold mb-8 text-gold uppercase tracking-tight">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((item, index) => (
          <div key={index} className="border-b border-border-subtle last:border-0">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full text-left py-4 flex justify-between items-center group transition-colors"
            >
              <span className="text-lg font-semibold text-text-primary group-hover:text-gold transition-colors pr-8">
                {item.name}
              </span>
              <span className={`text-gold text-2xl transform transition-transform duration-300 ${openIndex === index ? 'rotate-45' : 'rotate-0'}`}>
                +
              </span>
            </button>
            <div 
              className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-[500px] pb-6' : 'max-h-0'}`}
            >
              <p className="text-text-secondary leading-relaxed font-body italic">
                {item.acceptedAnswer.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
