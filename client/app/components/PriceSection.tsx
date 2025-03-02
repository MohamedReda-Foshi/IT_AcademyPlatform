import React from 'react';
import Button from './Button';

// Type definitions
type PricingTier = 'starter' | 'pro';

interface FeatureItemProps {
  text: string;
}

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  isPro?: boolean;
  buttonText?: string;
  tier: PricingTier;
}

interface PricingSectionProps {
  className?: string;
}

// Reusable check icon component
const CheckIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="size-5 text-indigo-700"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

// Feature item component
const FeatureItem: React.FC<FeatureItemProps> = ({ text }) => (
  <li className="flex items-center gap-1">
    <CheckIcon />
    <span className="text-gray-700">{text}</span>
  </li>
);

// Price card component
const PricingCard: React.FC<PricingCardProps> = ({ 
  title, 
  price, 
  features, 
  isPro = false,
  buttonText = "Get Started",
  tier 
}) => {
  return (
    <div 
      className={`rounded-2xl p-6 shadow-xs sm:px-8 lg:p-12 ${
        isPro 
          ? "border border-red-600 ring-1 ring-indigo-600 sm:order-last" 
          : "border border-gray-200"
      }`}
      data-tier={tier}
    >
      <div className="text-center">
        <h2 className="text-lg font-medium text-white">
          {title}
          <span className="sr-only">Plan</span>
        </h2>

        <p className="mt-2 sm:mt-4">
          <strong className="text-3xl font-bold text-white sm:text-4xl">{price}</strong>
          <span className="text-sm font-medium text-white">/month</span>
        </p>
      </div>

      <ul className="mt-6 space-y-2">
        {features.map((feature, index) => (
          <FeatureItem key={index} text={feature} />
        ))}
      </ul>
        <Button button={buttonText}/>
    </div>
  );
};

const PricingSection: React.FC<PricingSectionProps> = ({ className = "" }) => {
  // Feature data
  const pricingData: Record<PricingTier, { title: string; price: string; features: string[] }> = {
    starter: {
      title: "Starter",
      price: "free",
      features: [
        "10 users included",
        "2GB of storage",
        "Email support",
        "Help center access"
      ]
    },
    pro: {
      title: "Pro",
      price: "30$",
      features: [
        "20 users included",
        "5GB of storage",
        "Email support",
        "Help center access",
        "Phone support",
        "Community access"
      ]
    }
  };

  return (
    <div className={`mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 ${className}`}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center md:gap-8">
        <PricingCard
          title={pricingData.pro.title}
          price={pricingData.pro.price}
          features={pricingData.pro.features}
          isPro={true}
          tier="pro"
        />
        <PricingCard
          title={pricingData.starter.title}
          price={pricingData.starter.price}
          features={pricingData.starter.features}
          tier="starter"
        />
      </div>
    </div>
  );
};

export default PricingSection;