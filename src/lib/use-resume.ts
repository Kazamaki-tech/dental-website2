import { useState } from "react";
import { type ResumeData, emptyResume } from "./resume-types";

export function useResume() {
  const [data, setData] = useState<ResumeData>(() => emptyResume());

  const update = <K extends keyof ResumeData>(key: K, value: ResumeData[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  const reset = () => setData(emptyResume());

  return { data, setData, update, reset, loaded: true };
}
