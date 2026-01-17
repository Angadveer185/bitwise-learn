"use client";

import { deleteCourseById } from "@/api/courses/course/delete-course-by-id";
import { getCourseById } from "@/api/courses/course/get-course-by-id";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import AddAssignment from "../../add-assignment/AddAssignment";
import AddSection from "../../add-section/v1/AddSectionV1";

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

/* ---------------- Main Component ---------------- */

const CourseBuilderV1 = ({ courseId }: Props) => {
  const router = useRouter();
  const [course, setCourse] = useState<any>(null);
  const [blocks, setBlocks] = useState<any[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (!courseId) return;

    const fetchCourse = async () => {
      const res = await getCourseById(courseId);
      console.log("COURSE RESPONSE : ", res);
      setCourse(res.data);
    };

    fetchCourse();
  }, [courseId]);

  if (!course) {
    return <div className="text-white">Loading...</div>;
  }

  const courseName = course.name;
  const instructorName = course.instructorName;
  const sections = course.courseSections || [];

  const addSection = () => {
    setBlocks((prev) => [...prev, { id: Date.now(), type: "section" }]);
  };

  const addAssignment = () => {
    setBlocks((prev) => [...prev, { id: Date.now(), type: "assignment" }]);
  };

  return (
    <div className="p-4 pt-0">
      {/* top nav */}
      <div className="flex items-center justify-between">
        <h1 className="text-white text-2xl">
          {courseName} by {instructorName}
        </h1>

        <div className="flex gap-3 mt-4">
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

      {/* course sections */}
      <div className="mt-10 space-y-8">
        {sections.map((section: any, index: number) => (
          <AddSection
            key={section.id}
            sectionNumber={index + 1}
            sectionData={section}
          />
        ))}

        {blocks.map((block) => {
          if (block.type === "section") {
            return (
              <AddSection
                key={block.id}
                sectionNumber={sections.length + 1}
              />
            );
          }

          if (block.type === "assignment") {
            return <AddAssignment key={block.id} />;
          }

          return null;
        })}
      </div>

      {/* add buttons */}
      <div className="flex gap-3 mt-6">
        <button
          onClick={addSection}
          className="px-3 py-1.5 text-sm rounded-md bg-slate-800 text-sky-300 hover:bg-slate-700 transition"
        >
          + Add Section
        </button>

        <button
          onClick={addAssignment}
          className="px-3 py-1.5 text-sm rounded-md bg-slate-800 text-sky-300 hover:bg-slate-700 transition"
        >
          + Add Assignment
        </button>
      </div>

      {/* Floating Delete Button */}
      <button
        onClick={() => setShowDeleteConfirm(true)}
        className="
          fixed bottom-6 right-6
          flex items-center gap-2
          px-4 py-3
          rounded-full
          bg-red-500/15
          backdrop-blur-md
          border border-red-500/30
          text-red-300
          shadow-lg
          hover:border-red-400/60
          hover:shadow-[0_0_18px_rgba(239,68,68,0.25)]
          hover:scale-102 transition"
      >
        <Trash2 size={18} />
        Delete
      </button>

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        open={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={async () => {
          try {
            const res = await deleteCourseById(courseId);
            router.push("/admin-dashboard/courses");
            toast.success("Course deleted successfully");
          } catch (error) {
            console.error(error);
            toast.error("Failed to delete course");
          } finally {
            setShowDeleteConfirm(false);
          }
        }}
      />
    </div>
  );
};

export default CourseBuilderV1;
