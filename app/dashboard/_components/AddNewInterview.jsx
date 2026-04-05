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
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { apiClient } from "../../../utils/api";

const AddNewInterview = () => {
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState();
  const [jobDescription, setJobDescription] = useState();
  const [jobExperience, setJobExperience] = useState();
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setOpenDialog(false);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(jobPosition, jobDescription, jobExperience);

    try {
      const interviewData = {
        job_position: jobPosition,
        job_desc: jobDescription,
        job_experience: jobExperience,
      };

      const response = await apiClient.createInterview(interviewData);
      console.log("Created interview:", response);

      if (response.mock_id) {
        setOpenDialog(false);
        router.push(`/dashboard/interview/${response.mock_id}`);
      } else {
        console.log("Error creating interview");
      }
    } catch (error) {
      console.error("Error creating interview:", error);
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
                        <LoaderCircle className="animate-spin" /> Creating
                        Interview
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
