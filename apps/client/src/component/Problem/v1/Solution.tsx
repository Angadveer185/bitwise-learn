"use client";

import MDEditor from "@uiw/react-md-editor";
import { PlayCircle, FileText } from "lucide-react";

function Solution({ content }: any) {
  if (!content) {
    return (
      <div className="flex items-center justify-center h-full text-sm text-gray-500">
        No solution available.
      </div>
    );
  }

  return (
    <div
      className="h-full overflow-y-auto px-6 py-5 space-y-8"
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        //@ts-ignore
        WebkitScrollbar: { display: "none" },
      }}
    >
      {/* Video Solution */}
      {content.videoSolution && (
        <section className="rounded-2xl border border-neutral-800 bg-linear-to-b from-neutral-900 to-neutral-950 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-neutral-800">
            <PlayCircle size={18} className="text-blue-400" />
            <h2 className="text-sm font-semibold text-white tracking-wide">
              Video Solution
            </h2>
          </div>

          <div className="p-4">
            <div className="aspect-video rounded-xl overflow-hidden border border-neutral-700 bg-black shadow-lg">
              <video
                src={content.videoSolution}
                className="w-full h-full"
                controls
              />
            </div>
          </div>
        </section>
      )}

      {/* Written Solution */}
      {content.solution && (
        <section className="rounded-2xl border border-neutral-800 bg-neutral-950 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-neutral-800">
            <FileText size={18} className="text-blue-400" />
            <h2 className="text-sm font-semibold text-white tracking-wide">
              Written Solution
            </h2>
          </div>

          <div className="p-4">
            <MDEditor
              height={700}
              //@ts-ignore
              value={content.solution as string}
              onChange={() => {}}
              preview="preview"
              hideToolbar={true}
              spellCheck
              style={{
                backgroundColor: "#0a0a0a",
                color: "white",
                borderRadius: "12px",
                padding: "12px",
              }}
            />
          </div>
        </section>
      )}
    </div>
  );
}

export default Solution;
