"use client";

import { runCode, submitCode } from "@/api/problems/run-code";
import { Editor } from "@monaco-editor/react";
import React, { useEffect, useMemo, useState } from "react";
import { Play, Send } from "lucide-react";
import { useColors } from "@/component/general/(Color Manager)/useColors";
import { useTheme } from "@/component/general/(Color Manager)/ThemeController";

const languageOptions = [
  { label: "JavaScript", value: "javascript" },
  { label: "TypeScript", value: "typescript" },
  { label: "Python", value: "python" },
  { label: "Java", value: "java" },
  { label: "C++", value: "cpp" },
];

const normalizeLanguage = (lang: string) => lang.toLowerCase();

export default function CodeEditor({
  template,
  questionId,
  output: setOutput,
}: {
  template: any[];
  questionId: string;
  output: any;
}) {
  const Colors = useColors();

  const templatesByLanguage = useMemo(() => {
    const map: Record<string, any> = {};
    template?.forEach((t) => {
      map[normalizeLanguage(t.language)] = t;
    });
    return map;
  }, [template]);

  const defaultLang = template?.length
    ? normalizeLanguage(template[0].language)
    : "python";

  const defaultCode = template?.length ? template[0].defaultCode : "";

  const [language, setLanguage] = useState(defaultLang);
  const [code, setCode] = useState(defaultCode);

  const handleRun = async () => {
    setOutput([]);
    const res = await runCode({
      language,
      code,
      questionId,
    });
    setOutput(res.testCases);
  };

  const handleSubmit = async () => {
    await submitCode({
      language,
      code,
      questionId,
    });
  };

  useEffect(() => {
    const tpl = templatesByLanguage[language];
    if (!tpl) return;

    if (tpl.defaultCode?.trim()) {
      setCode(tpl.defaultCode);
    } else if (tpl.functionBody) {
      setCode(tpl.functionBody);
    } else {
      setCode("");
    }
  }, [language, templatesByLanguage]);

  const theme = useTheme();

  return (
    <div
      className={`
        flex h-full w-full flex-col overflow-hidden
        ${Colors.background.secondary}
        ${Colors.border.defaultThin}
      `}
    >
      {/* Top Bar */}
      <div
        className={`
          flex items-center justify-between px-4 py-2
          ${Colors.background.primary}
          ${Colors.border.default}
        `}
      >
        {/* Left */}
        <div className="flex items-center gap-3">
          <span className={`text-sm font-semibold ${Colors.text.primary}`}>
            Code Editor
          </span>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className={`
              rounded-md px-3 py-1.5 text-xs outline-none cursor-pointer
              ${Colors.background.secondary}
              ${Colors.text.secondary}
              ${Colors.border.fadedThin}
            `}
          >
            {languageOptions
              .filter((lang) => templatesByLanguage[lang.value])
              .map((lang) => (
                <option key={lang.value} value={lang.value} className="cursor-pointer">
                  {lang.label}
                </option>
              ))}
          </select>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleRun}
            className={`
              flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium
              ${Colors.background.heroSecondaryFaded}
              ${Colors.text.primary}
              hover:opacity-90 transition cursor-pointer
            `}
          >
            <Play size={14} />
            Run
          </button>

          <button
            onClick={handleSubmit}
            className={`
              flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium
              ${Colors.background.heroPrimary}
              ${Colors.text.black}
              hover:opacity-90 transition cursor-pointer
            `}
          >
            <Send size={14} />
            Submit
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1">
        <Editor
          language={language}
          value={code}
          onChange={(value) => setCode(value || "")}
          theme={theme.theme==="Dark"?"vs-dark":"vs-light"}
          options={{
            fontSize: 14,
            fontFamily: "JetBrains Mono, Fira Code, monospace",
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            wordWrap: "on",
            mouseWheelZoom: true,
            tabSize: 2,
            cursorBlinking: "smooth",
            fontLigatures: true,
            smoothScrolling: true,
            formatOnPaste: true,
            formatOnType: true,
            padding: { top: 12 },
          }}
        />
      </div>
    </div>
  );
}
