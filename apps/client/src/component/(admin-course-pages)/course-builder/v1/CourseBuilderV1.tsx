"use client";

import { deleteCourseById } from "@/api/courses/course/delete-course-by-id";
import { getCourseById } from "@/api/courses/course/get-course-by-id";
import { createSection } from "@/api/courses/section/create-section";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import AddAssignment from "../../add-assignment/AddAssignment";
import AddSection from "../../add-section/AddSection"; // ✅ wrapper import

type Props = {
  courseId: string;
};

/* ---------------- Delete Confirmation Modal ---------------- */

const ConfirmDeleteModal = ({
  open,
  onClose,
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-800 p-6">
        <h2 className="text-lg font-semibold text-white">
          Delete this course?
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          This action is permanent and cannot be undone.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-500 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

/* ---------------- Create Section Modal ---------------- */

const CreateSectionModal = ({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (sectionName: string) => void;
}) => {
  const [sectionName, setSectionName] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-800 p-6">
        <h2 className="text-lg font-semibold text-white">
          Create new section
        </h2>

        <div className="mt-4">
          <label className="text-sm text-slate-400">
            Section name
          </label>
          <input
            type="text"
            value={sectionName}
            onChange={(e) => setSectionName(e.target.value)}
            placeholder="e.g. Introduction"
            className="mt-2 w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-500"
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              if (!sectionName.trim()) return;
              onSubmit(sectionName);
              setSectionName("");
            }}
            className="px-4 py-2 rounded-lg bg-sky-600 text-black font-medium hover:bg-sky-500 transition"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

/* ---------------- Main Component ---------------- */

const CourseBuilderV1 = ({ courseId }: Props) => {
  const router = useRouter();
  const [course, setCourse] = useState<any>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showCreateSection, setShowCreateSection] = useState(false);

  const fetchCourse = async () => {
    const res = await getCourseById(courseId);
    console.log("FULL COURSE DATA 👉", res.data);
    setCourse(res.data);
  };

  useEffect(() => {
    if (!courseId) return;
    fetchCourse();
  }, [courseId]);

  if (!course) {
    return <div className="text-white">Loading...</div>;
  }

  const sections = course.courseSections || [];

  return (
    <div className="p-4 pt-0">
      {/* TOP BAR */}
      <div className="flex items-center justify-between">
        <h1 className="text-white text-2xl">
          {course.name} by {course.instructorName}
        </h1>

        <div className="flex gap-3">
          <button className="px-3 py-1.5 text-sm rounded-md border border-slate-700 text-sky-300 hover:border-sky-500 transition">
            Upload Certificate
          </button>

          <button className="px-3 py-1.5 text-sm rounded-md border border-slate-700 text-sky-300 hover:border-sky-500 transition">
            Upload Thumbnail
          </button>

          <button className="px-4 py-1.5 text-sm rounded-md bg-sky-600 text-black font-medium hover:bg-sky-500 transition">
            Publish
          </button>
        </div>
      </div>

      {/* ADD BUTTONS */}
      <div className="flex gap-3 mt-6">
        <button
          onClick={() => setShowCreateSection(true)}
          className="px-3 py-1.5 text-sm rounded-md bg-slate-800 text-sky-300 hover:bg-slate-700 transition"
        >
          + Add Section
        </button>

        <button
          className="px-3 py-1.5 text-sm rounded-md bg-slate-800 text-sky-300 hover:bg-slate-700 transition"
        >
          + Add Assignment
        </button>
      </div>

      {/* SECTIONS LIST */}
      <div className="mt-10 space-y-8">
        {sections.map((section: any, index: number) => (
          <AddSection
            key={section.id}
            sectionNumber={index + 1}
            sectionData={section}
          />
        ))}
      </div>

      {/* FLOATING DELETE */}
      <button
        onClick={() => setShowDeleteConfirm(true)}
        className="fixed bottom-6 right-6 flex items-center gap-2 px-4 py-3 rounded-full bg-red-500/15 backdrop-blur-md border border-red-500/30 text-red-300 shadow-lg hover:border-red-400/60 transition"
      >
        <Trash2 size={18} />
        Delete
      </button>

      <ConfirmDeleteModal
        open={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={async () => {
          await deleteCourseById(courseId);
          toast.success("Course deleted");
          router.push("/admin-dashboard/courses");
        }}
      />

      <CreateSectionModal
        open={showCreateSection}
        onClose={() => setShowCreateSection(false)}
        onSubmit={async (sectionName) => {
          try {
            await createSection(courseId, sectionName);
            toast.success("Section created");
            setShowCreateSection(false);
            await fetchCourse();
          } catch {
            toast.error("Unable to create section");
          }
        }}
      />
    </div>
  );
};

export default CourseBuilderV1;
