"use client"
import React from 'react';
import type{ 
  HandleSubscribeParams,
  FeatureItemProps
} from './../types/PricingCard'
/*import { redirect } from 'next/navigation';
import type { NextAuthOptions } from "next-auth";
import { authOptions } from "../lib/nextAuth"; // adjust your path
import { getServerSession } from "next-auth/next";
*/
// Type definitions
type PricingTier = 'free' | 'most' | 'pro';



interface PricingCardProps {
  title: string;
  price: string;
  priceId:string;
  features: string[];
  isMost?: boolean;
  buttonText?: string;
  tier: PricingTier;
}





const handleSubscribe = async ({ priceId }: HandleSubscribeParams): Promise<void> => {
  try {
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_EXPRESS_URL}/subscribe/stripe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        
      },
      body: JSON.stringify({ priceId }),
    });
    const sessionData = await response.json();
    if (sessionData.url) {
      window.location.href = sessionData.url;
    }
  } catch (err: unknown) {
    console.log("Subscription error POST FRONT",err);
  }
};

// Reusable check icon component
const CheckIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="w-5 h-5  text-red-600 mt-0.5 flex-shrink-0"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

// Feature item component
const FeatureItem: React.FC<FeatureItemProps> = ({ text }) => (
  <li className="flex items-start gap-3 py-2">
    <CheckIcon />
    <span className="text-gray-200">{text}</span>
  </li>
);

// Price card component
const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  priceId,
  features,
  isMost = false,
  buttonText = "Get Started",
  tier
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
          <span className="text-lg font-medium text-gray-300">/month</span>
        </p>
      </div>
      <ul className="mt-6 space-y-2">
        {features.map((feature, index) => (
          <FeatureItem key={index} text={feature} />
        ))}
      </ul>
      <div className="mt-8">
        
        <button
        className='bg-red-700 hover:bg-red-800 px-4 py-2 rounded-md transition' 
          onClick={() => handleSubscribe({priceId})}>
          {buttonText}
        </button>
       
      </div>
    </div>
  );
};

const PricingSection: React.FC = () => {
  // Feature data
  const pricingData: Record<PricingTier, { title: string; 
    price: string; 
    features: string[];
    priceId:string
   }> = {
    free: {
      title: "Free",
      price: "Free",
      priceId:"price_1Ri8TxFyLYskgycBDaZ9jGnQ",
      features: [
        "Users can browse and watch course introductions only.",
        "Read-only access to public discussion threads.",
        "Email support",
        "Help center access"
      ]
    },
    most: {
      title: "Most Used",
      priceId:"price_1Ri8UNFyLYskgycB4JMtmM2L",
      price: "20$",
      features: [
        "Full access to all course videos, lectures.",
        "Email support with 24-hour turnaround on weekdays.",
        "Access to our IT-related e-book library (PDFs).",
      ]
    },
    pro: {
      title: "Pro",
      price: "30$",
      priceId:"price_1Ri8UoFyLYskgycBd1xHSMwJ",
      features: [
        "Full access to all course videos, lectures.",
        "Email support with 24-hour turnaround on weekdays.",
        "Access to our IT-related e-book library (PDFs, ePubs).",
        "24/7 live chat support and priority email response.",
        "Monthly live Q&A/webinar sessions with instructors. "
      ]
    },
  };
  
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white">
          <span className="text-red-600">Our</span> Pricing
        </h2>
        <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
          Simple, transparent pricing for teams of all sizes.
        </p>
      </div>
        <div className='flex flex-col  md:flex md:flex-row gap-6'>

        <PricingCard
          title={pricingData.free.title}
          price={pricingData.free.price}
          priceId={pricingData.free.priceId}
          features={pricingData.free.features}
          tier="free"
          />
        <PricingCard
          title={pricingData.most.title}
          price={pricingData.most.price}
          priceId={pricingData.most.priceId}
          features={pricingData.most.features}
          tier="most"
          isMost={true}
        />
        <PricingCard
          title={pricingData.pro.title}
          price={pricingData.pro.price}
          priceId={pricingData.pro.priceId}
          features={pricingData.pro.features}
          tier="pro"
          />
        </div>
      </div>
   
  
  );
};

export default PricingSection;