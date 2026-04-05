import { Button } from "@/components/ui/button";
import { formatDateWithTime } from "@/utils/dateFormater";
import { useRouter } from "next/navigation";
import React from "react";

const InterviewItemCard = ({ interview }) => {
  const router = useRouter();

  const RetakeClick = () => {
    router.push(`/dashboard/interview/${interview?.mock_id}`);
  };

  const FeedbackClick = () => {
    router.push(`/dashboard/interview/${interview?.mock_id}/feedback`);
  };

  return (
    <div className="border shadow-sm rounded-lg p-3">
      <h2 className="font-bold text-primary">{interview?.job_position}</h2>
      <h2 className="text-sm text-gray-600">
        {interview?.job_experience} Year's of Experience
      </h2>
      <h2 className="text-xs text-gray-400">
        Created At : {formatDateWithTime(new Date(interview?.created_at))}
      </h2>
      <div className="flex justify-between mt-2 gap-5">
        <Button
          size="sm"
          variant="outline"
          className="w-full"
          onClick={() => FeedbackClick()}
        >
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
