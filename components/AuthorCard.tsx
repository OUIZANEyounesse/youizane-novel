'use client'
import { DELETE_AUTHOR } from "@/graphql/client/mutations";
import { GET_AUTHORS } from "@/graphql/client/queries";
import { IAuthor } from "@/types/typings";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import FormAuthor from "./FormAuthor";
import { useState } from "react";

const AuthorCard = ({author}: {author:IAuthor}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteAuthor] = useMutation(DELETE_AUTHOR,{
    refetchQueries:[{query:GET_AUTHORS}],
  });
  const router = useRouter();
  const handleDelete = (id:string) => {
    deleteAuthor({variables:{deleteAuthorId: id}});
    router.push('/authors')
  };
  return (
    <div className="w-full max-w-sm  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="px-5 pb-5">
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {author.name}
        </h5>
        <div className="flex items-center justify-between py-1">
            <button
              className="text-red-600"
              onClick={()=>handleDelete(author.id)}
            >
              <AiOutlineDelete />
            </button>
            <button className="text-cyan-400" 
            onClick={() => setIsOpen(true)}
            >
              <AiOutlineEdit />
            </button>
        </div>
      </div>
      <FormAuthor
        isOpen={isOpen}
        closeModal ={() => setIsOpen(false)}
        action="edit"
        author= {author}
      />
    </div>
  );
};

export default AuthorCard;
