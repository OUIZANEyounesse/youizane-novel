export const typeDefs = `#graphql
type Novel {
    id:ID!
    title:String
    image:String
    createAt:String
    updateAt: String
    author:[Author]
}

type Author{
    id:ID!
    name:String
    novelID:String
}
type Query {
    novel(id:ID):Novel
    novels:[Novel]
    authors: [Author]
}

type Mutation{
    addNovel(image:String, title:String): Novel
    addAuthor(name:String, novelId:String): Author
    updateNovel(id:ID, image:String, title:String): Novel
    deleteNovel(id:ID): Novel
}
`;