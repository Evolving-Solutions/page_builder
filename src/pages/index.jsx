import Head from "next/head";
import { useState, useEffect, Fragment } from "react";
import grapesjs from "grapesjs";
import gjsPresetWebpage from "grapesjs-preset-webpage";
import Link from "next/link";
import { AccountProfile } from "../components/AccountProfile";
import { ProjectsList } from "../components/ProjectsList";
import { ActivityFeed } from "../components/ActivityFeed";
import { Navbar } from "../components/Navbar";

export default function Home() {
  const [editor, setEditor] = useState(null);
  const [pageName, setPageName] = useState("");
  const [pages, setPages] = useState([]);
  useEffect(() => {
    const editor = grapesjs.init({
      container: "#gjs",
      plugins: ["gjs-preset-webpage"],
      pluginsOpts: {
        gjsPresetWebpage: {},
      },
    });
    setEditor(editor);
  }, []);
  // fetch the data from the server and set the state
  useEffect(() => {
    fetch("http://localhost:5000/pages")
      .then((res) => res.json())

      .then((data) => {
        console.log(data);
        setPages(data);
      });
  }, []);

  console.log(pages);
  const submitForm = (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    const formData = new FormData(e.target);
    const formDataObj = {};
    for (let [key, value] of formData.entries()) {
      formDataObj[key] = value;
    }

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
          return res.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    // update the page name with the value of the formDataObj
    setPageName(formDataObj.title);

    // send the formDataObj to the server

    // update the pages array with the new page from the server
  };

  return (
    <>
      <Head/>
      <main>
        <div
          className="fixed top-0 left-0 h-full w-1/2 bg-white"
          aria-hidden="true"
        />
        <div
          className="fixed top-0 right-0 h-full w-1/2 bg-gray-50"
          aria-hidden="true"
        />
        <div className="relative flex min-h-full flex-col">
          {/* Navbar */}
          <Navbar />

          {/* 3 column wrapper */}
          <div className="mx-auto w-full max-w-7xl flex-grow lg:flex xl:px-8">
          {/* Left sidebar & main wrapper */}
          <div className="min-w-0 flex-1 bg-white xl:flex">
          {/* Account profile */}
          <AccountProfile />

          {/* Projects List */}
          <ProjectsList />
          </div>
          {/* Activity feed */}
          <ActivityFeed />
          </div>
        </div>
      </main>
    </>
  );
}
