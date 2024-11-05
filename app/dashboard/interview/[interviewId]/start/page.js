"use client";
import React from "react";
import { useState, useEffect } from "react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { QuestionSection } from "./_components/questionSection";
import VideoSection from "./_components/videoSection";

const page = ({ params }) => {
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestions, setMockInterviewQuestions] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  useEffect(() => {
    getInterviewDetails();
  }, [params]);

  const getInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));

    const questions = JSON.parse(result[0].jsonMockResp);
    console.log(questions);
    setMockInterviewQuestions(questions);
    setInterviewData(result[0]);
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <QuestionSection
        mockInterviewQuestions={mockInterviewQuestions}
        activeQuestionIndex={activeQuestionIndex}
        setActiveQuestionIndex={setActiveQuestionIndex}
      />
      {/* <VideoSection /> */}

      <VideoSection />
    </div>
  );
};

export default page;
