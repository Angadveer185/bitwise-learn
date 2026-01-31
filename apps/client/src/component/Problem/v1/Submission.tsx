import { getAllProblemSubmission } from "@/api/problems/get-all-submission";
import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, Code2, Clock, MemoryStick } from "lucide-react";
import { useColors } from "@/component/general/(Color Manager)/useColors";

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
  const Colors = useColors();

  const [content, setContent] = useState<Submission[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getAllProblemSubmission((data: Submission[]) => {
      setContent(data);
      setSelected(data.length > 0 ? 0 : null);
      setLoading(false);
    }, id);
  }, [id]);

  if (loading) {
    return (
      <div
        className={`h-full w-full flex items-center justify-center ${Colors.text.secondary}`}
      >
        Loading submissions…
      </div>
    );
  }

  if (content.length === 0) {
    return (
      <div
        className={`h-full w-full rounded-2xl ${Colors.border.fadedThin}
        ${Colors.background.secondary}
        flex flex-col items-center justify-center gap-2 p-5`}
      >
        <Code2 size={28} className={`${Colors.text.special} opacity-60`} />
        <p className={`text-lg font-semibold ${Colors.text.primary}`}>
          No submissions yet
        </p>
        <p className={`text-sm ${Colors.text.secondary}`}>
          Run or submit your code to see results here.
        </p>
      </div>
    );
  }

  const selectedSubmission = selected !== null ? content[selected] : null;

  return (
    <div
      className={`h-full w-full rounded-2xl ${Colors.border.fadedThin}
      bg-linear-to-b from-neutral-900 to-neutral-950 flex overflow-hidden`}
    >
      {/* Submission List */}
      <div className={`w-[35%] ${Colors.border.fadedRight}`}>
        <div
          className={`px-4 py-3 ${Colors.border.faded}
          text-sm font-semibold ${Colors.text.primary}`}
        >
          Submissions
        </div>

        <ul className="max-h-full overflow-y-auto">
          {content.map((item, index) => {
            const isSelected = selected === index;

            return (
              <li
                key={item.id}
                onClick={() => setSelected(index)}
                className={`
                  px-4 py-3 cursor-pointer ${Colors.border.faded}
                  transition-all
                  ${
                    isSelected
                      ? Colors.background.special
                      : Colors.hover.special
                  }
                `}
              >
                <div className="flex justify-between items-center">
                  <span
                    className={`
                      inline-flex items-center gap-1.5 text-xs px-2.5 py-1
                      rounded-full font-semibold
                      ${
                        item.status === "SUCCESS"
                          ? "bg-green-500/10 text-green-400"
                          : "bg-red-500/10 text-red-400"
                      }
                    `}
                  >
                    {item.status === "SUCCESS" ? (
                      <CheckCircle2 size={12} />
                    ) : (
                      <XCircle size={12} />
                    )}
                    {item.status}
                  </span>

                  <span className={`text-xs ${Colors.text.secondary}`}>
                    #{content.length - index}
                  </span>
                </div>

                <div className={`flex justify-between text-xs ${Colors.text.secondary} mt-2`}>
                  <span>{item.runtime || "--"} ms</span>
                  <span>{item.memory || "--"} MB</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Submission Details */}
      <div className="w-[65%] flex flex-col">
        {selectedSubmission ? (
          <>
            {/* Header */}
            <div
              className={`px-4 py-3 ${Colors.border.faded}
              flex items-center gap-6 text-sm ${Colors.background.primary}`}
            >
              <span
                className={`inline-flex items-center gap-2 font-semibold ${
                  selectedSubmission.status === "SUCCESS"
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {selectedSubmission.status === "SUCCESS" ? (
                  <CheckCircle2 size={16} />
                ) : (
                  <XCircle size={16} />
                )}
                {selectedSubmission.status}
              </span>

              <span className={`inline-flex items-center gap-1.5 ${Colors.text.secondary}`}>
                <Clock size={14} />
                {selectedSubmission.runtime ?? "--"} ms
              </span>

              <span className={`inline-flex items-center gap-1.5 ${Colors.text.secondary}`}>
                <MemoryStick size={14} />
                {selectedSubmission.memory ?? "--"} MB
              </span>
            </div>

            {/* Failed test case */}
            {selectedSubmission.status === "FAILED" && (
              <div
                className={`mx-4 mt-4 rounded-xl ${Colors.border.specialThin}
                ${Colors.background.special} p-3 text-sm text-red-300`}
              >
                <div className="font-semibold mb-1">Failed Test Case</div>
                <pre className="whitespace-pre-wrap text-xs text-red-200">
                  {selectedSubmission.failedTestCase}
                </pre>
              </div>
            )}

            {/* Code */}
            <div
              className={`flex-1 mt-4 mx-4 mb-4 rounded-xl
              ${Colors.border.fadedThin}
              ${Colors.background.secondary} overflow-auto`}
            >
              <pre
                className={`p-4 text-sm ${Colors.text.primary}
                whitespace-pre-wrap font-mono`}
              >
                {selectedSubmission.code}
              </pre>
            </div>
          </>
        ) : (
          <div
            className={`flex items-center justify-center h-full ${Colors.text.secondary}`}
          >
            Select a submission
          </div>
        )}
      </div>
    </div>
  );
}

export default Submission;