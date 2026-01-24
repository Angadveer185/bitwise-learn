"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getAssessmentById } from "@/api/assessments/get-assessment-by-id";
import { createAssessmentSection } from "@/api/assessments/create-assessment-section";
import { getAssessmentSections } from "@/api/assessments/get-all-sections";
import { getSectionQuestions } from "@/api/assessments/get-section-questions";
import AddAssessmentCode from "./AddCODEAssessmentQuestion";
import AddAssessmentMCQ from "./AddMCQAssessmentQuestion";

interface BuilderProps {
  assessmentId: string;
}

type Assessment = {
  name: string;
  description: string;
  instruction: string;
  startTime: string;
  endTime: string;
  individualSectionTimeLimit: number;
  status: "UPCOMING" | "LIVE" | "ENDED";
  batchId: string;
};

type Section = {
  id?: string;
  name: string;
  marksPerQuestion: number;
  assessmentType: "CODE" | "NO_CODE";
};

type Question = {
  id: string;
  question?: string;
  options: string[];
  maxMarks: number;
};

// -------------------------------------------------------------------------
// Main Builder
// -------------------------------------------------------------------------

const AssessmentBuilderV1 = ({ assessmentId }: BuilderProps) => {
  const [assessmentData, setAssessmentData] = useState<Assessment | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [openCreateSection, setOpenCreateSection] = useState(false);

  const [openSectionId, setOpenSectionId] = useState<string | null>(null);
  const [questionsBySection, setQuestionsBySection] = useState<
    Record<string, Question[]>
  >({});
  const [loadingSections, setLoadingSections] = useState<
    Record<string, boolean>
  >({});

  const [showAddMCQ, setShowAddMCQ] = useState(false);
  const [showAddCODE, setShowAddCODE] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string>("");
  const [sectionMarks, setSectionMarks] = useState(0);

  const fetchAssessment = async () => {
    const res = await getAssessmentById(assessmentId);
    setAssessmentData(res.data);
  };

  const fetchSections = async () => {
    const data = await getAssessmentSections(assessmentId);
    setSections(Array.isArray(data) ? data : []);
  };

  const fetchQuestions = async (sectionId: string) => {
    if (questionsBySection[sectionId]) return;

    setLoadingSections((prev) => ({ ...prev, [sectionId]: true }));

    try {
      const data = await getSectionQuestions(sectionId);
      setQuestionsBySection((prev) => ({
        ...prev,
        [sectionId]: data || [],
      }));
    } catch (err) {
      toast.error("Failed to load questions");
    } finally {
      setLoadingSections((prev) => ({ ...prev, [sectionId]: false }));
    }
  };

  useEffect(() => {
    fetchAssessment();
    fetchSections();
  }, [assessmentId]);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between px-1 py-4">
        <h1 className="text-xl font-semibold text-white">
          {assessmentData?.name || "Untitled Assessment"}
        </h1>
        <button className="rounded-md bg-[#1DA1F2] px-4 py-2 text-sm font-medium text-black">
          Publish
        </button>
      </div>

      <div className="h-px w-full bg-[#1DA1F2]/60 mb-8" />

      {/* Sections (FAQ Style) */}
      <div className="space-y-4">
        {sections.map((section) => {
          const isOpen = openSectionId === section.id;

          return (
            <div
              key={section.id}
              className="rounded-xl border border-white/10 bg-[#121313]"
            >
              {/* Section Header */}
              <div
                className="flex items-center justify-between p-5 cursor-pointer"
                onClick={() => {
                  if (!section.id) return;

                  if (isOpen) {
                    setOpenSectionId(null);
                  } else {
                    setOpenSectionId(section.id);
                    fetchQuestions(section.id);
                  }
                }}
              >
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {section.name}
                  </h3>
                  <p className="text-sm text-white/60">
                    {section.assessmentType === "NO_CODE" ? "MCQ" : "Code"} •{" "}
                    {section.marksPerQuestion} marks/question
                  </p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!section.id) return;

                    setActiveSectionId(section.id);
                    setSectionMarks(section.marksPerQuestion);

                    section.assessmentType === "NO_CODE"
                      ? setShowAddMCQ(true)
                      : setShowAddCODE(true);
                  }}
                  className="rounded-md bg-[#1DA1F2] px-4 py-2 text-sm font-medium text-black"
                >
                  + Add Question
                </button>
              </div>

              {/* FAQ Content */}
              {isOpen && (
                <div className="border-t border-white/10 px-5 py-4 space-y-3">
                  {loadingSections[section.id!] ? (
                    <p className="text-sm text-white/50">
                      Loading questions…
                    </p>
                  ) : questionsBySection[section.id!]?.length ? (
                    questionsBySection[section.id!].map((q, i) => (
                      <div
                        key={q.id}
                        className="rounded-lg border border-white/10 bg-[#181A1A] px-4 py-3"
                      >
                        <p className="text-sm text-white">
                          {i + 1}. {q.question || "Code Question"}
                        </p>
                        <p className="text-xs text-white/50 mt-1">
                          Max Marks: {q.maxMarks}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-white/50">
                      No questions added yet.
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Modals */}
      <AddAssessmentMCQ
        open={showAddMCQ}
        onClose={() => setShowAddMCQ(false)}
        sectionId={activeSectionId}
        maxMarks={sectionMarks}
      />

      <AddAssessmentCode
        open={showAddCODE}
        onClose={() => setShowAddCODE(false)}
      />
    </div>
  );
};

export default AssessmentBuilderV1;
