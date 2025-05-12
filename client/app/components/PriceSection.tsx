import React from 'react';
import Button from './Button';

// Type definitions
type PricingTier = 'free' | 'most' | 'pro';

interface FeatureItemProps {
  text: string;
}

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  isMost?: boolean;
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
    className="size-5 text-red-700"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

// Feature item component
const FeatureItem: React.FC<FeatureItemProps> = ({ text }) => (
  <li className="flex items-center gap-1">
    <CheckIcon />
    <span className="text-white">{text}</span>
  </li>
);

// Price card component
const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  features,
  isMost = false,
  buttonText = "Get Started",
  tier
}) => {
  return (
    <div
      className={`rounded-2xl p-6 shadow-xs sm:px-8 lg:p-12 ${
        isMost
          ? "border border-red-600 ring-1"
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
      <div className="mt-8">
        <Button button={buttonText} />
      </div>
    </div>
  );
};

const PricingSection: React.FC<PricingSectionProps> = ({ className = "" }) => {
  // Feature data
  const pricingData: Record<PricingTier, { title: string; price: string; features: string[] }> = {
    free: {
      title: "Free",
      price: "Free",
      features: [
        "10 users included",
        "2GB of storage",
        "Email support",
        "Help center access"
      ]
    },
    most: {
      title: "Starter",
      price: "15$",
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
    },
  };
  
  return (
    <div className={`mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 ${className}`}>
      <div className="flex items-center p-9 justify-center">
        <span className="text-red-600 text-3xl font-bold">Our </span>
        <span className="text-white text-3xl font-bold">Team</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <PricingCard
          title={pricingData.free.title}
          price={pricingData.free.price}
          features={pricingData.free.features}
          tier="free"
        />
        <PricingCard
          title={pricingData.most.title}
          price={pricingData.most.price}
          features={pricingData.most.features}
          tier="most"
          isMost={true}
        />
        <PricingCard
          title={pricingData.pro.title}
          price={pricingData.pro.price}
          features={pricingData.pro.features}
          tier="pro"
        />
      </div>
    </div>
  );
};

export default PricingSection;