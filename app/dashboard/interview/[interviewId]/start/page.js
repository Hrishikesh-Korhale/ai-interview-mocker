"use client";
import React from "react";
import { useState, useEffect } from "react";
import { QuestionSection } from "./_components/questionSection";
import VideoSection from "./_components/videoSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { apiClient } from "../../../../../utils/api";

const page = ({ params }) => {
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestions, setMockInterviewQuestions] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  useEffect(() => {
    getInterviewDetails();
  }, [params]);

  const getInterviewDetails = async () => {
    try {
      const result = await apiClient.getInterview(params.interviewId);
      const questions = JSON.parse(result.json_mock_resp);
      console.log(questions);
      setMockInterviewQuestions(questions);
      setInterviewData(result);
    } catch (error) {
      console.error("Error fetching interview details:", error);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <QuestionSection
          mockInterviewQuestions={mockInterviewQuestions}
          activeQuestionIndex={activeQuestionIndex}
          setActiveQuestionIndex={setActiveQuestionIndex}
        />
        {/* <VideoSection /> */}

        <VideoSection
          mockInterviewQuestions={mockInterviewQuestions}
          activeQuestionIndex={activeQuestionIndex}
          setActiveQuestionIndex={setActiveQuestionIndex}
          interviewData={interviewData}
        />
      </div>
      <div className="flex justify-end gap-6">
        {activeQuestionIndex > 0 && (
          <Button
            onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
          >
            Previous Question
          </Button>
        )}
        {activeQuestionIndex !== mockInterviewQuestions?.length - 1 && (
          <Button
            onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
          >
            Next Question
          </Button>
        )}
        {activeQuestionIndex === mockInterviewQuestions?.length - 1 && (
          <Link
            href={
              "/dashboard/interview/" + interviewData?.mock_id + "/feedback"
            }
          >
            <Button>End Interview</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default page;
