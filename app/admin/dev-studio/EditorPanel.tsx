"use client";
import Editor from "@monaco-editor/react";

export default function EditorPanel({ value, onChange }) {
  return (
    <Editor
      height="50vh"
      theme="vs-dark"
      defaultLanguage="typescript"
      value={value}
      onChange={(v) => onChange(v ?? "")}
      options={{
        minimap: { enabled: true },
        fontSize: 13,
        smoothScrolling: true,
      }}
    />
  );
}
