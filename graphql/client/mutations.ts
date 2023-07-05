import { gql } from "@apollo/client";

export const ADD_NOVEL = gql`
mutation AddNovel($image: String, $title: String,$desccription:String,$authorId:String) {
    addNovel(image: $image, title: $title,desccription:$desccription,authorId:$authorId) {
      id
      title
      image
      desccription
      createAt
      updateAt
    }
  }
`;

export const DELETE_NOVEL = gql`
mutation DeleteNovel($deleteNovelId: ID) {
  deleteNovel(id: $deleteNovelId) {
    id
    title
    createAt
    updateAt
    image
    desccription
  }
}
`;

export const UPDATE_NOVEL = gql`
mutation UpdateNovel($updateNovelId: ID, $image: String, $title: String, $desccription: String) {
  updateNovel(id: $updateNovelId, image: $image, title: $title, desccription: $desccription) {
    id
    title
    image
    createAt
    updateAt
    desccription
  }
}
`;

export const ADD_AUTHOR = gql`
mutation AddAuthor($name: String) {
  addAuthor(name: $name) {
    id
    name
  }
}`;

export const DELETE_AUTHOR = gql`
mutation DeleteAuthor($deleteAuthorId: ID) {
  deleteAuthor(id: $deleteAuthorId) {
    id
    name
  }
}
`;

export const UPDATE_AUTHOR = gql`
mutation UpdateAuthor($updateAuthorId: ID, $name: String) {
  updateAuthor(id: $updateAuthorId, name: $name) {
    id
    name
  }
}
`;

export const ASSIGN_AUTHOR_TO_NOVEL = gql`
mutation AssignAuthorToNovel($authorId: String, $novelId: String) {
  assignAuthorToNovel(authorId: $authorId, novelId: $novelId) {
    id
    novelId
    authorId
    novel {
      id
      title
      image
      updateAt
      createAt
      desccription
    }
    author {
      id
      name
    }
    assignedAt
  }
}
`;

export const UNSSIGN_AUTHOR_TO_NOVEL = gql`
mutation UnssignAuthorToNovel($relationId: String) {
  unssignAuthorToNovel(relationId: $relationId) {
    id
    novelId
    authorId
    assignedAt
    novel {
      id
      title
      image
      createAt
      updateAt
      desccription
    }
    author {
      id
      name
    }
  }
}
`;