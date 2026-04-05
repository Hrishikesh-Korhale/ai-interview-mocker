import React from "react";
import Header from "../dashboard/_components/Header";

export default function Questions() {
  const faqs = [
    {
      question: "How does the AI generate interview questions?",
      answer:
        "Our advanced AI system uses machine learning to generate realistic interview questions based on the job role, company, and years of experience you provide. The questions are tailored to match real-world interview scenarios.",
    },
    {
      question: "Can I retake the same interview?",
      answer:
        "Yes! You can practice the same interview as many times as you want. This helps you refine your answers and build confidence before the actual interview.",
    },
    {
      question: "What feedback do I get after each interview?",
      answer:
        "You receive comprehensive feedback including: answer quality score, communication clarity, confidence level, suggested improvements, and overall performance rating.",
    },
    {
      question: "What formats of questions are included?",
      answer:
        "Our interviews include technical questions, behavioral questions, situational questions, and role-specific questions to provide a realistic interview experience.",
    },
    {
      question: "Can I download my interview feedback?",
      answer:
        "Yes, you can download detailed feedback reports for each interview session. This helps you track your progress over time.",
    },
    {
      question: "Is there a limit to how many interviews I can create?",
      answer:
        "With a free account, you get limited interviews. Upgrade to premium for unlimited interview sessions and advanced analytics.",
    },
    {
      question: "How long does an interview session take?",
      answer:
        "A typical interview session takes 15-30 minutes, depending on the number of questions and complexity of your role.",
    },
    {
      question: "Can I improve my performance over time?",
      answer:
        "Absolutely! Track your performance metrics, review feedback, and practice regularly. You'll see improvement in your scores and confidence.",
    },
  ];

  return (
    <>
      <Header />
      <div className="p-10">
        <h2 className="font-bold text-3xl mb-2">Frequently Asked Questions</h2>
        <p className="text-gray-500 mb-8">
          Find answers to common questions about AI Interview Mocker
        </p>

        <div className="space-y-6 max-w-3xl">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg border">
              <h3 className="font-bold text-lg mb-3 text-gray-800">
                {faq.question}
              </h3>
              <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-blue-50 p-8 rounded-lg border border-blue-200 max-w-3xl">
          <h3 className="font-bold text-xl mb-3">Still have questions?</h3>
          <p className="text-gray-700 mb-4">
            Can't find the answer you're looking for? Please contact our support
            team.
          </p>
          <a
            href="mailto:support@aiinterviewmocker.com"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Contact Support
          </a>
        </div>
      </div>
    </>
  );
}
