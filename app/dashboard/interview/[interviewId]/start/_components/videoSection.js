import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic, StopCircle } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAI";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment/moment";

const VideoSection = ({
  mockInterviewQuestions,
  activeQuestionIndex,
  setActiveQuestionIndex,
  interviewData,
}) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    results.map((result) => {
      setUserAnswer((preAns) => preAns + result.transcript);
    });
  }, [results]);

  useEffect(() => {
    if (!isRecording) {
      if (userAnswer.length >= 10) {
        updateUserAnswer();
      } else if (userAnswer.length > 0) {
        // Show toast only when there’s a short response
        toast(
          "⏳ Your response seems a bit short! Could you try recording again?"
        );
      }
    }
  }, [userAnswer, isRecording]);

  const startStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      setUserAnswer("");
      startSpeechToText();
    }
  };

  const updateUserAnswer = async () => {
    setLoading(true);
    const feedbackPrompt =
      "Question:" +
      mockInterviewQuestions[activeQuestionIndex]?.Question +
      ", User Answer:" +
      userAnswer +
      ",Depends on user answer for given interview question" +
      " please give us rating for answer and feedback as area of imporvment if any" +
      " in just 3 to 5 lines to improve it in JSON format with rating field and feedback field";

    const result = await chatSession.sendMessage(feedbackPrompt);
    let json = result.response.text();
    json = json.replace(/```json|```/g, "");
    const parsedJson = JSON.parse(json);
    console.log(parsedJson);

    const resp = await db.insert(UserAnswer).values({
      mockId: interviewData?.mockId,
      question: mockInterviewQuestions[activeQuestionIndex]?.Question,
      correctAns: mockInterviewQuestions[activeQuestionIndex]?.Answer,
      userAns: userAnswer,
      feedback: parsedJson?.feedback,
      rating: parsedJson?.rating,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      createdAt: moment.utc(),
    });

    setUserAnswer("");
    if (resp) {
      toast.success("Your answer recorded sucessfully");
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex flex-col justify-center items-center bg-black mt-20 rounded-lg p-5">
        <Image
          src={"/webcam.png"}
          height={200}
          width={200}
          className="absolute"
        />
        <Webcam
          mirrored
          style={{
            height: 300,
            width: "100%",
            zIndex: 1000,
          }}
        />
      </div>
      <div className="my-10">
        <Button
          variant="outline"
          onClick={startStopRecording}
          disabled={loading}
        >
          {isRecording ? (
            <h2 className="text-red-600 flex gap-2 items-center">
              <StopCircle size={20} /> Stop Recording...
            </h2>
          ) : (
            <h2 className="text-primary flex gap-2 items-center">
              <Mic size={20} /> Record Answer
            </h2>
          )}
        </Button>
      </div>
    </div>
  );
};

export default VideoSection;
