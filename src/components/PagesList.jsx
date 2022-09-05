import { Menu } from "@headlessui/react";
import {
  BarsArrowUpIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  StarIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import { useEffect, useState } from "react";
import { classNames } from "../constants";

export function PagesList() {
  // make an api call to get the pages with usEfffect

  const [pages, setPages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  // fetch the data from the server and set the state
  useEffect(() => {
    fetch("http://localhost:5000/pages")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPages(data);
      });
  }, []);

  return (
    <div className="bg-white lg:min-w-0 lg:flex-1">
      <div className="border-b border-t border-gray-200 pl-4 pr-6 pt-4 pb-4 sm:pl-6 lg:pl-8 xl:border-t-0 xl:pl-6 xl:pt-6">
        <div className="flex items-center">
          <h1 className="flex-1 text-lg font-medium">Pages Get Listed Below</h1>
          <Menu as="div" className="relative">
            <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              <BarsArrowUpIcon
                className="mr-3 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              Sort
              <ChevronDownIcon
                className="ml-2.5 -mr-1.5 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Menu.Button>
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Name
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Date modified
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Date created
                    </a>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Menu>
        </div>
      </div>
      <ul
        role="list"
        className="divide-y divide-gray-200 border-b border-gray-200"
      >
        {pages.map((page) => (
          <li
            key={page.title}
            className="relative py-5 pl-4 pr-6 hover:bg-gray-50 sm:py-6 sm:pl-6 lg:pl-8 xl:pl-6"
          >
            <div className="flex items-center justify-between space-x-4">
              {/* Repo name and link */}
              <div className="min-w-0 space-y-3">
                <div className="flex items-center space-x-3">
                  <span
                    className={classNames(
                      page.title ? "bg-green-100" : "bg-gray-100",
                      "flex h-4 w-4 items-center justify-center rounded-full"
                    )}
                    aria-hidden="true"
                  >
                    <span
                      className={classNames(
                        page.title ? "bg-green-400" : "bg-gray-400",
                        "h-2 w-2 rounded-full"
                      )}
                    />
                  </span>

                  <h2 className="text-sm font-medium">
                    <span className="absolute inset-0" aria-hidden="true" />
                    <strong>Page Title: </strong> {page.title}{" "}
                    <span className="sr-only">
                      {page.active ? "Running" : "Not running"}
                    </span>
                  </h2>
                </div>
              </div>
              

             
              {/* Repo meta info */}
              <div className="hidden flex-shrink-0 flex-col items-end space-y-3 sm:flex">
                <p className="flex items-center space-x-4">
                  <Link
                    href={`http://localhost:3001/editor/${page.slug}`}
                    className="relative rounded border border-transparent bg-indigo-100  px-2.5 py-1.5 text-sm text-xs font-medium text-blue-700 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Edit Page
                  </Link>
                  <button
                    type="button"
                    className="relative rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span className="sr-only">
                      {page.title
                        ? "Add to favorites"
                        : "Remove from favorites"}
                    </span>
                    <StarIcon
                      className={classNames(
                        page.starred
                          ? "text-yellow-300 hover:text-yellow-400"
                          : "text-gray-300 hover:text-gray-400",
                        "h-5 w-5"
                      )}
                      aria-hidden="true"
                    />
                  </button>
                </p>
                <p className="flex space-x-2 text-sm text-gray-500">
                  <span>{page.tech}</span>
                  <span aria-hidden="true">&middot;</span>
                  <span>Published Date: {page.publishedDate}</span>
                  <span aria-hidden="true">&middot;</span>
                  <span>{page.location}</span>
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
