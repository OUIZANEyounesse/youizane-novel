export const typeDefs = `#graphql
type Novel {
    id:ID!
    title:String
    image:String
    createAt:String
    updateAt:String
    authors:[NovelOnAuthor]
    desccription:String
}

type Author{
    id:ID!
    name:String
    novels:[NovelOnAuthor]
}

type NovelOnAuthor{
    id:ID!
    novelId:String
    authorId:String
    novel:Novel
    author:Author
    assignedAt:String
}

type Query {
    novel(id:ID):Novel
    novels:[Novel]
    authors:[Author]
}

type Mutation{
    addNovel(image:String, title:String,desccription:String,authorId:String):Novel
    updateNovel(id:ID, image:String, title:String,desccription:String):Novel
    deleteNovel(id:ID):Novel

    addAuthor(name:String):Author
    deleteAuthor(id:ID):Author
    updateAuthor(id:ID, name:String):Author
    
    assignAuthorToNovel(authorId:String, novelId:String):NovelOnAuthor
    unssignAuthorToNovel(relationId:String): NovelOnAuthor
}
`;