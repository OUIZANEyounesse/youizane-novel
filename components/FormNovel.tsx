'use client'
import { ADD_NOVEL, ASSIGN_AUTHOR_TO_NOVEL, UPDATE_NOVEL } from "@/graphql/client/mutations";
import {  GET_NOVELS } from "@/graphql/client/queries";
import { IAuthor, INovel } from "@/types/typings";
import { useMutation } from "@apollo/client";
import { Dialog, Transition } from "@headlessui/react";
import { FormEvent, Fragment, useEffect, useState } from "react";
import ListAuthor from "./ListAuthor";
import { useRouter } from 'next/navigation';

interface FormNovelProps {
  isOpen: boolean;
  closeModal: () => void;
  action?: "create"| "edit"
  novel?: INovel
}

export default function FormNovel({ isOpen, closeModal,action,novel }: FormNovelProps) {
  const [addNovel] = useMutation(ADD_NOVEL, {
		refetchQueries: [{ query: GET_NOVELS }]});
    const [updateNovel] = useMutation(UPDATE_NOVEL, {
      refetchQueries: [{ query: GET_NOVELS }]});
      const [assignAuthorToNovel] = useMutation(ASSIGN_AUTHOR_TO_NOVEL);
  const [title , setTitle ] = useState<string>("");
  const [image , setImage ] = useState<string>("");
  const [desccription , setDesccription ] = useState<string>("");
  const [selectedAuthor, setSelectedAuthor] =  useState<IAuthor[]>([]);
  const router = useRouter();

  const hadnleSubmit = (e: FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    if (title === "" || image === "" || desccription === "") {
      alert("All elements are required.");
    }
    if(action !== null && action === "edit" && novel !== null ){
       updateNovel({variables:{updateNovelId:novel?.id,title, image,desccription}})

      if( selectedAuthor?.length > 0 && novel !== null){
        selectedAuthor?.map((author:IAuthor) => 
        assignAuthorToNovel({variables: {authorId: author?.id, novelId:novel?.id }}) 
        )
        
      }
    }else{

      // @ts-ignore
      addNovel({variables:{title, image,desccription,authorId:selectedAuthor[0]?.id}})
      router.push('/');
    }
  }
  useEffect(()=>{

    setTitle(novel?.title || "");
    setImage(novel?.image || "");
    setDesccription(novel?.desccription || "");
    let authors:IAuthor[] = novel?.authors?.map((item) => item.author) || [];
    // @ts-ignore
    setSelectedAuthor<IAuthor[]>(authors);
  },[novel])


  return (
    <div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className='relative z-10' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    
                    {action === "edit" ? "Update Novel":"Add New Novel"}
                  </Dialog.Title>
                  <div className="mt-4">
                    <form 
                    onSubmit={hadnleSubmit}
                    >
                      <div className="mb-6">
                        <label
                          htmlFor="title"
                          className="block mb-2 text-sm font-medium text-gray-90"
                        >
                          Title 

                        </label>
                        <input
                          type="text"
                          id="title"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="My Books"
                          onChange={(e) => setTitle(e.target.value)}
                          value={title}
                        />
                      </div>
                      <div className="mb-6">
                        <label
                          htmlFor="image"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Url Image
                        </label>
                        <input
                          type="url"
                          id="image"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="https://youizane.com/image"
                          required
                          onChange={(e) => setImage(e.target.value)}
                          value={image}
                        />
                      </div>
                      <div className="mb-6">
                        <label
                          htmlFor="desccription"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Description
                        </label>
                        <textarea
                          id="desccription"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="https://youizane.com/image"
                          required
                          onChange={(e) => setDesccription(e.target.value)}
                        >{desccription}</textarea>
                      </div>
                      <div className="mb-6">
                            <label
                              htmlFor="author"
                              className="block mb-2 text-sm font-medium text-gray-90"
                            >
                              Author 
                            </label>
                            <ListAuthor
                              selected={selectedAuthor}
                              setSelected={() => setSelectedAuthor}
                              action ={action}
                            />
                          </div>
                      <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick ={closeModal}
                      >
                        {action === "edit" ? "Update Novel": "Create Novel"}
                      </button>
                    </form>
                  
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
