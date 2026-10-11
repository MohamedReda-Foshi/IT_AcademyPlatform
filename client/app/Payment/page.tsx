"use client";

import React, { useState, useEffect } from "react";
import { useSession, subscription } from "../lib/auth-client";
import PriceSection from "../components/PriceSection";

interface SubscriptionData {
  id: string;
  plan: string;
  status: string;
  periodStart?: Date;
  periodEnd?: Date;
  cancelAtPeriodEnd?: boolean;
}

export default function PaymentPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [currentSubscription, setCurrentSubscription] = useState<SubscriptionData | null>(null);
  const [fetchingSub, setFetchingSub] = useState(true);

  useEffect(() => {
    if (session?.user) {
      fetchSubscription();
    } else {
      setFetchingSub(false);
    }
  }, [session]);

  const fetchSubscription = async () => {
    try {
      const { data } = await subscription.list();
      const active = data?.find(
        (sub: SubscriptionData) => sub.status === "active" || sub.status === "trialing"
      );
      setCurrentSubscription(active || null);
    } catch (err) {
      console.error("Failed to fetch subscription:", err);
    } finally {
      setFetchingSub(false);
    }
  };

  const handleSubscribe = async (plan: string) => {
    if (!session?.user) {
      window.location.href = "/auth/sign-in";
      return;
    }

    setLoading(true);
    try {
      const { error } = await subscription.upgrade({
        plan,
        successUrl: "/Payment/success",
        cancelUrl: "/Payment",
      });

      if (error) {
        console.error("Subscription error:", error);
        alert(error.message || "Failed to start checkout. Please try again.");
      }
    } catch (err) {
      console.error("Failed to start checkout:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleManageSubscription = async () => {
    try {
      const { data, error } = await subscription.billingPortal({
        returnUrl: "/Payment",
      });

      if (error) {
        console.error("Billing portal error:", error);
        alert("Failed to open billing portal.");
        return;
      }

      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error("Failed to open billing portal:", err);
    }
  };

  const planLabels: Record<string, string> = {
    free: "Free",
    "most-used": "Most Used",
    pro: "Pro",
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white">
            <span className="text-red-600">Choose</span> Your Plan
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            Unlock your learning potential with the right plan.
          </p>
        </div>

        {session?.user && !fetchingSub && currentSubscription && (
          <div className="mb-8 p-6 rounded-xl bg-gray-800/50 border border-gray-700/50 text-center">
            <p className="text-gray-300">
              Your current plan:{" "}
              <span className="text-white font-semibold">
                {planLabels[currentSubscription.plan] || currentSubscription.plan}
              </span>
              <span className="ml-2 text-sm text-green-400">
                ({currentSubscription.status})
              </span>
            </p>
            {currentSubscription.periodEnd && (
              <p className="text-sm text-gray-400 mt-1">
                {currentSubscription.cancelAtPeriodEnd
                  ? "Cancels on"
                  : "Renews on"}{" "}
                {new Date(currentSubscription.periodEnd).toLocaleDateString()}
              </p>
            )}
            <button
              onClick={handleManageSubscription}
              className="mt-4 px-6 py-2 text-sm text-red-400 border border-red-600 rounded-md hover:bg-red-600 hover:text-white transition"
            >
              Manage Subscription
            </button>
          </div>
        )}

        {loading && (
          <div className="text-center py-8">
            <p className="text-gray-300">Redirecting to checkout...</p>
          </div>
        )}

        <PriceSection onSubscribe={handleSubscribe} />
      </div>
    </div>
  );
}
