"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAI";
import { LoaderCircle } from "lucide-react";
import { MockInterview } from "@/utils/schema";
import { v1 as uuidv1 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment/moment";
import { db } from "@/utils/db";
import { useRouter } from "next/navigation";

const AddNewInterview = () => {
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState();
  const [jobDescription, setJobDescription] = useState();
  const [jobExperience, setJobExperience] = useState();
  const [loading, setLoading] = useState(false);
  const [josnResponse, setJsonResponse] = useState([]);
  const { user } = useUser();

  const handleClose = () => {
    setOpenDialog(false);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(jobPosition, jobDescription, jobExperience);

    const InputPrompt = `Job Position : ${jobPosition}, Job Description : ${jobDescription},  Years of Experience : ${jobExperience}, Based on this information please give me 5 Interview Questions with Answers in JSON format. Give Question and Answer as fields in the JSON.`;

    try {
      const result = await chatSession.sendMessage(InputPrompt);
      let json = result.response.text(); // Ensure this is fetching the right data
      json = json.replace(/```json|```/g, ""); // Remove both '```json' and '```'

      // Parse the cleaned JSON string
      const parsedJson = JSON.parse(json);

      console.log(parsedJson);
      setJsonResponse(json);
      if (json) {
        const resp = await db
          .insert(MockInterview)
          .values({
            mockId: uuidv1(),
            jsonMockResp: json,
            jobPosition: jobPosition,
            jobDesc: jobDescription,
            jobExperience: jobExperience,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment.utc(),
          })
          .returning({ mockId: MockInterview.mockId });
        console.log("Inserted MockId", resp);
        if (resp) {
          setOpenDialog(false);
          router.push(`/dashboard/interview/${resp[0]?.mockId}`);
        }
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.error("Error fetching or parsing the response:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-lg text-center">+ Add New</h2>
      </div>
      <Dialog open={openDialog} onOpenChange={handleClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your job interviewing
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={handleSubmit}>
                <h2>
                  Add Details about your job position/role, job description and
                  years of experience
                </h2>
                <div className="my-3 mt-7">
                  <label>Job Role/Job Position</label>
                  <Input
                    placeholder="Ex. Full Stack Developer"
                    required
                    onChange={(event) => {
                      setJobPosition(event.target.value);
                    }}
                  />
                </div>
                <div className="my-3">
                  <label>Job Description/Tech Stack (In Short)</label>
                  <Textarea
                    placeholder="Ex. React, Angular, NodeJs, MySQL, etc"
                    required
                    onChange={(event) => {
                      setJobDescription(event.target.value);
                    }}
                  />
                </div>
                <div className="my-3">
                  <label>Years of Experience</label>
                  <Input
                    placeholder="Ex. 5"
                    required
                    type="number"
                    max="50"
                    onChange={(event) => {
                      setJobExperience(event.target.value);
                    }}
                  />
                </div>
                <div className="flex gap-5 justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => handleClose()}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin" /> Generating
                        from AI
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewInterview;
