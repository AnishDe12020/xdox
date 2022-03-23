import { Content } from "@tiptap/react";

interface Progress {
  created_at: string;
  id?: string;
  updated_at: string;
  content: Content;
  isSkipDay: boolean;
  __typename: string;
}

interface ProgressData {
  progress: Progress[];
}

export type { Progress, ProgressData };
