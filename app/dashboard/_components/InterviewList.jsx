"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import InterviewItemCard from "./InterviewItemCard";

const InterviewList = () => {
  const [mockInterviews, setMockInterviews] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      GetInterviewList();
    }
  }, [user]);

  const GetInterviewList = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(
        eq(MockInterview.createdBy, user?.primaryEmailAddress.emailAddress)
      )
      .orderBy(desc(MockInterview.id));

    setMockInterviews(result);
    setLoading(false); // Set loading to false when data is fetched
  };

  return (
    <div>
      <h2 className="font-medium text-xl">Previous Mock Interviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
        {loading ? (
          // Skeleton loading
          Array.from({ length: 9 }).map((_, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg animate-pulse bg-gray-200 h-32"
            ></div>
          ))
        ) : mockInterviews.length === 0 ? (
          // Message for no interviews
          <div className="col-span-full text-center text-lg text-gray-500">
            No previous mock interviews available.
          </div>
        ) : (
          mockInterviews.map((interview, index) => (
            <InterviewItemCard key={index} interview={interview} />
          ))
        )}
      </div>
    </div>
  );
};

export default InterviewList;
