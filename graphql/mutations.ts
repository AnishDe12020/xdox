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

const ADD_PROGRESS = gql`
mutation ($progress: progress_insert_input!) {
  insert_progress_one(object: $progress) {
    updated_at
    isSkipDay
    created_at
    content
    date
  }
}
`

export { CREATE_CHALLENGE, ADD_PROGRESS };
