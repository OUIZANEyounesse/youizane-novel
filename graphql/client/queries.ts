import { gql } from "@apollo/client";

export const GET_NOVELS = gql`
query Novels {
  novels {
    id
    title
    image
    createAt
    updateAt
    desccription
    authors {
      id
      assignedAt
      author {
        name
        id
      }
    }
  }
}`;

export const GET_NOVEL = gql`
query Novel($novelId: ID) {
  novel(id: $novelId) {
    id
    title
    image
    createAt
    updateAt
    desccription
  }
}`;

export const GET_AUTHORS = gql`
query Authors {
  authors {
    id
    name
  }
}
`;