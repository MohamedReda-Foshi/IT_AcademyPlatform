"use client";

import React from 'react';
import Button from './Button';

type PricingTier = 'free' | 'most-used' | 'pro';

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
  onSubscribe?: (plan: string) => void;
}

interface PricingSectionProps {
  className?: string;
  onSubscribe?: (plan: string) => void;
}

const CheckIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="size-5 text-red-600 mt-0.5 flex-shrink-0"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

const FeatureItem: React.FC<FeatureItemProps> = ({ text }) => (
  <li className="flex items-start gap-3 py-2">
    <CheckIcon />
    <span className="text-gray-200">{text}</span>
  </li>
);

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  features,
  isMost = false,
  buttonText = "Get Started",
  tier,
  onSubscribe,
}) => {
  return (
    <div
      className={`rounded-xl bg-gray-800/50 backdrop-blur-lg p-8 transition-all hover:scale-[1.02] ${
        isMost
          ? "ring-2 ring-red-600 shadow-lg"
          : "border border-gray-700/50"
      }`}
      data-tier={tier}
    >
      <div className="text-center">
        <h2 className="text-lg font-medium text-white">
          {title}
          <span className="sr-only">Plan</span>
        </h2>
        <p className="mt-2 sm:mt-4">
          <strong className="text-4xl font-bold text-white">{price}</strong>
          {price !== "Free" && <span className="text-lg font-medium text-gray-300">/month</span>}
        </p>
      </div>
      <ul className="mt-6 space-y-2">
        {features.map((feature, index) => (
          <FeatureItem key={index} text={feature} />
        ))}
      </ul>
      <div className="mt-8">
        <Button button={buttonText} onClick={() => onSubscribe?.(tier)} />
      </div>
    </div>
  );
};

const PricingSection: React.FC<PricingSectionProps> = ({ className = "", onSubscribe }) => {
  const pricingData: Record<PricingTier, { title: string; price: string; features: string[] }> = {
    free: {
      title: "Free",
      price: "Free",
      features: [
        "Access to free courses",
        "Basic community access",
        "Email support",
        "Help center access"
      ]
    },
    "most-used": {
      title: "Most Used",
      price: "$20",
      features: [
        "All free tier features",
        "Access to premium courses",
        "Priority email support",
        "Downloadable resources",
        "Certificate of completion"
      ]
    },
    pro: {
      title: "Pro",
      price: "$30",
      features: [
        "All Most Used features",
        "1-on-1 mentoring sessions",
        "Phone support",
        "Community access",
        "Early access to new courses",
        "Custom learning paths"
      ]
    },
  };

  return (
    <div className={`mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 ${className}`}>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white">
          <span className="text-red-600">Our</span> Pricing
        </h2>
        <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
          Simple, transparent pricing for teams of all sizes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <PricingCard
          title={pricingData.free.title}
          price={pricingData.free.price}
          features={pricingData.free.features}
          tier="free"
          onSubscribe={onSubscribe}
        />
        <PricingCard
          title={pricingData["most-used"].title}
          price={pricingData["most-used"].price}
          features={pricingData["most-used"].features}
          tier="most-used"
          isMost={true}
          onSubscribe={onSubscribe}
        />
        <PricingCard
          title={pricingData.pro.title}
          price={pricingData.pro.price}
          features={pricingData.pro.features}
          tier="pro"
          onSubscribe={onSubscribe}
        />
      </div>
    </div>
  );
};

export default PricingSection;
