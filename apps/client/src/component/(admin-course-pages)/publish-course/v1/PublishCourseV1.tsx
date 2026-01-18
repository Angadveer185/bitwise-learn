"use client";

import { CheckCircle, XCircle } from "lucide-react";
import { useEffect } from "react";

type Requirement = {
  label: string;
  satisfied: boolean;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  requirements: Requirement[];
};

const PublishCourseV1 = ({
  open,
  onClose,
  onConfirm,
  requirements,
}: Props) => {
  const allSatisfied = requirements.every((r) => r.satisfied);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          w-full max-w-md
          rounded-2xl
          bg-slate-900
          border border-slate-800
          p-6
          shadow-xl
          animate-in
          fade-in
          zoom-in-95
        "
      >
        <h2 className="text-xl font-semibold text-white">
          Ready to publish this course?
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Please make sure all required fields are completed.
        </p>

        {/* Requirements */}
        <div className="mt-5 space-y-3">
          {requirements.map((req, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 text-sm"
            >
              {req.satisfied ? (
                <CheckCircle className="text-green-500" size={18} />
              ) : (
                <XCircle className="text-red-500" size={18} />
              )}

              <span
                className={
                  req.satisfied
                    ? "text-slate-200"
                    : "text-slate-400"
                }
              >
                {req.label}
              </span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="
              px-4 py-2
              rounded-lg
              bg-slate-800
              text-slate-300
              hover:bg-slate-700
              transition
              cursor-pointer
            "
          >
            Cancel
          </button>

          <button
            disabled={!allSatisfied}
            onClick={onConfirm}
            className={`
              px-4 py-2
              rounded-lg
              font-medium
              transition
              ${
                allSatisfied
                  ? "bg-blue-600 text-white hover:bg-blue-500 cursor-pointer"
                  : "bg-blue-600/40 text-white/50 cursor-not-allowed"
              }
            `}
          >
            Confirm Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default PublishCourseV1;
