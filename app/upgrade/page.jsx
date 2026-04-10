"use client";

import React from "react";
import Header from "../dashboard/_components/Header";
import { Button } from "@/components/ui/button";

export default function Upgrade() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "Forever",
      features: [
        "3 interviews per month",
        "Basic feedback",
        "Video recording",
        "Basic analytics",
      ],
      buttonText: "Current Plan",
      highlighted: false,
    },
    {
      name: "Pro",
      price: "$9.99",
      period: "Per Month",
      features: [
        "Unlimited interviews",
        "Advanced feedback & insights",
        "Video recording & playback",
        "Detailed analytics",
        "Performance tracking",
        "Download reports",
        "Priority support",
      ],
      buttonText: "Upgrade to Pro",
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "Contact Sales",
      features: [
        "Everything in Pro",
        "Team collaboration",
        "Custom interview templates",
        "API access",
        "Dedicated support",
        "Advanced customization",
        "SSO integration",
      ],
      buttonText: "Contact Sales",
      highlighted: false,
    },
  ];

  return (
    <>
      <Header />
      <div className="p-10">
        <h2 className="font-bold text-3xl mb-2">Upgrade Your Plan</h2>
        <p className="text-gray-500 mb-12">
          Choose the perfect plan for your interview preparation needs
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-lg border-2 p-8 transition-transform hover:scale-105 ${
                plan.highlighted
                  ? "border-blue-600 bg-gradient-to-br from-blue-50 to-white shadow-lg"
                  : "border-gray-200 bg-white"
              }`}
            >
              {plan.highlighted && (
                <div className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold mb-4">
                  Most Popular
                </div>
              )}
              <h3 className="font-bold text-2xl mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-gray-600 ml-2">{plan.period}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <span className="text-green-600 mr-3 font-bold">✓</span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full py-2 rounded-lg font-bold transition ${
                  plan.highlighted
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>

        <div className="bg-green-50 p-8 rounded-lg border border-green-200 max-w-3xl">
          <h3 className="font-bold text-xl mb-3">Why Upgrade to Pro?</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-green-600 mr-3 font-bold">✓</span>
              <span>Practice unlimited interviews without restrictions</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-3 font-bold">✓</span>
              <span>
                Get in-depth feedback to identify areas for improvement
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-3 font-bold">✓</span>
              <span>Track your progress with detailed performance metrics</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-3 font-bold">✓</span>
              <span>Download professional reports for your records</span>
            </li>
          </ul>
        </div>

        <div className="mt-12 bg-gray-50 p-8 rounded-lg border">
          <h3 className="font-bold text-xl mb-4">All Plans Include</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <span className="text-blue-600 mr-3 text-2xl">→</span>
              <div>
                <h4 className="font-bold mb-1">AI-Powered Questions</h4>
                <p className="text-gray-600 text-sm">
                  Realistic questions tailored to your role and experience
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-blue-600 mr-3 text-2xl">→</span>
              <div>
                <h4 className="font-bold mb-1">Video Recording</h4>
                <p className="text-gray-600 text-sm">
                  Record and review your interview responses
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-blue-600 mr-3 text-2xl">→</span>
              <div>
                <h4 className="font-bold mb-1">Performance Feedback</h4>
                <p className="text-gray-600 text-sm">
                  Get detailed insights on your strengths and weaknesses
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-blue-600 mr-3 text-2xl">→</span>
              <div>
                <h4 className="font-bold mb-1">Progress Tracking</h4>
                <p className="text-gray-600 text-sm">
                  Monitor your improvement over time
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
