'use client'
import AuthorCard from "@/components/AuthorCard";
import { GET_AUTHORS } from "@/graphql/client/queries";
import { IAuthor } from "@/types/typings";
import { useQuery } from "@apollo/client";

const Page = () =>{
  const {data} = useQuery(GET_AUTHORS);
    return (
        <div className="p-4 sm:ml-64 sm:grid-cols-2 grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4 items-center">  
        {data?.authors?.map((author:IAuthor, index:number) =>(
          <AuthorCard key={index} author={author}/>
        ))}    
    </div>
    );
}
export default Page