"use client";
import MDEditor from "@uiw/react-md-editor";

function Solution({ content }: any) {
  if (!content) {
    return (
      <div className="text-gray-400 text-sm p-4">No solution available.</div>
    );
  }

  return (
    <div
      className="h-full overflow-y-auto px-4 py-3 space-y-6"
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        //@ts-ignore
        WebkitScrollbar: { display: "none" },
      }}
    >
      {/* Video Solution */}
      {content.videoSolution && (
        <div className="space-y-2">
          <div className="w-full aspect-video rounded-lg overflow-hidden border border-neutral-700 bg-black">
            <video
              src={content.videoSolution}
              className="w-full h-full"
              controls
            />
          </div>
        </div>
      )}

      {/* Divider */}
      <div className="border-t border-neutral-700" />

      {/* Written Solution */}
      <div className="space-y-2">
        <MDEditor
          height={700}
          //@ts-ignore
          value={content.solution as string}
          onChange={() => {}}
          preview="preview"
          hideToolbar={true}
          spellCheck
          style={{
            backgroundColor: "#171717",
            color: "white",
          }}
        />
      </div>
    </div>
  );
}

export default Solution;
