"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";
import { addContentToSection } from "@/api/courses/section/add-content-to-section";
import toast from "react-hot-toast";

type Props = {
  sectionNumber: number;
  sectionId: string;
  sectionData: {
    id: string;
    name: string;
    courseLearningContents: {
      id: string,
      name: string,
      description: string,
    }[];
  };
};


// ------------------------ Add Topic Modal --------------------------
interface AddTopicModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; description: string }) => void;
}

const AddTopicModal = ({
  open,
  onClose,
  onSubmit,
}: AddTopicModalProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-800 p-6">
        {/* Header */}
        <h2 className="text-lg font-semibold text-white">
          Add new topic
        </h2>

        {/* Topic Name */}
        <div className="mt-4">
          <label className="text-sm text-slate-400">
            Topic name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Introduction to HTML"
            className="
              mt-2 w-full rounded-lg
              bg-slate-800 border border-slate-700
              px-3 py-2 text-sm text-white
              placeholder:text-slate-500
              focus:outline-none focus:border-sky-500
            "
            autoFocus
          />
        </div>

        {/* Description */}
        <div className="mt-4">
          <label className="text-sm text-slate-400">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief description of this topic"
            rows={3}
            className="
              mt-2 w-full resize-none rounded-lg
              bg-slate-800 border border-slate-700
              px-3 py-2 text-sm text-white
              placeholder:text-slate-500
              focus:outline-none focus:border-sky-500
            "
          />
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => {
              setName("");
              setDescription("");
              onClose();
            }}
            className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              if (!name.trim() || !description.trim()) return;
              onSubmit({
                name: name.trim(),
                description: description.trim(),
              });
              setName("");
              setDescription("");
            }}
            className="px-4 py-2 rounded-lg bg-sky-600 text-black font-medium hover:bg-sky-500 transition"
          >
            Add Topic
          </button>
        </div>
      </div>
    </div>
  );
};


// ------------------------------ Main Content ------------------------

const AddSectionV2 = ({ sectionNumber, sectionData, sectionId }: Props) => {

  const [isAddTopicOpen, setIsAddTopicOpen] = useState(false);
  const topics = sectionData.courseLearningContents || [];
  return (
    <div className="relative text-white bg-divBg rounded-2xl px-6 py-4 border border-white/10">
      {/* Delete Section Button */}
      <button
        className="
          absolute top-4 right-4
          p-2 rounded-full
          bg-red-500/10
          border border-red-500/30
          text-red-400
          hover:bg-red-500/20
          hover:border-red-400/60
          transition
        "
        title="Delete section"
      >
        <Trash2 size={16} />
      </button>

      {/* Section Title */}
      <h2 className="text-lg font-semibold">
        Section {sectionNumber}: {sectionData.name}
      </h2>

      {/* Topics list */}
      <div className="mt-4 space-y-3">
  {topics.length === 0 ? (
    <p className="text-sm text-slate-400">
      No topics added yet
    </p>
  ) : (
    topics.map((topic) => (
      <div
        key={topic.id}
        className="
          group
          relative
          flex items-start justify-between
          gap-4
          rounded-lg
          border border-slate-800
          bg-slate-900/60
          px-5 py-3
          transition
          hover:bg-slate-900
        "
      >
        {/* Content */}
        <div className="flex-1">
          <p className="text-[15px] font-medium text-slate-100">
            {topic.name}
          </p>

          {topic.description && (
            <p className="mt-1 text-sm text-slate-400 leading-relaxed">
              {topic.description}
            </p>
          )}
        </div>

        {/* Edit button */}
        <button
          onClick={() => {
            // TODO: open edit topic modal
            console.log("Edit topic:", topic.id);
          }}
          className="
            opacity-0 group-hover:opacity-100
            transition
            rounded-md
            border border-slate-700
            bg-slate-800/80
            px-3 py-1.5
            text-xs
            text-slate-300
            hover:bg-slate-800
            hover:text-white
          "
        >
          Edit
        </button>
      </div>
    ))
  )}
</div>



      {/* Action Button */}
      <div className="mt-4 ml-1">
        <button
          className="
            px-4 py-1.5
            text-sm
            rounded-md
            bg-slate-800
            text-sky-300
            hover:bg-slate-700
            transition
          "
          onClick={() => { setIsAddTopicOpen(true) }}
        >
          + Add Topic
        </button>
      </div>



      {/* --------------- Add Topic Modal ---------------- */}
      <AddTopicModal
        open={isAddTopicOpen}
        onClose={() => setIsAddTopicOpen(false)}
        onSubmit={async (data) => {
          try {
            console.log(data);
            await addContentToSection(sectionId, data.name, data.description);
            toast.success("Created Topic!");
            setIsAddTopicOpen(false);
          } catch (error) {
            console.log(error);
            toast.error("Unable to create topic");
          }
        }}
      />
    </div>
  );
};

export default AddSectionV2;
