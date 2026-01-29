import { useState } from "react";

function Submission({ content }: any) {
  console.log("submission is " + JSON.stringify(content));

  const [selected, setSelected] = useState<number | null>(null);

  // Empty state
  if (!content || content.length === 0) {
    return (
      <div className="h-full w-full bg-neutral-900 border border-neutral-700 rounded-lg p-4 text-gray-300">
        <div className="flex flex-col items-center justify-center text-center h-48 text-gray-400">
          <p className="text-3xl">No submissions yet.</p>
          <p className="text-xl mt-1">
            Run or submit your code to see results here.
          </p>
        </div>
      </div>
    );
  }

  const selectedSubmission = selected !== null ? content[selected] : null;

  return (
    <div className="h-full w-full bg-neutral-900 border border-neutral-700 rounded-lg p-4 text-gray-300 flex flex-col md:flex-row gap-4">
      {/* Submission List */}
      <div className="md:w-1/3 w-full border border-neutral-700 rounded-lg overflow-hidden">
        <div className="bg-neutral-800 px-4 py-2 text-sm font-semibold">
          Submissions
        </div>

        <ul className="divide-y divide-neutral-700 max-h-80 overflow-y-auto">
          {content.map((item: any, index: number) => (
            <li
              key={index}
              onClick={() => setSelected(index)}
              className={`px-4 py-3 cursor-pointer hover:bg-neutral-800 transition
                ${selected === index ? "bg-neutral-800" : ""}`}
            >
              <div className="flex justify-between items-center">
                <span
                  className={`text-sm font-medium ${
                    item.status === "SUCCESS"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {item.status}
                </span>
                <span className="text-xs text-gray-400">#{index + 1}</span>
              </div>

              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>{item.runtime ?? "--"} runtime</span>
                <span>{item.memory ?? "--"} memory</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Submission Details */}
      <div className="md:w-2/3 w-full border border-neutral-700 rounded-lg p-4">
        {selectedSubmission ? (
          <>
            <div className="flex flex-wrap gap-4 mb-4 text-sm">
              <span
                className={`font-semibold ${
                  selectedSubmission.status === "SUCCESS"
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {selectedSubmission.status}
              </span>
              <span className="text-gray-400">
                Runtime: {selectedSubmission.runtime ?? "--"}
              </span>
              <span className="text-gray-400">
                Memory: {selectedSubmission.memory ?? "--"}
              </span>
            </div>

            <pre className="bg-neutral-800 border border-neutral-700 rounded-lg p-4 overflow-auto text-sm text-gray-200 whitespace-pre-wrap">
              {selectedSubmission.code}
            </pre>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            Click a submission to view details
          </div>
        )}
      </div>
    </div>
  );
}

export default Submission;
