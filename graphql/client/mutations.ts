import { gql } from "@apollo/client";

export const ADD_NOVEL = gql`
mutation AddNovel($image: String, $title: String) {
    addNovel(image: $image, title: $title) {
      id
      title
      image
      createAt
      updateAt
      author {
        id
        name
        novelID
      }
    }
  }
`;