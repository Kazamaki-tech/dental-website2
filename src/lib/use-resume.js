import { useState } from "react";
import { emptyResume } from "./resume-types";

export function useResume() {
  const [data, setData] = useState(() => emptyResume());

  const update = (key, value) =>
    setData((d) => ({ ...d, [key]: value }));

  const reset = () => setData(emptyResume());

  return { data, setData, update, reset, loaded: true };
}
