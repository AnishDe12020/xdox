import { Content } from "@tiptap/react";

interface Progress {
  created_at: string;
  id?: string;
  updated_at: string;
  content: Content;
  isSkipDay: boolean;
  date: string;
  __typename: string;
}

interface ProgressData {
  progress: Progress[];
}

interface AddProgressInput {
  content: Content;
  isSkipDay: boolean;
  date: string;
  challenge_id: string;
}

type UpdateProgressInput = Partial<Pick<AddProgressInput, "content" | "isSkipDay">>
  


export type { Progress, ProgressData, AddProgressInput, UpdateProgressInput };
