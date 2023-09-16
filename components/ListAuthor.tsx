"use client";
import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { GET_AUTHORS } from "@/graphql/client/queries";
import { useQuery } from "@apollo/client";
import { IAuthor } from "@/types/typings";

type ListAuthorProps = {
  selected?: IAuthor[];
  setSelected: () => {};
  action?: "edit" | "create";
};
export default function ListAuthor({
  selected,
  setSelected,
  action,
}: ListAuthorProps) {
  const { data } = useQuery(GET_AUTHORS);
  const [query, setQuery] = useState<string>("");
  const filteredAuthors =
    query === ""
      ? data?.authors
      : data?.authors.filter((author: IAuthor) =>{
      return author.name.toLowerCase().includes(query.toLowerCase())
    }
        );

        const handleChange = (value:string) =>{
          setQuery(value);
        }
  return (
    <div className="w-full">
     { (action === "edit") ? 
     <Combobox value={selected} onChange={() => setSelected} multiple  name="authors">
     <div className="relative mt-1">
       <div className="relative w-full overflow-hidden text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
         <Combobox.Input
           className="w-fullbg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
           displayValue={(authors: IAuthor[]) =>
             authors?.map((item) => item.name).join(", ")
           }
           onChange={(event) => handleChange(event.target.value)}
         />
         <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
           <ChevronUpDownIcon
             className="w-5 h-5 text-gray-400"
             aria-hidden="true"
           />
         </Combobox.Button>
       </div>
       <Transition
         as={Fragment}
         leave="transition ease-in duration-100"
         leaveFrom="opacity-100"
         leaveTo="opacity-0"
         afterLeave={() => setQuery("")}
       >
         <Combobox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
           {filteredAuthors?.length === 0 && query !== "" ? (
             <div className="relative px-4 py-2 text-gray-700 cursor-default select-none">
               Nothing found.
             </div>
           ) : (
             filteredAuthors?.map((author: IAuthor) => (
               <Combobox.Option
                 key={author.id}
                 className={({ active }) =>
                   `relative cursor-default select-none py-2 pl-10 pr-4 ${
                     active ? "bg-teal-600 text-white" : "text-gray-900"
                   }`
                 }
                 value={author}
               >
                 {({ selected, active }:{selected: IAuthor[], active:boolean}) => (
                   <>
                     <span
                       className={`block truncate ${
                         selected ? "font-medium" : "font-normal"
                       }`}
                     >
                       {author.name}
                     </span>
                     {selected ? (
                       <span
                         className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                           active ? "text-white" : "text-teal-600"
                         }`}
                       >
                         <CheckIcon className="w-5 h-5" aria-hidden="true" />
                       </span>
                     ) : null}
                   </>
                 )}
               </Combobox.Option>
             ))
           )}
         </Combobox.Options>
       </Transition>
     </div>
   </Combobox>
     : 
     <Combobox value={selected} onChange={setSelected}  name="authors">
        <div className="relative mt-1">
          <div className="relative w-full overflow-hidden text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-fullbg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              displayValue={(author: IAuthor) =>
                author?.name
              }
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredAuthors?.length === 0 && query !== "" ? (
                <div className="relative px-4 py-2 text-gray-700 cursor-default select-none">
                  Nothing found.
                </div>
              ) : (
                filteredAuthors?.map((author: IAuthor) => (
                  <Combobox.Option
                    key={author.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-teal-600 text-white" : "text-gray-900"
                      }`
                    }
                    value={author}
                  >
                    {({ selected, active }:{selected: IAuthor[], active:boolean}) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {author.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-teal-600"
                            }`}
                          >
                            <CheckIcon className="w-5 h-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
     }
      
    </div>
  );
}
