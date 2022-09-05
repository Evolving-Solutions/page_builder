import Head from "next/head";
import { useState, useEffect, Fragment } from "react";
import grapesjs from "grapesjs";
import gjsPresetWebpage from "grapesjs-preset-webpage";
import Link from "next/link";
import { AccountProfile } from "../components/AccountProfile";
import PagesList from "../components/PagesList";
import { ActivityFeed } from "../components/ActivityFeed";
import { Navbar } from "../components/Navbar";

export default function Home(props) {
  return (
    <>
      <Head />
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
              <PagesList pages={props.pages} />
            </div>
            {/* Activity feed */}
            <ActivityFeed />
          </div>
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const pages = await fetch("http://localhost:5000/pages")
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
  return {
    props: {
      pages,
    },
  };
}
