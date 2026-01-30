"use client";

import { useState } from "react";
import { ChevronRight, Lightbulb } from "lucide-react";
import TestCaseSection from "./TestcaseSection";
import MarkdownEditor from "@/component/ui/MarkDownEditor";

function Description({ content }: { content: any }) {
  if (!content) return null;

  const { name, description, hints, testCases, problemTopics } = content;

  return (
    <div className="flex flex-col gap-8 text-gray-300">
      {/* Title */}
      <div className="border-b border-neutral-800 pb-4">
        <h1 className="text-2xl font-semibold text-white tracking-tight">
          {name}
        </h1>
      </div>

{/* Description */}
<section
  className="
    rounded-2xl
    bg-neutral-950
    border border-neutral-800
    overflow-hidden
    transition-all
    hover:border-blue-500/30
  "
>
  {/* Header */}
  <div
    className="
      flex items-center justify-between
      px-5 py-4
      bg-neutral-900
      border-b border-neutral-800
    "
  >
    <div className="flex items-center gap-3">
      {/* Accent bar */}
      <span className="h-6 w-1 rounded-full bg-blue-500/70" />

      <h2 className="text-sm font-semibold tracking-wide text-white">
        Problem Description
      </h2>
    </div>
  </div>

  {/* Content */}
  <div className="p-5">
    <div
      className="
        rounded-xl
        bg-neutral-900
        border border-neutral-800
        p-4
      "
    >
      <MarkdownEditor
        height={500}
        value={description}
        mode={"preview"}
        hideToolbar={true}
        theme="dark"
      />
    </div>
  </div>
</section>


      {/* Test Cases */}
      <section>
        <h2 className="text-lg font-semibold text-white mb-3">
          Sample Test Cases
        </h2>
        <TestCaseSection testCases={testCases} />
      </section>

      {/* Topics */}
      {problemTopics?.length > 0 && (
        <section className="rounded-2xl bg-neutral-900 p-3">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Topics</h2>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {problemTopics[0].tagName.map((tag: string) => (
              <span
                key={tag}
                className="
          group inline-flex items-center gap-2
          rounded-full px-4 py-1.5 text-xs font-medium
          bg-neutral-950
          border border-blue-500/20
          text-gray-200
          transition-all
          hover:border-blue-400/60
          hover:bg-blue-500/5
        "
              >
                {tag}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Hints */}
      {hints?.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb size={18} className="text-yellow-400" />
            <h2 className="text-xl font-semibold text-white p-1">Hints</h2>
          </div>

          <div className="space-y-3">
            {hints.map((hint: string, idx: number) => (
              <HintItem key={idx} index={idx} hint={hint} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default Description;

function HintItem({ hint, index }: { hint: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      onClick={() => {
        if (open) setOpen(false);
      }}
      className={`
        group rounded-xl border border-blue-400/50 bg-neutral-950
        transition-all duration-300
        hover:border-blue-700/50 hover:shadow-[0_4px_20px_rgba(0,0,0,0.4)]
        cursor-pointer
      `}
    >
      {/* Header */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // prevent outer click
          setOpen(!open);
        }}
        className="flex w-full items-center justify-between px-4 py-3 text-sm text-gray-300 cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <ChevronRight
            size={16}
            className={`
              transition-all duration-300
              ${open ? "rotate-90 text-yellow-400" : "text-gray-400"}
            `}
          />

          <span className="font-medium tracking-tight">
            Hint {index + 1}
          </span>
        </div>

        <span
          className={`
            text-xs transition-opacity duration-300
            ${open ? "text-gray-500" : "text-gray-600 group-hover:text-gray-500"}
          `}
        >
          {open ? "Click anywhere to close" : "Reveal"}
        </span>
      </button>

      {/* Animated Content */}
      <div
        className={`
          grid transition-all duration-300 ease-out
          ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}
        `}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-4 text-sm text-gray-400 leading-relaxed animate-hint-fade">
            {hint}
          </div>
        </div>
      </div>
    </div>
  );
}

