"use client";
import { ADD_NOVEL, DELETE_NOVEL, UNSSIGN_AUTHOR_TO_NOVEL } from "@/graphql/client/mutations";
import { GET_NOVEL, GET_NOVELS } from "@/graphql/client/queries";
import { INovel } from "@/types/typings";
import { useMutation } from "@apollo/client";
import { Dialog, Transition } from "@headlessui/react";
import { FormEvent, Fragment, useState } from "react";
import Image from "next/image";
import {
  AiOutlineClose,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { useRouter } from "next/navigation";
import AddNovel from "./FormNovel";

interface DetailsNovelProps {
  isOpen: boolean;
  closeModal: () => void;
  novel: INovel;
}

export default function DetailsNovel({
  isOpen,
  closeModal,
  novel,
}: DetailsNovelProps) {
  const router = useRouter();
  const [deleteNovel] = useMutation(DELETE_NOVEL, {
    refetchQueries: [{ query: GET_NOVELS }],
  });
  const [unssignAuthorToNovel] = useMutation(UNSSIGN_AUTHOR_TO_NOVEL, {
    refetchQueries: [{ query: GET_NOVELS }],
  })
    const [editOpen, setEditOpen] = useState(false);
  const hadnleSubmit = (e: FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
  };

  const handleDelete = (id: string) => {
    deleteNovel({ variables: { deleteNovelId: id } });
    router.push("/");
  };
  const handleUnssignAuthor = (id:any) => {
    console.log('id: ', id);
    unssignAuthorToNovel({variables: {relationId: id}});;
  };

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
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    <div className="flex flex-wrap gap-5 items-center">
                      <button
                        className="text-red-600"
                        onClick={() => handleDelete(novel?.id)}
                      >
                        <AiOutlineDelete />
                      </button>
                      <button
                        className="text-cyan-400"
                        onClick={() => setEditOpen(true)}
                      >
                        <AiOutlineEdit />
                      </button>
                      <button
                        className="text-emerald-500"
                        onClick={closeModal}
                      >
                        <AiOutlineClose />
                      </button>
                    </div>
                  </Dialog.Title>
                  <div className="mt-1">
                    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                      <div className="md:flex">
                        <div className="md:shrink-0">
                          <Image
                            src={novel?.image || ""}
                            alt={novel.title}
                            width={170}
                            height={40}
                          />
                        </div>
                        <div className="p-8">
                          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                            {novel.title}
                          </div>
                          <div className="block mt-1 text-lg leading-tight font-medium text-black ">
                            <div className="flex flex-wrap">
                              Author:
                              {novel?.authors?.map((item) => (
                                <span
                                  key={item?.id}
                                  className="flex text-gray-500 dark:text-gray-400 px-2"
                                >
                                  {item?.author?.name}
                                  <button
                                    className="text-red-600"
                                    onClick={() => handleUnssignAuthor(item.id)}
                                  >
                                    <AiOutlineDelete />
                                  </button>
                                </span>
                              ))}
                            </div>
                          </div>
                          <p className="mt-2 text-slate-500">
                            {novel?.desccription}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <AddNovel
        isOpen={editOpen}
        closeModal={() => setEditOpen(false)}
        novel={novel}
        action="edit"
      />
    </>
  );
}
