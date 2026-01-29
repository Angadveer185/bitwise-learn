import { getAllProblemSubmission } from "@/api/problems/get-all-submission";
import { useEffect, useState } from "react";

interface Submission {
  id: string;
  status: "SUCCESS" | "FAILED";
  runtime: string;
  memory: string;
  failedTestCase?: string;
  code: string;
}

interface SubmissionProps {
  id: string;
}

function Submission({ id }: SubmissionProps) {
  const [content, setContent] = useState<Submission[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getAllProblemSubmission((data: Submission[]) => {
      setContent(data);
      setSelected(data.length > 0 ? 0 : null); // auto-select latest
      setLoading(false);
    }, id);
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="h-full w-full flex items-center justify-center text-gray-400">
        Loading submissions...
      </div>
    );
  }

  // Empty state
  if (content.length === 0) {
    return (
      <div className="h-full w-full bg-neutral-900 border border-neutral-700 rounded-lg p-6 text-center text-gray-400">
        <p className="text-2xl font-semibold">No submissions yet</p>
        <p className="mt-2">Run or submit your code to see results here.</p>
      </div>
    );
  }

  const selectedSubmission = selected !== null ? content[selected] : null;

  return (
    <div className="h-full w-full bg-neutral-900 border border-neutral-700 rounded-lg flex overflow-hidden">
      {/* Submission List */}
      <div className="w-1/3 border-r border-neutral-700">
        <div className="bg-neutral-800 px-4 py-2 text-sm font-semibold">
          Submissions
        </div>

        <ul className="max-h-full overflow-y-auto">
          {content.map((item, index) => (
            <li
              key={item.id}
              onClick={() => setSelected(index)}
              className={`px-4 py-3 cursor-pointer border-b border-neutral-800
                hover:bg-neutral-800 transition
                ${selected === index ? "bg-neutral-800" : ""}`}
            >
              <div className="flex justify-between items-center">
                <span
                  className={`text-xs px-2 py-1 rounded-full font-semibold
                    ${
                      item.status === "SUCCESS"
                        ? "bg-green-900 text-green-400"
                        : "bg-red-900 text-red-400"
                    }`}
                >
                  {item.status}
                </span>
                <span className="text-xs text-gray-500">
                  #{content.length - index}
                </span>
              </div>

              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>{item.runtime || "--"} ms</span>
                <span>{item.memory || "--"} MB</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Submission Details */}
      <div className="w-2/3 flex flex-col">
        {selectedSubmission ? (
          <>
            {/* Header */}
            <div className="px-4 py-3 border-b border-neutral-700 flex gap-6 text-sm">
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
                Runtime: {selectedSubmission.runtime ?? "--"} ms
              </span>
              <span className="text-gray-400">
                Memory: {selectedSubmission.memory ?? "--"} MB
              </span>
            </div>

            {/* Failed test case */}
            {selectedSubmission.status === "FAILED" && (
              <div className="bg-red-950 text-red-300 p-3 text-sm border-b border-red-900">
                <strong>Failed Test Case:</strong>
                <pre className="mt-1 whitespace-pre-wrap">
                  {selectedSubmission.failedTestCase}
                </pre>
              </div>
            )}

            {/* Code */}
            <pre className="flex-1 overflow-auto bg-neutral-900 p-4 text-sm text-gray-200 whitespace-pre-wrap">
              {selectedSubmission.code}
            </pre>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            Select a submission
          </div>
        )}
      </div>
    </div>
  );
}

export default Submission;
