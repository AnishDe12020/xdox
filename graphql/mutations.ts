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
      start_date
    }
  }
`;

const ADD_PROGRESS = gql`
  mutation ($progress: progress_insert_input!) {
    insert_progress_one(object: $progress) {
      updated_at
      created_at
      content
      date
      id
      forDay
    }
  }
`;

const UPDATE_PROGRESS = gql`
  mutation ($id: String!, $progress: progress_set_input!) {
    update_progress_by_pk(pk_columns: { id: $id }, _set: $progress) {
      updated_at
      created_at
      content
      date
      id
      forDay
    }
  }
`;

export { CREATE_CHALLENGE, ADD_PROGRESS, UPDATE_PROGRESS };
