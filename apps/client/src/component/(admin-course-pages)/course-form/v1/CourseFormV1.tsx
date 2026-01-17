"use client";

import React from "react";
import { useState } from "react";
import { createCourse } from "@/api/courses/course/create-course";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
type CourseFormData = {
  name: string;
  description: string;
  level: "BASIC" | "INTERMEDIATE" | "ADVANCE";
  duration: string;
  instructorName: string;
};

type CourseFormProps = {
  onClose: () => void;
  onSuccess: () => void;
};

const CourseForm: React.FC<CourseFormProps> = ({ onClose, onSuccess }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<CourseFormData>({
    name: "",
    description: "",
    level: "BASIC",
    duration: "",
    instructorName: "",
  });

  const isFormValid =
    formData.name.trim() &&
    formData.description.trim() &&
    formData.duration.trim() &&
    formData.instructorName.trim();

  const handleSubmit = async () => {
    if (loading) return;

    try {
      setLoading(true);

      await createCourse({
        name: formData.name.trim(),
        description: formData.description.trim(),
        level: formData.level,
        duration: formData.duration.trim(),
        instructorName: formData.instructorName.trim(),
      });
      onSuccess();
    } catch (error: any) {
      console.error("Course creation failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full rounded-2xl bg-[#1E1E1E] p-8 text-white shadow-2xl relative">
      {/* Close Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute right-4 top-4 z-10 rounded-full p-2 hover:bg-neutral-800 transition-colors"
        aria-label="Close"
      >
        <X size={18} />
      </button>

      <h1 className="mb-8 text-2xl font-semibold">Create Course</h1>

      <div className="space-y-6">
        {/* Course Name */}
        <input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full rounded-lg bg-neutral-900 px-4 py-3 outline-none focus:ring-1 focus:ring-[#64ACFF]"
          placeholder="Course title"
        />

        {/* Description */}
        <textarea
          rows={4}
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full rounded-lg bg-neutral-900 px-4 py-3 outline-none focus:ring-1 focus:ring-[#64ACFF]"
          placeholder="Course description"
        />

        {/* Level */}
        <div className="grid grid-cols-3 gap-4">
          {["BASIC", "INTERMEDIATE", "ADVANCE"].map((lvl) => (
            <button
              key={lvl}
              type="button"
              onClick={() =>
                setFormData({
                  ...formData,
                  level: lvl as CourseFormData["level"],
                })
              }
              className={`rounded-lg border px-4 py-3 text-sm transition
                ${
                  formData.level === lvl
                    ? "border-[#64ACFF] bg-[#64ACFF]/20"
                    : "border-neutral-700 hover:border-neutral-500"
                }
              `}
            >
              {lvl}
            </button>
          ))}
        </div>

        {/* Duration */}
        <input
          value={formData.duration}
          onChange={(e) =>
            setFormData({ ...formData, duration: e.target.value })
          }
          className="w-full rounded-lg bg-neutral-900 px-4 py-3 outline-none focus:ring-1 focus:ring-[#64ACFF]"
          placeholder="Duration (e.g. 10 hours)"
        />

        {/* Instructor */}
        <input
          value={formData.instructorName}
          onChange={(e) =>
            setFormData({ ...formData, instructorName: e.target.value })
          }
          className="w-full rounded-lg bg-neutral-900 px-4 py-3 outline-none focus:ring-1 focus:ring-[#64ACFF]"
          placeholder="Instructor name"
        />
      </div>

      {/* Action */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={!isFormValid || loading}
          className="rounded-lg bg-[#64ACFF] px-8 py-2 font-medium text-black
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Creating..." : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default CourseForm;
