"use client";

type Props = {
  problem: any;
  code: string;
  onChange: (code: string) => void;
  onRun: () => void;
  onSubmit: () => void;
};

export default function CodeRightSection({
  problem,
  code,
  onChange,
  onRun,
  onSubmit,
}: Props) {
  return (
    <div className="h-full w-full flex flex-col rounded-xl p-4 bg-[#0f172a] text-white font-mono">
      <div className="text-sm opacity-70 mb-2">
        {problem?.title || "Coding Question"}
      </div>

      <textarea
        value={code}
        onChange={e => onChange(e.target.value)}
        className="flex-1 bg-black text-green-400 p-4 rounded-lg resize-none"
        placeholder="// write your code here"
      />

      <div className="flex justify-end gap-3 mt-4">
        <button
          onClick={onRun}
          className="px-4 py-2 rounded bg-blue-600 hover:opacity-90"
        >
          Run
        </button>

        <button
          onClick={onSubmit}
          className="px-4 py-2 rounded bg-green-600 hover:opacity-90"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
