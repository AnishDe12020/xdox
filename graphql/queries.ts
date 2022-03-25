import { gql } from "@apollo/client";

const GET_CHALLENGES = gql`
  query getChallenges {
    challenges {
      created_at
      days
      id
      isPublic
      topic
      updated_at
      start_date
      days_skipped
    }
  }
`;

const GET_CHALLENGE = gql`
  query getChallenge($id: String!) {
    challenges_by_pk(id: $id) {
      days
      created_at
      isPublic
      topic
      updated_at
    }
  }
`;

const GET_PROGRESS = gql`
  query getProgress($user_id: String!, $challenge_id: String!, $date: String!) {
    progress(
      where: {
        _and: {
          user_id: { _eq: $user_id }
          challenge_id: { _eq: $challenge_id }
          date: { _eq: $date }
        }
      }
    ) {
      id
      content
      isSkipDay
      created_at
      updated_at
      date
    }
  }
`;

export { GET_CHALLENGES, GET_CHALLENGE, GET_PROGRESS };
