import create from "zustand";
import { ChallengeState } from "../types/Challenges";

const useChallenge = create<ChallengeState>(set => ({
  challenge: undefined,
  setChallenge: challenge => set(state => ({ ...state, challenge })),
}));

export default useChallenge;
