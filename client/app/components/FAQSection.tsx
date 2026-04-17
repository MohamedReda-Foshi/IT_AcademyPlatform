'use client';

import { useState } from 'react';
import type { FC } from 'react';

// Define the FAQ data structure
interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  items?: FAQItem[];
}

const FAQSection: FC<FAQSectionProps> = ({

  items = defaultFAQItems
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-screen-xl mx-auto">
 

      <div className="grid divide-y max-w-xl mx-auto mt-8">
        {items.map((item, index) => (
          <div key={index} className="py-5">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between  font-medium text-left focus:outline-none focus:text-red-600"
            >
              <span className="">{item.question}</span>
              <span className={`transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`}>
                <svg 
                  width="24" 
                  height="24" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="1.5"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </span>
            </button>
            
            {openIndex === index && (
              <div 
                className="mt-3  animate-[fadeIn_0.2s_ease-in-out]"
              >
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

// Default FAQ items that will be used if none are provided
const defaultFAQItems: FAQItem[] = [
  {
    question: "what you going to learn?",
    answer: "A SAAS platform is a cloud-based software service that allows users to access and use a variety of tools and functionality."
  },
  {
    question: "How does billing work?",
    answer: "We offer a variety of billing options, including monthly and annual subscription plans, as well as pay-as-you-go pricing for certain services. Payment is typically made through a credit card or other secure online payment method."
  },
  {
    question: "Can I get a refund for my subscription?",
    answer: "We offer a 30-day money-back guarantee for most of our subscription plans. If you are not satisfied with your subscription within the first 30 days, you can request a full refund. Refunds for subscriptions that have been active for longer than 30 days may be considered on a case-by-case basis."
  },
  {
    question: "How do I cancel my subscription?",
    answer: "To cancel your subscription, you can log in to your account and navigate to the subscription management page. From there, you should be able to cancel your subscription and stop future billing."
  },
  {
    question: "Can I try this platform for free?",
    answer: "We offer a free trial of our platform for a limited time. During the trial period, you will have access to a limited set of features and functionality, but you will not be charged."
  },
 
];

export default FAQSection;