import { gql } from "@apollo/client";

const CREATE_CHALLENGE = gql`
  mutation ($challenge: challenges_insert_input!) {
    insert_challenges_one(object: $challenge) {
      id
      created_at
      days
      isPublic
      topic
      updated_at
      user_id
    }
  }
`;

export { CREATE_CHALLENGE };
