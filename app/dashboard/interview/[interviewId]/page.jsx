"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import React, { useEffect, useState } from "react";
import { eq } from "drizzle-orm";
import { useSearchParams } from "next/navigation";
import Webcam from "react-webcam";
import { Lightbulb, WebcamIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const Interview = ({ params }) => {
  const [interviewData, setInterviewData] = useState();
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  useEffect(() => {
    getInterviewDetails();
  }, [params]);

  const getInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));
    setInterviewData(result[0]);
  };
  return (
    <div className="my-10 ">
      <h2 className="font-bold text-2xl">Let's Get Started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col gap-5 ">
          <div className="flex flex-col my-5 gap-5 p-5 rounded-lg border">
            <h2 className="text-lg">
              <strong>Job Role/Job Position : </strong>
              {interviewData?.jobPosition}
            </h2>
            <h2 className="text-lg">
              <strong>Job Description/Tech Stack : </strong>
              {interviewData?.jobDesc}
            </h2>
            <h2 className="text-lg">
              <strong>Years of Experience : </strong>
              {interviewData?.jobExperience}
            </h2>
          </div>
          <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100">
            <h2 className="flex gap-2 items-center text-yellow-500">
              <Lightbulb />
              <storng>Information</storng>
            </h2>
            <h2 className="mt-3 text-yellow-500">
              {process.env.NEXT_PUBLIC_INFORMATION}
            </h2>
          </div>
        </div>
        <div>
          {webCamEnabled ? (
            <Webcam
              mirrored
              className="h-72 w-full my-7"
              onUserMedia={() => setWebCamEnabled(true)}
              onUserMediaError={() => setWebCamEnabled(false)}
            />
          ) : (
            <>
              <WebcamIcon className="h-72 w-full p-20 my-7 bg-secondary rounded-lg border" />
              <Button
                onClick={() => setWebCamEnabled(true)}
                className="w-full"
                variant="ghost"
              >
                Enable Web Cam and Microphone
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="flex justify-end items-end">
        <Button>Start</Button>
      </div>
    </div>
  );
};

export default Interview;
