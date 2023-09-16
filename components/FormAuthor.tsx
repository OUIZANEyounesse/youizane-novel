'use client'
import { ADD_AUTHOR, UPDATE_AUTHOR } from "@/graphql/client/mutations";
import { GET_AUTHORS } from "@/graphql/client/queries";
import { IAuthor } from "@/types/typings";
import { useMutation } from "@apollo/client";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { FormEvent, Fragment, useEffect, useState } from "react";

type FormAuthorProps ={
    isOpen:boolean;
    closeModal: () => void;
    action?: "edit"|"create"
    author?: IAuthor

}
const FormAuthors = ({isOpen, closeModal,action,author}:FormAuthorProps) =>{
  const router = useRouter();
  const [addAuthor] = useMutation(ADD_AUTHOR);
  const [updateAuthor] = useMutation(UPDATE_AUTHOR,{refetchQueries:[{query: GET_AUTHORS}]});
    const hadnleSubmit = (e: FormEvent<HTMLFormElement>) =>{
      e.preventDefault();
      if(name === "" ) return alert("element it's be required all")
      if(action === "edit"){
        updateAuthor({variables:{updateAuthorId:author?.id,name: name}})
      }else{
  
        addAuthor({variables:{name}})
        router.push('/authors');
      }
    }
    const [name, setName] = useState<string>("");
    useEffect(()=>{
      setName(author?.name || "");
    },[author])
    return (
        <>
          <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        {action === "edit"? "Update Novel":"Add New Novel"}
                      </Dialog.Title>
                      <div className="mt-4">
                        <form 
                        onSubmit={()  => hadnleSubmit}
                        >
                          <div className="mb-6">
                            <label
                              htmlFor="name"
                              className="block mb-2 text-sm font-medium text-gray-90"
                            >
                              name 
                            </label>
                            <input
                              type="text"
                              id="name"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="Name Author"
                              onChange={(e) => setName(e.target.value)}
                              value={name}
                            />
                          </div>
                        
                          <button
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick ={closeModal}
                          >
                            {action === "edit" ? "Update": "Create"}
                          </button>
                        </form>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </>
    )
    
}
export default FormAuthors;