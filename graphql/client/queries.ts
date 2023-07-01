import { gql } from "@apollo/client";

export const GET_NOVELS = gql`
query  {
  novels {
    id
    createAt
    title
    updateAt
    image
    author {
      name
      id
      novelID
    }
  }
  

}
`;