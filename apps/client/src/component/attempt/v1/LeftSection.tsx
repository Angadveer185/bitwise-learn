import React from "react";
import { useColors } from "@/component/general/(Color Manager)/useColors";
import "./assignment.css";

type Props = {
  question: string;
  currentIndex: number;
  totalQuestions: number;
  onNext: () => void;
  onPrevious: () => void;
  sectionName: string;
  sectionIndex: number;
  totalSections: number;
  sections: any[];
  onSectionSelect: (index: number) => void;
};

const Colors = useColors();

export default function LeftSection({
  question,
  currentIndex,
  totalQuestions,
  onNext,
  onPrevious,
  sectionIndex,
  sectionName,
  totalSections,
  sections,
  onSectionSelect,
}: Props) {
  return (
    <div
      className={`flex flex-col font-mono ${Colors.text.primary} ${Colors.background.secondary} h-full p-4 rounded-lg`}
    >

      <div className="flex gap-2 mb-3">
        {sections.map((s, i) => (
          <button
            key={s.id}
            onClick={() => onSectionSelect(i)}
            className={`px-3 py-1 rounded-md text-sm ${i === sectionIndex
                ? Colors.border.specialThick
                : Colors.border.fadedThick
              }`}
          >
            {s.type === "NO_CODE" ? "MCQ" : "CODING"}
          </button>
        ))}
      </div>

      <div className={`${Colors.background.primary} p-4 rounded-lg mb-4 overflow-y-auto`}>
        <p className="text-lg">{question}</p>
      </div>

      <div className="flex justify-between items-center mt-auto">
        <button
          onClick={onPrevious}
          disabled={currentIndex === 0}
          className={`${Colors.background.primary} group px-8 py-2 rounded-md hover:scale-105`}
        >
          <p className="button-wrap-left">Previous</p>
        </button>

        <div className="text-sm opacity-60 mb-2">
          Section {sectionIndex + 1} / {totalSections} — {sectionName}
        </div>

        <div>
          <span>Question: </span>
          <span className={`${Colors.text.special}`}>{currentIndex + 1}</span>
          <span> / </span>
          <span>{totalQuestions}</span>
        </div>

        <button
          onClick={onNext}
          disabled={
            currentIndex === totalQuestions - 1 &&
            sectionIndex === totalSections - 1
          }
          className={`${Colors.background.primary} group px-8 py-2 rounded-md hover:scale-105 hover:opacity-90`}
        >
          <p className="button-wrap-right">Next</p>
        </button>
      </div>
    </div>
  );
}
