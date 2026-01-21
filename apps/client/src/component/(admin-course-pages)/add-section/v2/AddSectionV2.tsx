"use client";

import { Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { addContentToSection } from "@/api/courses/section/add-content-to-section";
import toast from "react-hot-toast";
import { deleteSectionById } from "@/api/courses/section/delete-section";
import { updateContentToSection } from "@/api/courses/section/update-content-to-section";
import { uploadTranscript } from "@/api/courses/section/upload-transcript";
import { deleteContentFromSection } from "@/api/courses/section/delete-content-from-section";

type Props = {
  sectionNumber: number;
  sectionId: string;
  sectionData: {
    id: string;
    name: string;
    courseLearningContents: {
      id: string;
      name: string;
      description: string;
      transcript: string;
    }[];
  };
  onAddAssignment: (sectionId: string) => void;
  onSectionDeleted: () => void;
};

type UpdateContentPayload = {
  name?: string;
  description?: string;
  transcript?: File | null;
  videoUrl?: string;
};

// ------------------------ Add Topic Modal --------------------------
interface AddTopicModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; description: string }) => void;
}

const AddTopicModal = ({ open, onClose, onSubmit }: AddTopicModalProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-800 p-6">
        {/* Header */}
        <h2 className="text-lg font-semibold text-white">Add new topic</h2>

        {/* Topic Name */}
        <div className="mt-4">
          <label className="text-sm text-slate-400">Topic name</label>
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
          <label className="text-sm text-slate-400">Description</label>
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

const ConfirmDeleteSectionModal = ({
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-800 p-6"
      >
        <h2 className="text-lg font-semibold text-white">
          Delete this section?
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          All topics & assignments inside this section will be removed.
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

// -------------------------------- Update Topic Modal --------------------
interface UpdateTopicModalProps {
  open: boolean;
  onClose: () => void;
  initialData: {
    name: string;
    description: string;
    transcript: string;
    videoUrl?: string;
  };
  onUpdate: (data: {
    name: string;
    description: string;
    transcript: string;
    transcriptFile: File | null;
    videoUrl: string;
  }) => void;
}
const UpdateTopicModal = ({
  open,
  onClose,
  initialData,
  onUpdate,
}: UpdateTopicModalProps) => {
  const [name, setName] = useState(initialData.name);
  const [description, setDescription] = useState(initialData.description);
  const [videoUrl, setVideoUrl] = useState(initialData.videoUrl || "");
  const [transcriptText, setTranscriptText] = useState("");
  const [transcriptFile, setTranscriptFile] = useState<File | null>(null);

  useEffect(() => {
    if (open) {
      setName(initialData.name);
      setDescription(initialData.description);
      setVideoUrl(initialData.videoUrl || "");
      setTranscriptText(initialData.transcript || "");
      setTranscriptFile(null);
    }
  }, [open, initialData]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="mt-2 w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-800 p-8">
        {/* Header */}
        <h2 className="text-xl font-semibold text-white">Update Topic</h2>

        {/* Grid Layout */}
        <div className="mt-6 grid grid-cols-2 gap-5">
          {/* Topic Name */}
          <div className="col-span-2">
            <label className="text-sm text-slate-400">Topic name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* Description */}
          <div className="col-span-2">
            <label className="text-sm text-slate-400">Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-2 w-full resize-none rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* Transcript Text */}
          <div className="col-span-2">
            <label className="text-sm text-slate-400">
              Transcript (paste text)
            </label>
            <textarea
              rows={4}
              value={transcriptText}
              onChange={(e) => setTranscriptText(e.target.value)}
              placeholder="Paste transcript text here (optional)"
              className="mt-2 w-full resize-none rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* Upload File */}
          <div className="col-span-2">
            <label className="text-sm text-slate-400">Upload File</label>
            <input
              type="file"
              accept=".txt,.pdf,.doc,.docx"
              onChange={(e) => setTranscriptFile(e.target.files?.[0] || null)}
              className="mt-2 w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-sm text-slate-300
              file:mr-3 file:rounded-md file:border-0 file:bg-slate-700
              file:px-3 file:py-1 file:text-sm file:text-white hover:file:bg-slate-600"
            />
          </div>

          {/* Video URL */}
          <div className="col-span-2">
            <label className="text-sm text-slate-400">Video URL</label>
            <input
              type="url"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://youtube.com/..."
              className="mt-2 w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-500"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              if (!name.trim() || !description.trim()) return;

              onUpdate({
                name: name.trim(),
                description: description.trim(),
                transcript: transcriptText.trim(),
                transcriptFile,
                videoUrl: videoUrl.trim(),
              });
            }}
            className="px-5 py-2 rounded-lg bg-emerald-500 text-black font-medium hover:bg-emerald-400 transition"
          >
            Update Topic
          </button>
        </div>
      </div>
    </div>
  );
};

