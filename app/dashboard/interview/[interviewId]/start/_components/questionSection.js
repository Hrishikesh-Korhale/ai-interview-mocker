import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";

export const QuestionSection = ({
  mockInterviewQuestions,
  activeQuestionIndex,
  setActiveQuestionIndex,
}) => {
  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry, Your browser does not support text to speech");
    }
  };
  return (
    mockInterviewQuestions && (
      <div className="p-5 border rounded-lg my-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {mockInterviewQuestions &&
            mockInterviewQuestions.map((interview, index) => (
              <h2
                key={index} // Unique key
                className={`p-2 rounded-full text-xs md:text-sm text-center cursor-pointer
                ${
                  activeQuestionIndex === index
                    ? "bg-primary text-white"
                    : "bg-secondary"
                }`}
                onClick={() => setActiveQuestionIndex(index)}
              >
                Questions #{index + 1}
              </h2>
            ))}
        </div>
        <h2 className="my-5 text-sm md:text-lg">
          {mockInterviewQuestions[activeQuestionIndex]?.Question}
        </h2>
        <Volume2
          onClick={() =>
            textToSpeech(mockInterviewQuestions[activeQuestionIndex]?.Question)
          }
          className="cursor-pointer"
        />

        <div className="border rounded-lg p-5 bg-blue-100 mt-20">
          <h2 className="flex gap-2 items-center text-primary">
            <Lightbulb />
            <strong>Note:</strong>
          </h2>
          <h2 className="text-sm text-primary">
            {process.env.NEXT_PUBLIC_QUESTION_NOTE}
          </h2>
        </div>
      </div>
    )
  );
};
