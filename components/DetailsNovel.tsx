"use client";
import { ADD_NOVEL } from "@/graphql/client/mutations";
import { GET_NOVELS } from "@/graphql/client/queries";
import { INovel } from "@/types/typings";
import { useMutation } from "@apollo/client";
import { Dialog, Transition } from "@headlessui/react";
import { FormEvent, Fragment, useState } from "react";
import Image from "next/image";

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
  const [addNovel] = useMutation(ADD_NOVEL, {
    refetchQueries: [{ query: GET_NOVELS }],
  });
  const [title, setTitle] = useState("Exemple title");
  const [image, setImage] = useState(
    "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRM0mrm-yYO76LWixHapHYLeECDh8dZzd29pAqQ3AhCW8qCdxdO"
  );

  const hadnleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title === "" || image === "")
      return alert("element it's be required all");
    addNovel({ variables: { title, image } });
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
                    Details Novel
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
                          <div
                            className="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
                          >
                            Author:
                            {novel?.author?.map((item) =>(
                              <p className="mt-2 text-slate-500">{item.name}</p>
                            ))}
                          </div>
                          <p className="mt-2 text-slate-500">
                            Looking to take your team away on a retreat to enjoy
                            awesome food and take in some sunshine? We have a
                            list of places to do just that.
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
    </>
  );
}
