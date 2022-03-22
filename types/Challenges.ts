interface Challenge {
  created_at: string;
  days: number;
  id?: string;
  isPublic: boolean;
  topic: string;
  updated_at: string;
  __typename: string;
}

interface ChallengesData {
  challenges: Challenge[];
}

interface ChallengeData {
  challenges_by_pk: Challenge;
}

interface CreateChallengeInput {
  days: number;
  isPublic: boolean;
  topic: string;
}

export type { Challenge, ChallengeData, CreateChallengeInput, ChallengesData };
