'use client'
import { ADD_NOVEL } from "@/graphql/client/mutations";
import { GET_NOVELS } from "@/graphql/client/queries";
import { useMutation } from "@apollo/client";
import { Dialog, Transition } from "@headlessui/react";
import { FormEvent, Fragment, useState } from "react";

interface AddNovelProps {
  isOpen: boolean;
  closeModal: () => void;
}

export default function AddNovel({ isOpen, closeModal }: AddNovelProps) {
  const [addNovel] = useMutation(ADD_NOVEL, {
		refetchQueries: [{ query: GET_NOVELS }]});
  const [title , setTitle ] = useState("Exemple title");
  const [image , setImage ] = useState("https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRM0mrm-yYO76LWixHapHYLeECDh8dZzd29pAqQ3AhCW8qCdxdO");

  const hadnleSubmit = (e: FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    if(title === "" || image === "") return alert("element it's be required all")
    addNovel({variables:{title, image}})
  }

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
                    Add New Novel
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
                      <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick ={closeModal}
                      >
                        New Novel
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
  );
}
