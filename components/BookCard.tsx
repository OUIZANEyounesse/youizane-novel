import { INovel } from "@/types/typings";
import Image from "next/image";
import { useState } from "react";
import DetailsNovel from "./DetailsNovel";
const BookCard = ({ novel }: { novel: INovel }) => {
const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-full max-w-sm  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-center">
        <Image
          className="p-8 rounded-t-lg"
          src={novel.image || ""}
          alt="product image"
          width={183}
          height={30}
        />
      </div>
      <div className="px-5 pb-5">
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {novel.title}
        </h5>
       
        <div className="flex flex-wrap items-center mt-2.5 mb-5">
          <span className="flex text-gray-500 dark:text-gray-400">Author:</span>
          
          {novel?.authors?.map((item) => (

          <span key={item?.id} className="flex text-gray-500 dark:text-gray-400 px-2">
            {item?.author?.name}
          </span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={()=>setIsOpen(true)}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Read more
          </button>
        </div>
      </div>
      <DetailsNovel
      novel={novel}
      isOpen={isOpen}
      closeModal={() =>setIsOpen(false)}
      />
    </div>
  );
};

export default BookCard;
