"use client";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Feedback = ({ params }) => {
  const router = useRouter();
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [overallRating, setOverallRating] = useState(0);

  useEffect(() => {
    GetFeedback();
  }, []);

  const GetFeedback = async () => {
    setLoading(true);
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockId, params.interviewId))
      .orderBy(UserAnswer.id);
    console.log(result);
    setFeedbackList(result);
    setLoading(false);

    // Calculate overall rating (if feedback exists)
    if (result.length > 0) {
      const totalRating = result.reduce((acc, feedback) => acc + Number(feedback.rating), 0);
      const averageRating = totalRating / result.length;
      setOverallRating(averageRating.toFixed(1)); // Round to 1 decimal place
    }
  };

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold text-green-500">Congratulations</h2>
      <h2 className="font-bold text-2xl">Here is your interview feedback</h2>

      {loading ? (
        <div className="space-y-4 mt-7">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg animate-pulse bg-gray-200 h-20"
            ></div>
          ))}
        </div>
      ) : feedbackList.length > 0 ? (
        <>
          <h2 className="text-primary text-lg my-3">
            Your overall interview rating: {overallRating}/10
          </h2>
          <h2 className="text-sm text-gray-500">
            Find below interview questions with correct answer, Your answer and
            feedback for improvement
          </h2>

          {feedbackList.map((feedback, index) => (
            <Collapsible key={index} className="mt-7">
              <CollapsibleTrigger className="p-2 bg-secondary rounded-lg flex justify-between my-2 text-left gap-7 w-full">
                {feedback?.question}
                <ChevronsUpDown className="w-5 h-5" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="flex flex-col gap-2">
                  <h2 className="text-red-500 p-2 border rounded-lg ">
                    <strong>Rating: </strong>
                    {feedback.rating}
                  </h2>
                  <h2 className="p-2 border rounded-lg bg-red-50 text-red-900">
                    <strong>Your Answer: </strong>
                    {feedback.userAns}
                  </h2>
                  <h2 className="p-2 border rounded-lg bg-green-50 text-green-900">
                    <strong>Correct Answer: </strong>
                    {feedback.correctAns}
                  </h2>
                  <h2 className="p-2 border rounded-lg bg-blue-50 text-primary">
                    <strong>Feedback: </strong>
                    {feedback.feedback}
                  </h2>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </>
      ) : (
        <h2 className="text-primary text-lg my-3">No feedback available.</h2>
      )}

      <div className="flex justify-end mt-2">
        <Button onClick={() => router.push("/dashboard")}>Go Home</Button>
      </div>
    </div>
  );
};

export default Feedback;
