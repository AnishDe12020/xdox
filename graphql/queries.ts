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
      user_id
    }
  }
`;

export { GET_CHALLENGES };
