"use client";

import React from "react";
import Header from "../dashboard/_components/Header";

export default function HowItWorks() {
  return (
    <>
      <Header />
      <div className="p-10">
        <h2 className="font-bold text-3xl mb-2">How It Works</h2>
        <p className="text-gray-500 mb-8">
          Learn how to get started with AI Interview Mocker
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg border">
            <h3 className="font-bold text-xl mb-3">Step 1: Create Interview</h3>
            <p className="text-gray-600">
              Start by creating a new interview session. Choose the job role,
              company name, and years of experience to customize the interview
              questions.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg border">
            <h3 className="font-bold text-xl mb-3">Step 2: Start Interview</h3>
            <p className="text-gray-600">
              Answer the AI-generated interview questions on video. Our AI
              interviewer will ask questions based on your role and experience
              level.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg border">
            <h3 className="font-bold text-xl mb-3">Step 3: Get Feedback</h3>
            <p className="text-gray-600">
              Receive detailed feedback on your responses from our advanced AI
              system. Get insights on areas to improve and your overall
              performance.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg border">
            <h3 className="font-bold text-xl mb-3">
              Step 4: Practice & Improve
            </h3>
            <p className="text-gray-600">
              Review your feedback and practice again. Repeat the process to
              build confidence and improve your interview skills.
            </p>
          </div>
        </div>

        <div className="mt-12 bg-blue-50 p-8 rounded-lg border border-blue-200">
          <h3 className="font-bold text-xl mb-3">Key Features</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-600 mr-3 font-bold">✓</span>
              <span>
                AI-powered interview questions customized to your role
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-3 font-bold">✓</span>
              <span>Real-time video recording and playback</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-3 font-bold">✓</span>
              <span>Detailed performance feedback and analysis</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-3 font-bold">✓</span>
              <span>Track your progress over time</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-3 font-bold">✓</span>
              <span>Practice unlimited interviews</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
