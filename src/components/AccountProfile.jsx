import { Dialog, Disclosure, Transition } from "@headlessui/react";
import { CheckBadgeIcon, RectangleStackIcon } from "@heroicons/react/20/solid";
import { Fragment, useState } from "react";

export function AccountProfile() {
  const [slug, setSlug] = useState("");
  const [open, setOpen] = useState(false);
  const [pageName, setPageName] = useState("");
  const [content, setContent] = useState("");
  const [submitSuccessMessage, setSubmitSuccessMessage] = useState("");
  const [submitErrorMessage, setSubmitErrorMessage] = useState("");
  function closeModal() {
    setOpen(false);
  }

  function openModal() {
    setOpen(true);
  }

  const submitForm = (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    const formData = new FormData(e.target);
    const formDataObj = {};
    for (let [key, value] of formData.entries()) {
      formDataObj[key] = value;
    }
    console.log(formDataObj);
    fetch("http://localhost:5000/pages/", {
      method: "POST",
      body: JSON.stringify(formDataObj),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res;
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((res) => {
        setSubmitSuccessMessage(res.statusText);
        setPageName("");
        setContent("");
      })
      .catch((err) => {
        console.error("New Error", err);
        setSubmitErrorMessage(err.message);
      });
    // update the page name with the value of the formDataObj
    setPageName(formDataObj.title);
  };
  // clear  messages after 4 seconds
  setTimeout(() => {
    setSubmitErrorMessage("");
    setSubmitSuccessMessage("");
  }, 4000);

  return (
    <div className="bg-white xl:w-64 xl:flex-shrink-0 xl:border-r xl:border-gray-200">
      <div className="py-6 pl-4 pr-6 sm:pl-6 lg:pl-8 xl:pl-0">
        <div className="flex items-center justify-between">
          <div className="flex-1 space-y-8">
            <div className="space-y-8 sm:flex sm:items-center sm:justify-between sm:space-y-0 xl:block xl:space-y-8">
              {/* Profile */}
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 flex-shrink-0">
                  <img
                    className="h-12 w-12 rounded-full"
                    src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&h=256&q=80"
                    alt=""
                  />
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-gray-900">
                    Debbie Lewis
                  </div>
                  <a href="#" className="group flex items-center space-x-2.5">
                    <svg
                      className="h-5 w-5 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm font-medium text-gray-500 group-hover:text-gray-900">
                      debbielewis
                    </span>
                  </a>
                </div>
              </div>
              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row xl:flex-col">
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 xl:w-full"
                  onClick={openModal}
                >
                  Create A New Page
                </button>

                {/* modal with a form to collect the new page details */}
                <Transition appear show={open} as={Fragment}>
                  <Dialog
                    className="mx-auto w-full max-w-md"
                    as="div"
                    onClose={closeModal}
                    open={open}
                  >
                    {" "}
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
                          <Dialog.Panel
                            className="mx-auto w-full max-w-md overflow-hidden rounded-lg bg-white shadow-lg"
                            open
                          >
                            <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 sm:px-6">
                              <Dialog.Title
                                className="text-lg font-medium leading-6 text-gray-900"
                                as="h2"
                              >
                                Create A New Pages
                              </Dialog.Title>
                              {/* button to close modal */}
                              <button
                                className="inline-flex items-center justify-center rounded-md bg-white p-2 text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                onClick={() => setOpen(false)}
                              >
                                <p>Close</p>
                                <svg
                                  className="h-5 w-5"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>
                            </div>
                            <div className="mt-5 sm:mt-6">
                              <div className="sm:flex sm:items-start">
                                <div className="mx-auto w-full max-w-xs">
                                  <form
                                    className="mb-4 rounded bg-white px-8 pt-6 pb-8 shadow-md"
                                    onSubmit={submitForm}
                                  >
                                    <div className="mb-4">
                                      <label className="block text-sm font-medium leading-5 text-gray-700">
                                        Page Title
                                      </label>
                                      <div className="mt-1 rounded-md shadow-sm">
                                        <input
                                          onChange={(e) =>
                                            setPageName(e.target.value)
                                          }
                                          className="focus:shadow-outline-blue block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out focus:border-blue-300 focus:outline-none sm:text-sm sm:leading-5"
                                          id="title"
                                          name="title"
                                          type="text"
                                          placeholder="Page Title"
                                        />
                                      </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <input
                                        type="submit"
                                        className="focus:shadow-outline-indigo inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out hover:bg-indigo-500 focus:border-indigo-700 focus:outline-none active:bg-indigo-700"
                                      />
                                    </div>
                                  </form>
                                  {submitSuccessMessage && (
                                    <div className="mt-4 text-center">
                                      <div className="text-sm font-medium leading-5 text-indigo-600">
                                        {submitSuccessMessage}
                                      </div>
                                    </div>
                                  )}
                                  {submitErrorMessage && (
                                    <div className="mt-4 text-center">
                                      <div className="text-sm font-medium leading-5 text-red-600">
                                        {submitErrorMessage}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </Dialog.Panel>
                        </Transition.Child>
                      </div>
                    </div>
                  </Dialog>
                </Transition>

                <button
                  type="button"
                  className="mt-3 inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 xl:ml-0 xl:mt-3 xl:w-full"
                >
                  Invite Team
                </button>
              </div>
            </div>
            {/* Meta info */}
            <div className="flex flex-col space-y-6 sm:flex-row sm:space-y-0 sm:space-x-8 xl:flex-col xl:space-x-0 xl:space-y-6">
              <div className="flex items-center space-x-2">
                <CheckBadgeIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <span className="text-sm font-medium text-gray-500">
                  Pro Member
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <RectangleStackIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <span className="text-sm font-medium text-gray-500">
                  8 Projects
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
