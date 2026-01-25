"use client";

import CourseForm from "@/component/general/CourseForm";
import TeacherForm from "@/component/general/TeacherForm";
import { Plus, X } from "lucide-react";
import { useRef, useState } from "react";
import AssessmentsForm from "./AssessmentsForm";
import { useParams } from "next/navigation";
import CreateStudent from "@/component/CreateStudent/CreateStudent";
import toast from "react-hot-toast";
import { uploadBatches } from "@/api/batches/create-batches";

type TabsProps = {
  value: string;
  onValueChange: (value: string) => void;
};

const RenderComponent = ({ value }: { value: string }) => {
  const params = useParams();
  const batchId = params.id as string;

  switch (value) {
    case "Teachers":
      return <TeacherForm />;
    case "Students":
      return <CreateStudent />;
    case "Courses":
      return <CourseForm batchId={batchId} />;
    case "Assessments":
      return <AssessmentsForm />;
    default:
      return null;
  }
};

export const Tabs = ({ value, onValueChange }: TabsProps) => {
  const [addNew, setAddNew] = useState(false);
  const tabs = ["Students", "Teachers", "Assessments", "Courses"];

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const params = useParams();
  const batchId = params.id as string;

  const handleBulkUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      toast.loading("Uploading students...", { id: "bulk-upload" });

      const formData = new FormData();
      formData.append("file", file);
      formData.append("batchId", batchId);

      await uploadBatches(params.id as string, file, "STUDENT", null);

      toast.success("Students uploaded successfully", {
        id: "bulk-upload",
      });
    } catch (error) {
      console.error(error);
      toast.error("Bulk upload failed", {
        id: "bulk-upload",
      });
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <>
      {/* Bulk upload hidden input */}
      <input
        type="file"
        accept=".csv,.xlsx"
        ref={fileInputRef}
        onChange={handleBulkUpload}
        hidden
      />

      {/* Modal */}
      {addNew && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
          <div className="relative bg-neutral-900 p-6 rounded-lg w-full max-w-3xl">
            <button
              onClick={() => setAddNew(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X />
            </button>

            <RenderComponent value={value} />
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-4 mb-5 mt-5">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onValueChange(tab)}
            className={`px-4 py-1.5 rounded-md text-md ${
              value === tab
                ? "bg-blue-500 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}

        {/* Add New */}
        <button
          onClick={() => setAddNew(true)}
          className="flex items-center gap-2 border border-primaryBlue px-3 py-2 rounded text-white hover:bg-primaryBlue/10"
        >
          <Plus size={18} />
          Add New {value}
        </button>

        {/* Bulk Upload (Students only) */}
        {value === "Students" && (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 border border-primaryBlue px-3 py-2 rounded text-white hover:bg-primaryBlue/10"
          >
            Upload Bulk
          </button>
        )}
      </div>
    </>
  );
};

export default Tabs;
