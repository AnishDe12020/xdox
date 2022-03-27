import { Content } from "@tiptap/react";

interface Progress {
  created_at: string;
  id?: string;
  updated_at: string;
  content: Content;
  date: string;
  forDay: number;
  __typename: string;
}

interface ProgressData {
  progress: Progress[];
}

interface AddProgressInput {
  content: Content;
  date: string;
  challenge_id: string;
  forDay?: number;
}

type UpdateProgressInput = Partial<Pick<AddProgressInput, "content">>;

export type { Progress, ProgressData, AddProgressInput, UpdateProgressInput };
