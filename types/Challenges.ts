interface Challenge {
  created_at: string;
  days: number;
  id: string;
  isPublic: boolean;
  topic: string;
  updated_at: string;
  user_id: string;
  __typename: string;
}

interface ChallengeData {
  challenges: Challenge[];
}

export type { Challenge, ChallengeData };
