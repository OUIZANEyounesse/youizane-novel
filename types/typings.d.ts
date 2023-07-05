import {Author, Novel} from '@prisma/client'
interface INovel extends Novel {
    authors: NovelOnAuthor[]
}
interface IAuthor extends Author{

}