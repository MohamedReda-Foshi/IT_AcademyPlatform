type PricingTier = 'free' | 'most' | 'pro';

export interface PricingCardProps {
  title: string;
  price: string;
  priceId: string;
  features: string[];
  isMost?: boolean;
  buttonText?: string;
  tier: PricingTier;
  token: string;
}

export interface HandleSubscribeParams {
  priceId: string;
}

export interface FeatureItemProps {
  text: string;
}