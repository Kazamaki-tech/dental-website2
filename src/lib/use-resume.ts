import { useEffect, useState } from "react";
import { type ResumeData, emptyResume } from "./resume-types";

const STORAGE_KEY = "resume-builder-data-v1";

export function useResume() {
  const [data, setData] = useState<ResumeData>(() => emptyResume());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setData({ ...emptyResume(), ...JSON.parse(raw) });
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {}
  }, [data, loaded]);

  const update = <K extends keyof ResumeData>(key: K, value: ResumeData[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  const reset = () => setData(emptyResume());

  return { data, setData, update, reset, loaded };
}
