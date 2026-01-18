"use client";

import React, { useState, useMemo } from "react";

type TestCase = {
  id: string;
  input: string;
  output: string;
  testType: string;
};

function TestCases({
  testCases = [],
  output = [],
}: {
  testCases?: TestCase[];
  output: any[];
}) {
  const [mode, setMode] = useState<"example" | "custom" | "output">("example");
  const [activeCase, setActiveCase] = useState(0);
  const [customInput, setCustomInput] = useState("");

  const exampleCases = useMemo(
    () => testCases.filter((t) => t.testType === "EXAMPLE"),
    [testCases],
  );

  const currentTest = exampleCases[activeCase];

  const parseInput = (input: string) => {
    try {
      return JSON.parse(input);
    } catch {
      return {};
    }
  };

  return (
    <div className="h-full flex flex-col bg-neutral-900 border-t border-neutral-700 text-sm">
      {/* Top Tabs */}
      <div className="flex gap-6 px-4 py-2 border-b border-neutral-700">
        <button
          onClick={() => setMode("example")}
          className={`pb-1 ${
            mode === "example"
              ? "text-white border-b-2 border-indigo-500"
              : "text-gray-400"
          }`}
        >
          Example
        </button>

        <button
          onClick={() => setMode("output")}
          className={`pb-1 ${
            mode === "output"
              ? "text-white border-b-2 border-indigo-500"
              : "text-gray-400"
          }`}
        >
          Output
        </button>
      </div>

      {/* Content */}
      <div
        className="flex-1 overflow-y-auto"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          //@ts-ignore
          WebkitScrollbar: { display: "none" },
        }}
      >
        {/* ================= EXAMPLE TESTCASES ================= */}
        {mode === "example" && (
          <div className="p-4 space-y-4">
            {/* Testcase Tabs */}
            <div className="flex gap-2 overflow-x-auto">
              {exampleCases.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveCase(index)}
                  className={`px-3 py-1 rounded-md text-xs border ${
                    activeCase === index
                      ? "bg-neutral-700 border-neutral-500 text-white"
                      : "bg-neutral-800 border-neutral-700 text-gray-400 hover:text-white"
                  }`}
                >
                  Testcase {index + 1}
                </button>
              ))}
            </div>

            {/* Testcase Body */}
            {currentTest ? (
              <div className="space-y-4">
                {/* Input */}
                <div>
                  <p className="text-gray-400 mb-1">Input</p>
                  <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-3 space-y-1">
                    {Object.entries(parseInput(currentTest.input)).map(
                      ([key, value], idx) => (
                        <div key={idx} className="text-[#facc15]">
                          <span className="font-medium text-gray-300">
                            {key}
                          </span>
                          {" : "}
                          <span>
                            {Array.isArray(value)
                              ? JSON.stringify(value)
                              : String(value)}
                          </span>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                {/* Expected Output */}
                <div>
                  <p className="text-gray-400 mb-1">Expected Output</p>
                  <pre className="bg-neutral-800 border border-neutral-700 rounded-lg p-3 text-[#facc15] overflow-x-auto">
                    {currentTest.output}
                  </pre>
                </div>
              </div>
            ) : (
              <p className="text-gray-400">No test cases available.</p>
            )}
          </div>
        )}

        {mode === "output" && (
          <div className="p-4 space-y-4">
            {output.length === 0 ? (
              <p className="text-gray-400">No output available.</p>
            ) : (
              <>
                {/* Tabs */}
                <div className="flex gap-2 overflow-x-auto mb-4">
                  {output.map((o, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveCase(index)}
                      className={`px-3 py-1 rounded-md text-xs border ${
                        o.isCorrect ? "bg-green-700/40" : "bg-red-700/40"
                      } ${
                        activeCase === index
                          ? "border-neutral-500 text-white"
                          : "border-neutral-700 text-gray-400 hover:text-white"
                      }`}
                    >
                      Test {index + 1}
                    </button>
                  ))}
                </div>

                {/* Active Output */}
                {output[activeCase] &&
                  (() => {
                    const o = output[activeCase];
                    const parsedInput = parseInput(o.input);

                    return (
                      <div className="p-3 border border-neutral-700 rounded-lg bg-neutral-800 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400 text-xs">
                            Testcase {activeCase + 1}
                          </span>
                          <span
                            className={`text-xs font-semibold ${
                              o.isCorrect ? "text-green-400" : "text-red-400"
                            }`}
                          >
                            {o.isCorrect ? "✔ Passed" : "✘ Failed"}
                          </span>
                        </div>

                        {/* Input */}
                        <div>
                          <p className="text-gray-400 mb-1 text-xs">Input</p>
                          <div className="bg-neutral-900 border border-neutral-700 rounded-md p-2 text-sm">
                            {Object.entries(parsedInput).map(
                              ([key, value], i) => (
                                <div key={i} className="text-[#facc15]">
                                  <span className="font-medium text-gray-300">
                                    {key}
                                  </span>
                                  {" : "}
                                  <span>
                                    {Array.isArray(value)
                                      ? JSON.stringify(value)
                                      : String(value)}
                                  </span>
                                </div>
                              ),
                            )}
                          </div>
                        </div>

                        {/* Expected Output */}
                        <div>
                          <p className="text-gray-400 mb-1 text-xs">
                            Expected Output
                          </p>
                          <pre className="bg-neutral-900 border border-neutral-700 rounded-md p-2 text-gray-300 text-sm">
                            {o.expectedOutput}
                          </pre>
                        </div>

                        {/* Actual Output */}
                        <div>
                          <p className="text-gray-400 mb-1 text-xs">
                            Your Output
                          </p>
                          <pre
                            className={`bg-neutral-900 border rounded-md p-2 text-sm ${
                              o.isCorrect
                                ? "border-green-600 text-green-400"
                                : "border-red-600 text-red-400"
                            }`}
                          >
                            {o.actualOutput || "—"}
                          </pre>
                        </div>

                        {/* Stderr */}
                        {o.stderr && o.stderr.trim() !== "" && (
                          <div>
                            <p className="text-gray-400 mb-1 text-xs">Error</p>
                            <pre className="bg-neutral-900 border border-red-500 rounded-md p-2 text-red-400 overflow-x-auto text-sm">
                              {o.stderr}
                            </pre>
                          </div>
                        )}
                      </div>
                    );
                  })()}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default TestCases;