// ------------------------------ Main Content ------------------------

const AddSectionV2 = ({
  sectionNumber,
  sectionData,
  sectionId,
  onAddAssignment,
  onSectionDeleted,
}: Props) => {
  const [isAddTopicOpen, setIsAddTopicOpen] = useState(false);
  const topics = sectionData.courseLearningContents || [];
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeleteTopicConfirm, setShowDeleteTopicConfirm] = useState(false);
  const [topicToDelete, setTopicToDelete] = useState<string | null>(null);

  const handleDeleteSection = async () => {
    try {
      await deleteSectionById(sectionId);
      toast.success("Section deleted");
      onSectionDeleted();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete section");
    } finally {
      setShowDeleteConfirm(false);
    }
  };
  const [isUpdateTopicOpen, setIsUpdateTopicOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<{
    id: string;
    name: string;
    description: string;
    transcript: string;
  } | null>(null);

  const handleDeleteTopic = async () => {
    if (!topicToDelete) return;

    const toastId = toast.loading("Deleting Topic...");
    try {
      await deleteContentFromSection(topicToDelete);
      toast.success("Topic Deleted", { id: toastId });
      onSectionDeleted();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete topic", { id: toastId });
    } finally {
      setShowDeleteTopicConfirm(false);
      setTopicToDelete(null);
    }
  };

  return (
    <div className="relative text-white bg-divBg rounded-2xl px-6 py-4 border border-white/10">
      {/* Delete Section Button */}
      <button
        onClick={() => setShowDeleteConfirm(true)}
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
          <p className="text-sm text-slate-400">No topics added yet</p>
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

              {/* button */}
              <button
                onClick={() => {
                  setSelectedTopic(topic);
                  setIsUpdateTopicOpen(true);
                }}
                className="
            group:opacity-100
            transition
            rounded-md
            border border-slate-700
            bg-slate-800/80
            px-3 py-1.5
            text-xs
            text-slate-300
            hover:bg-slate-800
            hover:text-white
            cursor-pointer
          "
              >
                Edit
              </button>
              {/*Delete Button */}
              <button
                onClick={() => {
                  setTopicToDelete(topic.id);
                  setShowDeleteTopicConfirm(true);
                }}
                className="
      p-2 rounded-md
      bg-red-500/10
      border border-red-500/30
      text-red-400
      hover:bg-red-500/20
      hover:border-red-400/60
      transition cursor-pointer
    "
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Action Button */}
      <div className="mt-4 ml-1 flex gap-3">
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
          onClick={() => {
            setIsAddTopicOpen(true);
          }}
        >
          + Add Topic
        </button>
        <button
          onClick={() => onAddAssignment(sectionId)}
          className="px-3 py-1.5 text-sm rounded-md bg-slate-800 text-sky-300 hover:bg-slate-700 transition"
        >
          + Add Assignment
        </button>
      </div>

      {/* --------------- Add Topic Modal ---------------- */}
      <AddTopicModal
        open={isAddTopicOpen}
        onClose={() => setIsAddTopicOpen(false)}
        onSubmit={async (data) => {
          const toastId = toast.loading("Creating Topic...");
          try {
            console.log(data);
            await addContentToSection(sectionId, data.name, data.description);
            toast.success("Created Topic!",{id:toastId});
            setIsAddTopicOpen(false);
            onSectionDeleted();
          } catch (error) {
            console.log(error);
            toast.error("Unable to create topic");
          }
        }}
      />
      <ConfirmDeleteSectionModal
        open={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDeleteSection}
      />

      {/* --------------- Update topic Modal ------------ */}
      {selectedTopic && (
        <UpdateTopicModal
          open={isUpdateTopicOpen}
          onClose={() => {
            setIsUpdateTopicOpen(false);
            setSelectedTopic(null);
          }}
          initialData={{
            name: selectedTopic.name,
            description: selectedTopic.description,
            transcript: selectedTopic.transcript,
            videoUrl: "",
          }}
          onUpdate={async (data) => {
            const toastId = toast.loading("Updating Topic...");
            try {
              await updateContentToSection(selectedTopic.id, {
                name: data.name,
                description: data.description,
                videoUrl: data.videoUrl,
                transcript: data.transcript,
              });
              if (data.transcriptFile) {
                await uploadTranscript(selectedTopic.id, data.transcriptFile);
              }
              toast.success("Topic updated!", { id: toastId });
              setIsUpdateTopicOpen(false);
              setSelectedTopic(null);
            } catch (err) {
              console.error(err);
              toast.error("Failed to update topic");
            }
          }}
        />
      )}
      <ConfirmDeleteSectionModal
        open={showDeleteTopicConfirm}
        onClose={() => setShowDeleteTopicConfirm(false)}
        onConfirm={handleDeleteTopic}
      />
    </div>
  );
};

export default AddSectionV2;
