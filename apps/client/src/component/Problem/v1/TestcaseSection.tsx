export default function TestCaseSection({ testCases }: { testCases: any[] }) {
  if (!testCases || testCases.length === 0) return null;

  const parseInput = (input: string) => {
    try {
      return JSON.parse(input);
    } catch {
      return {};
    }
  };

  return (
    <div className="space-y-5">
      {testCases.map((test: any, index: number) => {
        const parsedInput = parseInput(test.input);

        return (
          <div
            key={test.id}
            className="rounded-2xl border border-blue-500/20 bg-neutral-900 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 bg-neutral-950 border-b border-blue-500/20">
              <span className="text-xs font-medium tracking-wide text-white uppercase">
                {test.testType} {index + 1}
              </span>
            </div>

            <div className="p-5 space-y-5 text-sm">
              {/* Input */}
              <div className="rounded-xl bg-neutral-950 border border-blue-500/20">
                <div className="px-4 py-2 border-b border-blue-500/20 text-xs font-semibold text-blue-400">
                  Input
                </div>

                <div className="p-4 space-y-1 font-mono text-white text-sm">
                  {Object.entries(parsedInput).map(([key, value], idx) => (
                    <div key={idx} className="flex gap-2">
                      <span className="text-white">{key}</span>
                      <span className="text-white">:</span>
                      <span className="break-all">
                        {Array.isArray(value)
                          ? JSON.stringify(value)
                          : String(value)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Output */}
              <div className="rounded-xl bg-neutral-950 border border-blue-500/20">
                <div className="px-4 py-2 border-b border-blue-500/20 text-xs font-semibold text-blue-400">
                  Output
                </div>

                <div className="p-4 font-mono text-white text-sm">
                  {test.output}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
