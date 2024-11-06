import { Button } from "@/components/ui/button";
import { formatDateWithTime } from "@/utils/dateFormater";
import { useRouter } from "next/navigation";
import React from "react";

const InterviewItemCard = ({ interview }) => {
  const router = useRouter();

  const RetakeClick = () => {
    router.push(`/dashboard/interview/${interview?.mockId}`);
  };

  const FeedbackClick = () => {
    router.push(`/dashboard/interview/${interview?.mockId}/feedback`)
  }

  return (
    <div className="border shadow-sm rounded-lg p-3">
      <h2 className="font-bold text-primary">{interview?.jobPosition}</h2>
      <h2 className="text-sm text-gray-600">
        {interview?.jobExperience} Year's of Experience
      </h2>
      <h2 className="text-xs text-gray-400">
        Created At : {formatDateWithTime(JSON.parse(interview?.createdAt))}
      </h2>
      <div className="flex justify-between mt-2 gap-5">
        <Button size="sm" variant="outline" className="w-full" onClick={() => FeedbackClick()}>
          Feedback
        </Button>
        <Button size="sm" className="w-full" onClick={() => RetakeClick()}>
          Retake
        </Button>
      </div>
    </div>
  );
};

export default InterviewItemCard;
