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
      start_date
    }
  }
`;

const GET_PROGRESS = gql`
  query getProgress($user_id: String!, $challenge_id: String!, $forDay: Int!) {
    progress(
      where: {
        _and: {
          user_id: { _eq: $user_id }
          challenge_id: { _eq: $challenge_id }
          forDay: { _eq: $forDay }
        }
      }
    ) {
      id
      content
      isSkipDay
      created_at
      updated_at
      date
      forDay
    }
  }
`;

const GET_PROGRESSES = gql`
  query getProgresses($user_id: String!, $challenge_id: String!) {
    progress(
      where: {
        _and: {
          user_id: { _eq: $user_id }
          challenge_id: { _eq: $challenge_id }
        }
      }
    ) {
      id
      isSkipDay
      date
      forDay
    }
  }
`;

export { GET_CHALLENGES, GET_CHALLENGE, GET_PROGRESS, GET_PROGRESSES };
