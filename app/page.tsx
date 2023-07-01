'use client'
import { BookCard } from "@/components";
import { GET_NOVELS } from "@/graphql/client/queries";
import { INovel } from "@/types/typings";
import { useQuery } from "@apollo/client";

export default function Home() {
  const {data,loading } = useQuery(GET_NOVELS);
  if (loading) return 'Loading...';
  return (
    <div className="p-4 sm:ml-64 sm:grid-cols-2 grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4 items-center">      
      {data?.novels.map((novel:INovel, index:number) =>(
        <BookCard key={index} novel={novel}/>
      ))}
    </div>
  );
}
