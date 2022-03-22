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

export { GET_CHALLENGES, GET_CHALLENGE };
