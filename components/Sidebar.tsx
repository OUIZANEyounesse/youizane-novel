'use client'
import { useState } from "react";
import { AiOutlinePlus, AiOutlineHome, AiOutlineTeam, AiOutlineUserAdd } from "react-icons/ai";
import AddNovel from "./FormNovel";
import Link from "next/link";
import { Button } from "antd";
import FAuthor from './FAuthor';
import FNovel from "./FNovel";

const Sidebar = () => {
  const [openIs, setOpenIs] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <input type="checkbox" id="menu-open" className="hidden" />

      <label
        htmlFor="menu-open"
        className="absolute right-2 bottom-2 shadow-lg rounded-full p-2 bg-gray-100 text-gray-600 md:hidden"
        data-dev-hint="floating action button"
      ></label>
      <header
        className="bg-gray-600 text-gray-100 flex justify-between md:hidden"
        data-dev-hint="mobile menu bar"
      >
        <a
          href="#"
          className="block p-4 text-white font-bold whitespace-nowrap truncate"
        >
          Youizane Books
        </a>

        <label
          htmlFor="menu-open"
          id="mobile-menu-button"
          className="m-2 p-2 focus:outline-none hover:text-white hover:bg-gray-700 rounded-md"
        >
          <svg
            id="menu-open-icon"
            className="h-6 w-6 transition duration-200 ease-in-out"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <svg
            id="menu-close-icon"
            className="h-6 w-6 transition duration-200 ease-in-out"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </label>
      </header>

      <aside
        id="sidebar"
        className=" fixed top-0 bg-gray-800 text-gray-100 md:w-64 w-3/4 space-y-6 pt-6 px-0  inset-y-0 left-0 transform md:translate-x-0 transition duration-200 ease-in-out  md:flex md:flex-col md:justify-between overflow-y-auto  h-screen"
        data-dev-hint="sidebar; px-0 for frameless; px-2 for visually inset the navigation"
      >
        <div
          className="flex flex-col space-y-6"
          data-dev-hint="optional div for having an extra footer navigation"
        >
          <a
            href="#"
            className="text-white flex items-center space-x-2 px-4"
            title="Your App is cool"
          >
            <span className="text-2xl font-extrabold whitespace-nowrap truncate">
              Youizane Books
            </span>
          </a>

          <nav data-dev-hint="main navigation">
            <Link
              href="/"
              className="flex items-center space-x-2 py-2 px-4 transition duration-200 hover:bg-gray-700 hover:text-white"
            >
              <AiOutlineHome />
              <span>Home</span>
            </Link>
            <button
              onClick ={() => setOpenIs(true)}
              className="flex w-full items-center space-x-2 py-2 px-4 transition duration-200 hover:bg-gray-700 hover:text-white"
            >
              <AiOutlinePlus />
              <span>Create Novel</span>
            </button>
            <Link
              href="/authors"
              className="flex items-center space-x-2 py-2 px-4 transition duration-200 hover:bg-gray-700 hover:text-white"
            >
              <AiOutlineTeam />
              <span>Authors</span>
            </Link>
            <button
              onClick ={() => setIsModalOpen(true)}
              className="flex w-full items-center space-x-2 py-2 px-4 transition duration-200 hover:bg-gray-700 hover:text-white"
            >
              <AiOutlineUserAdd />
              <span>Create Author</span>
            </button>

            <form className="w-10/12">
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="novel,author..."
                  required
                />
              </div>
            </form>

            {/* <a href="#" className="flex items-center space-x-2 py-2 px-4 transition duration-200 hover:bg-gray-700 hover:text-white">
                    <span className="ml-6">Without Icon</span>
                </a>
                <a href="#" className="flex items-center space-x-2 py-2 px-4 transition duration-200 hover:bg-gray-700 hover:text-white group">
                    <span className="w-4 h-4 flex-shrink-0 border border-gray-600 rounded group-hover:border-gray-400 transition duration-200"></span>
                    <span>Without Icon And a bit longer than usual</span>
                </a> */}
          </nav>
        </div>

        <nav data-dev-hint="second-main-navigation or footer navigation">
          <div className="border bg-fuchsia-50" />

          <a
            href="#"
            className="block py-2 px-4 transition duration-200 hover:bg-gray-700 hover:text-white"
          >
            Copyright © 2023 YOuizane Books.
          </a>
        </nav>
      </aside>

      {/* <AddNovel
        isOpen ={openIs}
        closeModal = {() => setopenIs(false)}
      /> */}
      <FNovel
        open ={openIs}
        handleOk = {() => setOpenIs(false)}
       handleCancel = {() => setOpenIs(false)}
      />

      {/* <FormAuthor
       openIs ={formAuthor}
       closeModal ={ () => setFormAuthor(false)}
      /> */}
      <FAuthor
       open ={isModalOpen}
       handleOk = {() => setIsModalOpen(false)}
       handleCancel = {() => setIsModalOpen(false)}

      />
    </>
  );
};

export default Sidebar;
